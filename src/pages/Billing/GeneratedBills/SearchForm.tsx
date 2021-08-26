import { Box, Hidden, Link, makeStyles, useMediaQuery } from '@material-ui/core';
import { fade, useTheme } from '@material-ui/core/styles';
import { DownloadIcon1, FilterIcon } from 'assets/images';
import Button from 'components/Button';
import { FormikControl } from 'components/Form';
import Title from 'components/Title';
import { Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import {
  getDistricts,
  getRegions,
  getRoutes,
  selectDistrictsOptions,
  selectDistrictsStatus,
  selectRegionsOptions,
  selectRegionsStatus,
  selectRoutesOptions,
  selectRoutesStatus,
} from 'store/common';
import { filterBillingFormInitialData, searchGeneratedBillsFormInitialData } from './schemas';

const useStyles = makeStyles(theme => ({
  searchFormWrapper: {
    position: 'relative',
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(3, 9.5),
    },
    '&:after': {
      position: 'absolute',
      top: -24,
      left: -24,
      width: 'calc(100% + 48px)',
      height: 'calc(100% + 32px)',
      background: fade(theme.palette.grey['500'], 0.3),
      content: `''`,
    },
    '& .gwcl-MuiInputBase-root': {
      background: theme.palette.common.white,
      borderRadius: theme.spacing(1),
    },
    '& > form': {
      position: 'relative',
      zIndex: 1,
    },
  },
  searchIcon: {
    width: theme.spacing(2),
    height: 'auto',
  },
  searchBillsButton: {
    [theme.breakpoints.up('md')]: {
      width: 260,
    },
  },
  filterFormWrapper: {
    '& .gwcl-MuiFormControl-root': {
      marginBottom: 0,
    },
    '& .gwcl-MuiFormHelperText-root': {
      display: 'none',
    },
    '& .react-datepicker-wrapper': {
      marginRight: theme.spacing(1.5),
    },
  },
  filterButton: {
    marginTop: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(0),
    },
  },
  downloadButton: {
    display: 'flex',
    alignItems: 'center',
    '& > svg': {
      marginRight: theme.spacing(1),
    },
  },
}));

const SearchForm = () => {
  const { t } = useTranslation(['common', 'billing']);
  const theme = useTheme();
  const classes = useStyles();
  const matches = useMediaQuery(theme.breakpoints.down('lg'));
  const dispatch = useAppDispatch();
  const regionsOptions = useSelector(selectRegionsOptions);
  const regionsStatus = useSelector(selectRegionsStatus);
  const districtsOptions = useSelector(selectDistrictsOptions);
  const districtsStatus = useSelector(selectDistrictsStatus);
  const routeOptions = useSelector(selectRoutesOptions);
  const routeStatus = useSelector(selectRoutesStatus);

  useEffect(() => {
    dispatch(getRegions());
  }, [dispatch]);

  const handleRegionChange = (
    selectedOption: any,
    setFieldValue: Function,
    values: typeof searchGeneratedBillsFormInitialData
  ) => {
    if (selectedOption) {
      dispatch(getDistricts({ region_id: selectedOption.value }));
    }
    if (selectedOption !== values.region_id) {
      setFieldValue('district_id', null);
      setFieldValue('route_id', null);
    }
  };

  const handleDistrictChange = (
    selectedOption: any,
    setFieldValue: Function,
    values: typeof searchGeneratedBillsFormInitialData
  ) => {
    if (selectedOption) {
      dispatch(getRoutes({ district_id: selectedOption.value }));
    }
    if (selectedOption !== values.district_id) {
      setFieldValue('route_id', []);
    }
  };

  const handleFilterFormSubmit = (values: any) => {};
  const onClick = () => {};
  return (
    <>
      <div className={classes.searchFormWrapper}>
        <Hidden mdUp>
          <Title>{t('billing:searchBills')}</Title>
        </Hidden>
        <Formik
          enableReinitialize
          initialValues={searchGeneratedBillsFormInitialData}
          onSubmit={values => {
            handleFilterFormSubmit(values);
          }}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <Box
                display={{ xs: 'block', md: 'grid' }}
                gridGap={16}
                gridTemplateColumns={'repeat(auto-fit, minmax(175px, 1fr))'}
              >
                <FormikControl
                  control="autoComplete"
                  name="region_id"
                  label={t('common:region')}
                  options={regionsOptions}
                  textFieldProps={{ variant: 'outlined' }}
                  loading={regionsStatus === 'loading'}
                  onChangeCallBack={(value: any) => {
                    handleRegionChange(value, setFieldValue, values);
                  }}
                />

                <FormikControl
                  control="autoComplete"
                  name="district_id"
                  label={t('common:district')}
                  loading={districtsStatus === 'loading'}
                  options={districtsOptions}
                  textFieldProps={{ variant: 'outlined' }}
                  disabled={!values.region_id}
                  onChangeCallBack={(value: any) => {
                    handleDistrictChange(value, setFieldValue, values);
                  }}
                />

                <FormikControl
                  control="autoComplete"
                  name="route_id"
                  label={t('common:route')}
                  options={routeOptions}
                  textFieldProps={{ variant: 'outlined' }}
                  loading={routeStatus === 'loading'}
                  disabled={!values.district_id}
                />
                <FormikControl
                  control="autoComplete"
                  name="account_id"
                  label={t('billing:selectAccount')}
                  options={[]}
                  textFieldProps={{ variant: 'outlined' }}
                />
              </Box>

              <Box textAlign="center">
                <Button disableElevation fullWidth={!!matches} borderRadius={8} className={classes.searchBillsButton}>
                  {t('billing:searchBills')}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </div>

      <Box
        className={classes.filterFormWrapper}
        display={{ sm: 'block', md: 'flex' }}
        justifyContent="space-between"
        alignItems="center"
        mt={3}
      >
        <Formik
          enableReinitialize
          initialValues={filterBillingFormInitialData}
          onSubmit={values => {
            handleFilterFormSubmit(values);
          }}
        >
          {({ setFieldValue, values }) => (
            <Form>
              <Box display={{ sm: 'block', md: 'flex' }} marginBottom={{ xs: 2, md: 0 }}>
                <FormikControl
                  control="datepicker"
                  name="billMonth"
                  label={t('common:billMonth')}
                  startdate={values.startDate}
                  datePickerProps={{
                    startDate: values.startDate,
                    onChange: (dates: any) => {
                      if (dates) {
                        setFieldValue('startDate', dates[0]);
                      } else {
                        setFieldValue('startDate', null);
                      }
                    },
                    shouldCloseOnSelect: false,
                  }}
                />

                <Button
                  type="submit"
                  variant="outlined"
                  fullWidth={!!matches}
                  startIcon={<FilterIcon />}
                  className={classes.filterButton}
                >
                  {t('common:filters')}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>

        <Link className={classes.downloadButton} onClick={onClick} color="primary" href="#" underline="none">
          <DownloadIcon1 />
          {t('billing:downloadAllBills')}
        </Link>
      </Box>
    </>
  );
};

export default SearchForm;
