import { Box, Typography } from '@material-ui/core';
import { unwrapResult } from '@reduxjs/toolkit';
import Button from 'components/Button';
import { FormikControl } from 'components/Form';
import toast from 'components/Toast';
import { format } from 'date-fns';
import { Form, Formik } from 'formik';
import { MONTH_DAY_YEAR_TIME_FORMAT, YEAR_MONTH_DAY_TIME_HYPHEN_FORMAT } from 'global/constants';
import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import {
  getPhoneModel,
  getPhoneStatus,
  savePhone,
  selectGetPhoneModelState,
  selectGetPhoneStatusState,
  selectPhoneModelOptions,
  selectPhoneStatusOptions,
  selectSavePhone,
} from 'store/device/phones';
import { getUsers, selectGetUsers } from 'store/users';
import { mapObjectValuesToHtmlElement } from 'utils';
import { useLazyAutocomplete } from 'utils/hooks';
import { phoneFormValidationSchema, phoneInitialData } from './schema';
import useStyles from './styles';

interface IProps {
  formValues: typeof phoneInitialData;
  onSuccess?: () => void;
  toggleDrawer: () => void;
}

const AddPhone: React.FC<IProps> = ({ formValues: formData, onSuccess, toggleDrawer }) => {
  const { t } = useTranslation(['devices']);
  const classes = useStyles();

  const dispatch = useAppDispatch();

  const { status: getUsersStatus } = useSelector(selectGetUsers);

  const { status: getPhoneStatusStatus } = useSelector(selectGetPhoneStatusState);
  const phoneStatusOptions = useSelector(selectPhoneStatusOptions);

  const { status: getPhoneModelStatus } = useSelector(selectGetPhoneModelState);
  const phoneModelOptions = useSelector(selectPhoneModelOptions);

  const { status: savePhoneStatus } = useSelector(selectSavePhone);

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
    dispatch(getPhoneModel());
  }, [dispatch]);

  const handleSubmit = (values: typeof phoneInitialData) => {
    const postData = {
      ...values,
      assigned_to_user_id: values.assigned_to_user_id ? values.assigned_to_user_id.value : null,
      user_phone_model_id: values.user_phone_model_id ? values.user_phone_model_id.value : null,
      user_phone_status_id: values.user_phone_status_id ? values.user_phone_status_id.value : null,
      received_date: values.received_date
        ? format(new Date(values.received_date), YEAR_MONTH_DAY_TIME_HYPHEN_FORMAT)
        : null,
      retirement_date: values.retirement_date
        ? format(new Date(values.retirement_date), YEAR_MONTH_DAY_TIME_HYPHEN_FORMAT)
        : null,
      monthly_data_allowance: values.monthly_data_allowance ? values.monthly_data_allowance : null,
    };

    dispatch(savePhone(postData))
      .then(unwrapResult)
      .then(_ => {
        if (onSuccess) {
          onSuccess();
        }
        toggleDrawer();
      })
      .catch(err => {
        const errorElement: any = mapObjectValuesToHtmlElement(err, 'error occured');
        toast.error(errorElement);
      });
  };

  return (
    <>
      <Typography variant="h3">{formData?.id ? t('devices:editPhone') : t('devices:addPhone')}</Typography>

      <Box mt={3} height="calc(100vh - 160px)" overflow="hidden auto">
        <Formik
          initialValues={formData}
          validationSchema={phoneFormValidationSchema}
          onSubmit={async values => {
            handleSubmit(values);
          }}
        >
          {({ values, setFieldValue }) => (
            <Form noValidate>
              <FormikControl control="input" type="input" label={t('devices:imei')} name="imei" required />

              <FormikControl
                control="lazyAutoComplete"
                name="assigned_to_user_id"
                label={t('devices:assignedTo')}
                loading={getUsersStatus === 'loading'}
                textFieldProps={{ variant: 'standard', required: true }}
                searchItems={searchItems}
                loadOptions={loadOptions}
                fetchMoreItems={fetchMoreItems}
                required
              />

              <FormikControl
                control="autoComplete"
                name="user_phone_model_id"
                label={t('devices:model')}
                loading={getPhoneModelStatus === 'loading'}
                options={phoneModelOptions}
                textFieldProps={{ variant: 'standard', required: true }}
                required
              />

              <FormikControl
                control="autoComplete"
                name="user_phone_status_id"
                label={t('devices:status')}
                loading={getPhoneStatusStatus === 'loading'}
                options={phoneStatusOptions}
                textFieldProps={{ variant: 'standard', required: true }}
                required
              />

              <FormikControl
                control="datepicker"
                type="text"
                variant="standard"
                label={t('devices:recievedDate')}
                name="received_date"
                fullWidth={true}
                datePickerProps={{
                  showTimeSelect: true,
                  timeInputLabel: 'Time:',
                  dateFormat: MONTH_DAY_YEAR_TIME_FORMAT,
                }}
                required
              />
              <FormikControl
                control="datepicker"
                type="text"
                variant="standard"
                label={t('devices:retirenmentDate')}
                name="retirement_date"
                fullWidth={true}
                datePickerProps={{
                  showTimeSelect: true,
                  timeInputLabel: 'Time:',
                  dateFormat: MONTH_DAY_YEAR_TIME_FORMAT,
                }}
                required
              />

              <FormikControl
                control="input"
                type="input"
                label={t('devices:monthlyDataAllowance')}
                name="monthly_data_allowance"
                required
              />

              <Button
                fullWidth
                disableElevation
                type="submit"
                size="large"
                borderRadius={0}
                loading={savePhoneStatus === 'loading'}
                className={classes.footerFixedBtn}
              >
                {formData.id ? t('devices:editPhone') : t('devices:addPhone')}
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default AddPhone;
