import { Box } from '@material-ui/core';
import { FilterIcon } from 'assets/images';
import Button from 'components/Button';
import { FilterSearch, SortByDropdown } from 'components/Filters';
import { FormikControl } from 'components/Form';
import { Form, Formik } from 'formik';
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
import { filterFormIntialData } from './schema';
import useStyles from './style';

interface IProps {
  sortedOrder: string;
  handleFilterFormSubmit: (values: any) => void;
  handleSearchInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSortingMenuChange: (value: any) => void;
}

const FilterForm: React.FC<IProps> = ({
  sortedOrder,
  handleFilterFormSubmit,
  handleSearchInputChange,
  handleSortingMenuChange,
}) => {
  const { t } = useTranslation(['common']);
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const regionsOptions = useSelector(selectRegionsOptions);
  const regionsStatus = useSelector(selectRegionsStatus);
  const districtsOptions = useSelector(selectDistrictsOptions);
  const districtsStatus = useSelector(selectDistrictsStatus);
  const routeOptions = useSelector(selectRoutesOptions);
  const routeStatus = useSelector(selectRoutesStatus);
  const sortByDropdownOption = [
    { label: t('common:firstAdded'), value: 'firstAdded' },
    { label: t('common:lastAdded'), value: 'lastAdded' },
  ];

  useEffect(() => {
    dispatch(getRegions());
  }, [dispatch]);

  const handleRegionChange = (selectedOption: any, setFieldValue: Function, values: typeof filterFormIntialData) => {
    if (selectedOption) {
      dispatch(getDistricts({ region_id: selectedOption.value }));
    }
    if (selectedOption !== values.region_id) {
      setFieldValue('district_id', null);
      setFieldValue('route_id', null);
    }
  };

  const handleDistrictChange = (selectedOption: any, setFieldValue: Function, values: typeof filterFormIntialData) => {
    if (selectedOption) {
      dispatch(getRoutes({ district_id: selectedOption.value }));
    }
    if (selectedOption !== values.district_id) {
      setFieldValue('route_id', []);
    }
  };

  const statusOptions = [{}];

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
      >
        <Formik
          enableReinitialize
          initialValues={filterFormIntialData}
          onSubmit={values => {
            handleFilterFormSubmit(values);
          }}
        >
          {({ setFieldValue, values }) => (
            <Form autoComplete="off" className={classes.filterForm}>
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
                  name="status"
                  label={t('common:status')}
                  options={statusOptions}
                  textFieldProps={{ variant: 'outlined' }}
                />
                <FormikControl
                  control="datepicker"
                  name="lastBillDate"
                  label={t('common:lastBilledOn')}
                  datePickerProps={{
                    onChange: (date: any) => {
                      console.log(date);
                      if (date) {
                        setFieldValue('lastBillDate', date);
                      } else {
                        setFieldValue('lastBillDate', null);
                      }
                    },
                  }}
                />
                <Button type="submit" variant="outlined" className={classes.filterButton} startIcon={<FilterIcon />}>
                  {t('common:filters')}
                </Button>
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
            handleMenuItemChange={handleSortingMenuChange}
          />
        </Box>
      </Box>
    </>
  );
};
export default FilterForm;
