import { Box } from '@material-ui/core';
import { FilterIcon } from 'assets/images';
import Button from 'components/Button';
import { FilterSearch, SortByDropdown } from 'components/Filters';
import { FormikControl } from 'components/Form';
import { Form, Formik } from 'formik';
import { sortingOrder } from 'global/constants';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { filterFormInitialData } from './schema';
import useStyles from './style';

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
  const { t } = useTranslation(['common']);
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
                name="service_category"
                label={t('common:serviceCategory')}
                options={[{ label: 'category 1', value: 'category1' }]}
                textFieldProps={{ variant: 'outlined' }}
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
      </div>
    </>
  );
};
export default Filters;
