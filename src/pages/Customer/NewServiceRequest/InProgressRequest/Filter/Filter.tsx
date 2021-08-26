import { Box, useTheme } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { FilterIcon } from 'assets/images';
import Button from 'components/Button';
import { FilterSearch, SortByDropdown } from 'components/Filters';
import { FormikControl } from 'components/Form';
import { Form, Formik } from 'formik';
import { sortingOrder } from 'global/constants';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'store';
import { filterFormInitialData } from './schema';
import useStyles from './styles';

interface IProps {
  sortedOrder: string;
  handleFilterFormSubmit: (values: any) => void;
  handleSearchInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSortingMenuChange: (value: any) => void;
}

const Filter: React.FC<IProps> = ({
  sortedOrder,
  handleFilterFormSubmit,
  handleSearchInputChange,
  handleSortingMenuChange,
}) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation(['common', 'users']);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();
  const sortByDropdownOption = [
    { label: t('common:firstAdded'), value: sortingOrder.ASCENDING },
    { label: t('common:lastAdded'), value: sortingOrder.DESCENDING },
  ];

  const selectedSortedOption = useMemo(() => {
    return sortByDropdownOption.find((item: IAutoCompleteOption) => item.value === sortedOrder);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortedOrder, t]);

  return (
    <>
      <div className={classes.filterRowGrid}>
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
              <Button type="submit" variant="outlined" className={classes.filterButton} startIcon={<FilterIcon />}>
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
      </div>
    </>
  );
};
export default Filter;
