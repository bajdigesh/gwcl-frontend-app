import { Box } from '@material-ui/core';
import { FilterIcon } from 'assets/images';
import Button from 'components/Button';
import { FilterSearch, SortByDropdown } from 'components/Filters';
import { FormikControl } from 'components/Form';
import { Form, Formik } from 'formik';
import { sortingOrder } from 'global/constants';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import { getPhoneStatus, selectGetPhoneStatusState, selectPhoneStatusOptions } from 'store/device/phones';
import { getUsers, selectGetUsers, selectUsersOptions } from 'store/users';
import { useLazyAutocomplete } from 'utils/hooks';
import useStyles from './style';

interface IProps {
  sortedOrder: string;
  handleFilterFormSubmit: (values: any) => void;
  handleSearchInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSortingMenuChange: (value: any) => void;
}

const filterFormInitialData = {
  assigned_to_user_id: null,
  user_phone_status_id: null,
};

const Filters: React.FC<IProps> = ({
  sortedOrder,
  handleFilterFormSubmit,
  handleSearchInputChange,
  handleSortingMenuChange,
}) => {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const { t } = useTranslation(['common', 'devices']);
  const { status: getPhoneStatusStatus } = useSelector(selectGetPhoneStatusState);
  const phoneStatusOptions = useSelector(selectPhoneStatusOptions);
  const usersOptions = useSelector(selectUsersOptions);
  const { status: getUsersStatus } = useSelector(selectGetUsers);
  const sortByDropdownOption = [
    { label: t('common:firstAdded'), value: sortingOrder.ASCENDING },
    { label: t('common:lastAdded'), value: sortingOrder.DESCENDING },
  ];

  const mapOptions = useCallback(
    (item: any) => ({
      label: item?.first_name,
      value: item?.id,
    }),
    []
  );

  const { searchItems, loadOptions, fetchMoreItems } = useLazyAutocomplete({ getItems: getUsers, mapOptions });

  useEffect(() => {
    dispatch(getUsers({}));
    dispatch(getPhoneStatus());
  }, [dispatch]);

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
                control="lazyAutoComplete"
                name="assigned_to_user_id"
                label={t('devices:assignedTo')}
                loading={getUsersStatus === 'loading'}
                options={usersOptions}
                textFieldProps={{ variant: 'outlined' }}
                searchItems={searchItems}
                loadOptions={loadOptions}
                fetchMoreItems={fetchMoreItems}
              />
              <FormikControl
                control="autoComplete"
                name="user_phone_status_id"
                label={t('devices:status')}
                loading={getPhoneStatusStatus === 'loading'}
                options={phoneStatusOptions}
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
      </Box>
    </>
  );
};
export default Filters;
