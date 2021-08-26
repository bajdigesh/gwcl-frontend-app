import { Box, makeStyles, useMediaQuery, useTheme } from '@material-ui/core';
import { FilterIcon } from 'assets/images';
import Button from 'components/Button';
import { FormikControl } from 'components/Form';
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
import { billingFilterFormData } from './schema';

const useStyles = makeStyles(theme => ({
  filtersForm: {
    width: '100%',
  },
  filtersRow: {
    '& .gwcl-MuiFormControl-root': {
      [theme.breakpoints.up('md')]: {
        marginBottom: 0,
      },
      '& .gwcl-MuiFormHelperText-root': {
        display: 'none',
      },
    },
    '& .gwcl-MuiAutocomplete-root': {
      flex: '0 1 175px',
      [theme.breakpoints.up('md')]: {
        marginRight: theme.spacing(1.5),
      },
    },
    '& .react-datepicker-wrapper': {
      marginRight: theme.spacing(1.5),
    },
  },
}));

interface IProps {
  handleFilterFormSubmit: (values: any) => void;
  handleSearchInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Filters: React.FC<IProps> = ({ handleFilterFormSubmit, handleSearchInputChange }) => {
  const { t } = useTranslation(['common', 'customers']);
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
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

  const handleRegionChange = (selectedOption: any, setFieldValue: Function, values: typeof billingFilterFormData) => {
    if (selectedOption) {
      dispatch(getDistricts({ region_id: selectedOption.value }));
    }
    if (selectedOption !== values.region_id) {
      setFieldValue('district_id', null);
      setFieldValue('route_id', null);
    }
  };

  const handleDistrictChange = (selectedOption: any, setFieldValue: Function, values: typeof billingFilterFormData) => {
    if (selectedOption) {
      dispatch(getRoutes({ district_id: selectedOption.value }));
    }
    if (selectedOption !== values.district_id) {
      setFieldValue('route_id', []);
    }
  };

  const handleFormSubmit = (values: any) => {};

  return (
    <Box marginTop={2} display="flex">
      <Formik
        enableReinitialize
        initialValues={billingFilterFormData}
        onSubmit={values => {
          handleFormSubmit(values);
        }}
      >
        {({ setFieldValue, values }) => (
          <Form className={classes.filtersForm}>
            <Box display={{ sm: 'block', md: 'flex' }} alignItems="center" className={classes.filtersRow}>
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
                control="datepicker"
                name="startDate"
                label={t('common:addedBetween')}
                startdate={values.startDate}
                enddate={values.endDate}
                datePickerProps={{
                  startDate: values.startDate,
                  endDate: values.endDate,
                  onChange: (dates: any) => {
                    if (dates) {
                      setFieldValue('startDate', dates[0]);
                      setFieldValue('endDate', dates[1]);
                    } else {
                      setFieldValue('startDate', null);
                      setFieldValue('endDate', null);
                    }
                  },
                  monthsShown: matches ? 1 : 2,
                  selectsRange: true,
                  shouldCloseOnSelect: false,
                }}
              />
              <Button
                type="submit"
                color="inherit"
                variant="outlined"
                fullWidth={matches && true}
                startIcon={<FilterIcon />}
              >
                {t('common:filters')}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Filters;
