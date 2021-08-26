import { Box, useMediaQuery, useTheme } from '@material-ui/core';
import { FilterIcon } from 'assets/images';
import Button from 'components/Button';
import { FilterSearch, SortByDropdown } from 'components/Filters';
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
import { filterFormInitialData } from './schema';
import useStyles from './styles';

interface IProps {
  sortedOrder: string;
  handleFilterFormSubmit: (values: any) => void;
  handleSearchInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSortingMenuChange: (value: any) => void;
}

const Filters: React.FC<IProps> = ({
  sortedOrder,
  handleFilterFormSubmit,
  handleSearchInputChange,
  handleSortingMenuChange,
}) => {
  const classes = useStyles();
  const { t } = useTranslation(['common', 'devices']);
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const regionsOptions = useSelector(selectRegionsOptions);
  const regionsStatus = useSelector(selectRegionsStatus);
  const districtsOptions = useSelector(selectDistrictsOptions);
  const districtsStatus = useSelector(selectDistrictsStatus);
  const routesOptions = useSelector(selectRoutesOptions);
  const routesStatus = useSelector(selectRoutesStatus);
  const sortByDropdownOption = [
    { label: t('common:firstAdded'), value: sortingOrder.ASCENDING },
    { label: t('common:lastAdded'), value: sortingOrder.DESCENDING },
  ];

  useEffect(() => {
    dispatch(getRegions());
  }, [dispatch]);

  /**
   * OnChange Handler
   */
  const handleRegionChange = (selectedOption: any, setFieldValue: Function, values: typeof filterFormInitialData) => {
    if (selectedOption) {
      dispatch(getDistricts({ region_id: selectedOption.value }));
    }
    if (selectedOption !== values.region_id) {
      setFieldValue('district_id', null);
      setFieldValue('route_id', null);
    }
  };

  const handleDistrictChange = (selectedOption: any, setFieldValue: Function, values: typeof filterFormInitialData) => {
    if (selectedOption) {
      dispatch(getRoutes({ district_id: selectedOption.value }));
    }
    if (selectedOption !== values.district_id) {
      setFieldValue('route_id', null);
    }
  };

  const selectedSortedOption = useMemo(() => {
    return sortByDropdownOption.find((item: IAutoCompleteOption) => item.value === sortedOrder);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortedOrder, t]);

  return (
    <>
      <Box display="grid" className={classes.filterRowGrid}>
        <Formik
          enableReinitialize
          initialValues={filterFormInitialData}
          onSubmit={values => {
            handleFilterFormSubmit(values);
          }}
        >
          {({ setFieldValue, values }) => (
            <Form autoComplete="off" className={classes.filterFormWrapper}>
              <FormikControl
                control="autoComplete"
                name="region_id"
                label={t('common:regions')}
                loading={regionsStatus === 'loading'}
                options={regionsOptions}
                textFieldProps={{ variant: 'outlined' }}
                onChangeCallBack={(value: any) => {
                  handleRegionChange(value, setFieldValue, values);
                }}
              />
              <FormikControl
                control="autoComplete"
                name="district_id"
                label={t('common:districts')}
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
                label={t('common:routes')}
                loading={routesStatus === 'loading'}
                options={routesOptions}
                textFieldProps={{ variant: 'outlined' }}
                disabled={!values.district_id}
              />
              <FormikControl
                control="autoComplete"
                name="category_id"
                label="All Categories"
                // loading={regionsStatus === 'loading'}
                options={[{ label: 'Category 1', value: 1 }]}
                textFieldProps={{ variant: 'outlined' }}
              />
              <FormikControl
                control="autoComplete"
                name="status_id"
                label="Request Status"
                // loading={districtsStatus === 'loading'}
                options={[{ label: 'Status 1', value: 1 }]}
                textFieldProps={{ variant: 'outlined' }}
              />
              <FormikControl
                control="datepicker"
                name="start_date"
                label={t('common:addedBetween')}
                startdate={values.start_date}
                enddate={values.end_date}
                datePickerProps={{
                  startDate: values.start_date,
                  endDate: values.end_date,
                  onChange: (dates: any) => {
                    if (dates) {
                      setFieldValue('start_date', dates[0]);
                      setFieldValue('end_date', dates[1]);
                    } else {
                      setFieldValue('start_date', null);
                      setFieldValue('end_date', null);
                    }
                  },
                  monthsShown: matches ? 1 : 2,
                  selectsRange: true,
                  shouldCloseOnSelect: false,
                }}
              />
              <Button
                type="submit"
                variant="outlined"
                size="medium"
                className={classes.filterButton}
                startIcon={<FilterIcon />}
              >
                {t('common:filters')}
              </Button>
            </Form>
          )}
        </Formik>
        <Box display="flex" justifyContent="center" justifySelf="end" className={classes.searchAndSort}>
          <FilterSearch onChange={handleSearchInputChange} />
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
