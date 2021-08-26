import { Box, makeStyles, useMediaQuery, useTheme } from '@material-ui/core';
import { FilterIcon } from 'assets/images';
import Button from 'components/Button';
import SortByDropdown from 'components/Filters/SortByDropdown';
import { FormikControl } from 'components/Form';
import { Form, Formik } from 'formik';
import { sortingOrder } from 'global/constants';
import React, { useEffect, useMemo } from 'react';
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
import { reportsFilterInitialData } from './schemas';

interface IProps {
  sortedOrder: string;
  handleFilterFormSubmit: (values: any) => void;
  handleSearchInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSortingMenuChange: (value: any) => void;
}

const useStyles = makeStyles(theme => ({
  filtersWrapper: {
    flexDirection: 'column',
    [theme.breakpoints.up('lg')]: {
      flexDirection: 'row',
    },
  },

  filterForm: {
    width: '100%',
    '& .gwcl-MuiAutocomplete-root': {
      flex: '1 1 175px',
      margin: theme.spacing(0, 0, 1),
      [theme.breakpoints.up('md')]: {
        margin: theme.spacing(0, 1, 0, 0),
      },
    },

    '& .react-datepicker-wrapper': {
      margin: theme.spacing(0, 0, 1),
      [theme.breakpoints.up('md')]: {
        margin: theme.spacing(0, 1),
      },
    },

    '& .gwcl-MuiFormControl-root': {
      marginBottom: 0,
    },

    '& .gwcl-MuiFormHelperText-root': {
      display: 'none',
    },

    '& .gwcl-MuiFormControlLabel-root': {
      margin: theme.spacing(1, 0, 0),
      [theme.breakpoints.up('md')]: {
        margin: theme.spacing(0, 0, 0, 1),
      },
      '& .gwcl-MuiFormControlLabel-label': {
        whiteSpace: 'nowrap',
      },
    },

    [theme.breakpoints.between('sm', 'lg')]: {
      marginBottom: theme.spacing(1),
    },

    [theme.breakpoints.up('lg')]: {
      flex: 2,
    },
  },

  filterButton: {
    margin: theme.spacing(1, 0, 0),
    [theme.breakpoints.up('md')]: {
      margin: 0,
    },
  },

  filterAndSort: {
    '& .gwcl-MuiBox-root': {
      margin: theme.spacing(1, 0),
    },
    [theme.breakpoints.up('md')]: {
      margin: 0,
    },
    [theme.breakpoints.up('lg')]: {
      flex: 1,
      justifyContent: 'flex-end',
    },
  },
}));

const Filters: React.FC<IProps> = ({
  sortedOrder,
  handleFilterFormSubmit,
  handleSearchInputChange,
  handleSortingMenuChange,
}) => {
  const { t } = useTranslation(['common']);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const regionsOptions = useSelector(selectRegionsOptions);
  const regionsStatus = useSelector(selectRegionsStatus);
  const districtsOptions = useSelector(selectDistrictsOptions);
  const districtsStatus = useSelector(selectDistrictsStatus);
  const routeOptions = useSelector(selectRoutesOptions);
  const routeStatus = useSelector(selectRoutesStatus);

  const sortByDropdownOption = [
    { label: t('common:firstAdded'), value: sortingOrder.ASCENDING },
    { label: t('common:lastAdded'), value: sortingOrder.DESCENDING },
  ];

  useEffect(() => {
    dispatch(getRegions());
  }, [dispatch]);

  const handleRegionChange = (
    selectedOption: any,
    setFieldValue: Function,
    values: typeof reportsFilterInitialData
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
    values: typeof reportsFilterInitialData
  ) => {
    if (selectedOption) {
      dispatch(getRoutes({ district_id: selectedOption.value }));
    }
    if (selectedOption !== values.district_id) {
      setFieldValue('route_id', []);
    }
  };

  const selectedSortedOption = useMemo(() => {
    return sortByDropdownOption.find((item: IAutoCompleteOption) => item.value === sortedOrder);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortedOrder, t]);
  return (
    <>
      <Box
        display={{ sm: 'block', md: 'flex' }}
        alignItems={{ md: 'flex-start', lg: 'center' }}
        justifyContent="space-between"
        className={classes.filtersWrapper}
        mt={2}
      >
        {/* FILTERS */}
        <Formik
          enableReinitialize
          initialValues={reportsFilterInitialData}
          onSubmit={values => {
            handleFilterFormSubmit(values);
          }}
        >
          {({ setFieldValue, values }) => (
            <Form className={classes.filterForm}>
              <Box display={{ sm: 'block', md: 'flex' }}>
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
                  name="exception"
                  label={t('common:exceptions')}
                  options={[]}
                  textFieldProps={{ variant: 'outlined' }}
                />

                <Button
                  fullWidth={matches}
                  type="submit"
                  variant="outlined"
                  className={classes.filterButton}
                  startIcon={<FilterIcon />}
                >
                  {t('common:filters')}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>

        {/* SORT BY */}
        <Box
          display={{ sm: 'block', md: 'flex' }}
          justifyContent={{ md: 'flex-start', lg: 'center' }}
          justifySelf="end"
          className={classes.filterAndSort}
        >
          <SortByDropdown
            value={selectedSortedOption!}
            options={sortByDropdownOption}
            handleMenuItemChange={handleSortingMenuChange!}
          />
        </Box>
      </Box>
    </>
  );
};

export default Filters;
