import { Box, makeStyles, useMediaQuery, useTheme } from '@material-ui/core';
import { FilterIcon } from 'assets/images';
import Button from 'components/Button';
import FilterSearch from 'components/Filters/FilterSearch';
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
import { gwclPaypointFilterFormInitialData } from '../schemas';

interface IProps {
  sortedOrder: string;
  handleFilterFormSubmit: (values: any) => void;
  handleSearchInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSortingMenuChange: (value: any) => void;
}

const useStyles = makeStyles(theme => ({
  filtersWrapper: {
    '@media (max-width: 1550px)': {
      display: 'block !important',
    },
  },
  filterForm: {
    flex: 3,
    '& .gwcl-MuiAutocomplete-root': {
      flex: '1 1 170px',
      margin: theme.spacing(0, 0, 1),
      [theme.breakpoints.up('md')]: {
        margin: theme.spacing(0, 1, 0, 0),
      },
    },
    '& .react-datepicker-wrapper': {
      margin: theme.spacing(0, 0, 1),
      [theme.breakpoints.up('md')]: {
        margin: theme.spacing(0, 1, 0, 0),
      },
    },
    '& .gwcl-MuiFormControl-root': {
      marginBottom: 0,
    },
    '& .gwcl-MuiFormHelperText-root': {
      display: 'none',
    },
    '& .gwcl-MuiButton-outlined': {
      margin: theme.spacing(1, 0),
      [theme.breakpoints.up('md')]: {
        margin: 0,
      },
    },
    '& + div': {
      '& .gwcl-MuiBox-root': {
        margin: theme.spacing(1, 0),
        [theme.breakpoints.up('md')]: {
          margin: 0,
        },
      },
    },
  },
  sortContainer: {
    flex: 1,
    '@media (max-width: 1550px)': {
      marginTop: theme.spacing(1),
      justifyContent: 'flex-start !important',
      '& > div:first-of-type': {
        order: 2,
        '& .gwcl-MuiInputBase-root': {
          position: 'static',
        },
      },
      '& .gwcl-MuiBox-root': {
        order: 1,
      },
    },
  },
}));

const Filters: React.FC<IProps> = ({
  sortedOrder,
  handleFilterFormSubmit,
  handleSearchInputChange,
  handleSortingMenuChange,
}) => {
  const classes = useStyles();
  const { t } = useTranslation(['common', 'payment']);
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

  const handleRegionChange = (
    selectedOption: any,
    setFieldValue: Function,
    values: typeof gwclPaypointFilterFormInitialData
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
    values: typeof gwclPaypointFilterFormInitialData
  ) => {
    if (selectedOption) {
      dispatch(getRoutes({ district_id: selectedOption.value }));
    }
    if (selectedOption !== values.district_id) {
      setFieldValue('route_id', []);
    }
  };

  const sortByDropdownOption = [
    { label: t('common:firstAdded'), value: sortingOrder.ASCENDING },
    { label: t('common:lastAdded'), value: sortingOrder.DESCENDING },
  ];

  const paypointOptions = [{}];
  const cashierOptions = [{}];

  const selectedSortedOption = useMemo(() => {
    return sortByDropdownOption.find((item: IAutoCompleteOption) => item.value === sortedOrder);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortedOrder, t]);

  return (
    <Box
      display={{ sm: 'block', md: 'flex' }}
      marginTop={2}
      alignItems="center"
      justifyContent="space-between"
      className={classes.filtersWrapper}
    >
      <Formik
        enableReinitialize
        initialValues={gwclPaypointFilterFormInitialData}
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
                name="cashier"
                label={t('payment:cashier')}
                options={cashierOptions}
                textFieldProps={{ variant: 'outlined' }}
              />

              <FormikControl
                control="autoComplete"
                name="paypoint"
                label={t('payment:paypoint')}
                options={paypointOptions}
                textFieldProps={{ variant: 'outlined' }}
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

              <Button fullWidth={matches} type="submit" variant="outlined" startIcon={<FilterIcon />}>
                {t('common:filters')}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>

      <Box
        display={{ sm: 'block', md: 'flex' }}
        justifyContent="flex-end"
        justifySelf="end"
        className={classes.sortContainer}
      >
        <FilterSearch onChange={handleSearchInputChange} />
        <SortByDropdown
          value={selectedSortedOption!}
          options={sortByDropdownOption}
          handleMenuItemChange={handleSortingMenuChange!}
        />
      </Box>
    </Box>
  );
};

export default Filters;
