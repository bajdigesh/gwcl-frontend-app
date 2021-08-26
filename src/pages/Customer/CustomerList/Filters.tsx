import { Box, Checkbox, FormControlLabel, makeStyles, useMediaQuery, useTheme } from '@material-ui/core';
import { FilterIcon } from 'assets/images';
import Button from 'components/Button';
import FilterSearch from 'components/Filters/FilterSearch';
import SortByDropdown from 'components/Filters/SortByDropdown';
import { FormikControl } from 'components/Form';
import { Form, Formik } from 'formik';
import { sortingOrder } from 'global/constants';
import React, { useEffect, useMemo, useState } from 'react';
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
import { customerListFilterFormData } from './schemas';

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
    '& .gwcl-MuiAutocomplete-root': {
      flex: '1 1 175px',
      margin: theme.spacing(0, 0, 1),
      [theme.breakpoints.up('md')]: {
        margin: 0,
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
    '& > div:first-of-type': {
      order: 2,

      '& > .gwcl-MuiInputBase-root': {
        position: 'static',

        [theme.breakpoints.up('lg')]: {
          position: 'absolute',
        },
      },

      [theme.breakpoints.up('lg')]: {
        order: 1,
      },
    },

    '& .gwcl-MuiBox-root': {
      margin: theme.spacing(1, 0),
      order: 1,

      [theme.breakpoints.up('md')]: {
        margin: 0,
      },

      [theme.breakpoints.up('lg')]: {
        order: 2,
      },
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
  const classes = useStyles();
  const { t } = useTranslation(['common', 'customers']);
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const regionsOptions = useSelector(selectRegionsOptions);
  const regionsStatus = useSelector(selectRegionsStatus);
  const districtsOptions = useSelector(selectDistrictsOptions);
  const districtsStatus = useSelector(selectDistrictsStatus);
  const routeOptions = useSelector(selectRoutesOptions);
  const routeStatus = useSelector(selectRoutesStatus);
  const [checkedState, setCheckedState] = useState(false);

  const sortByDropdownOption = [
    { label: t('common:firstAdded'), value: sortingOrder.ASCENDING },
    { label: t('common:lastAdded'), value: sortingOrder.DESCENDING },
  ];

  const selectedSortedOption = useMemo(() => {
    return sortByDropdownOption.find((item: IAutoCompleteOption) => item.value === sortedOrder);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortedOrder, t]);

  const handleChange = () => {
    setCheckedState(!checkedState);
  };

  useEffect(() => {
    dispatch(getRegions());
  }, [dispatch]);

  const handleRegionChange = (
    selectedOption: any,
    setFieldValue: Function,
    values: typeof customerListFilterFormData
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
    values: typeof customerListFilterFormData
  ) => {
    if (selectedOption) {
      dispatch(getRoutes({ district_id: selectedOption.value }));
    }
    if (selectedOption !== values.district_id) {
      setFieldValue('route_id', []);
    }
  };

  return (
    <Box
      display={{ sm: 'block', md: 'flex' }}
      mt={2}
      alignItems={{ md: 'flex-start', lg: 'center' }}
      justifyContent="space-between"
      className={classes.filtersWrapper}
    >
      <Formik
        enableReinitialize
        initialValues={customerListFilterFormData}
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
                disabled={!values.region_id}
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
                fullWidth={matches}
                type="submit"
                variant="outlined"
                startIcon={<FilterIcon />}
                className={classes.filterButton}
              >
                {t('common:filters')}
              </Button>

              <FormControlLabel
                control={<Checkbox checked={checkedState} onChange={handleChange} name="exception" color="primary" />}
                label={t('customers:withException')}
              />
            </Box>
          </Form>
        )}
      </Formik>

      <Box
        display={{ sm: 'block', md: 'flex' }}
        justifyContent={{ md: 'flex-start', lg: 'center' }}
        justifySelf="end"
        className={classes.filterAndSort}
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
