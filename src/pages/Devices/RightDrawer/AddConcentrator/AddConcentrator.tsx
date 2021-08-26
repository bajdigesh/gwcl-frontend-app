import { Box, Typography } from '@material-ui/core';
import { unwrapResult } from '@reduxjs/toolkit';
import Button from 'components/Button';
import { FormikControl } from 'components/Form';
import toast from 'components/Toast';
import format from 'date-fns/format';
import { Form, Formik } from 'formik';
import { MONTH_DAY_YEAR_TIME_FORMAT, YEAR_MONTH_DAY_TIME_HYPHEN_FORMAT } from 'global/constants';
import useStyles from 'pages/Devices/RightDrawer/styles';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import { saveConcentrator, selectSaveConcentrator } from 'store/device/concentrators';
import { getUsers, selectGetUsers } from 'store/users';
import { mapObjectValuesToHtmlElement } from 'utils';
import { useLazyAutocomplete } from 'utils/hooks';
import { concentratorInitialData, concentratorValidationSchema } from './schema';

interface IAddConcentratorProps {
  formData?: typeof concentratorInitialData;
  onSuccess: () => void;
  toggleDrawer: () => void;
}

const AddConcentrator: React.FC<IAddConcentratorProps> = ({
  formData = concentratorInitialData,
  onSuccess,
  toggleDrawer,
}) => {
  const classes = useStyles();
  const { t } = useTranslation(['devices', 'common']);

  const dispatch = useAppDispatch();
  const { status } = useSelector(selectSaveConcentrator);
  const { status: getUsersStatus } = useSelector(selectGetUsers);

  const mapOptions = useCallback(
    (item: any) => ({
      label: item?.first_name,
      value: item?.id,
    }),
    []
  );

  const { searchItems, loadOptions, fetchMoreItems } = useLazyAutocomplete({ getItems: getUsers, mapOptions });

  const handleSubmit = (values: typeof concentratorInitialData) => {
    console.log(values);
    const postData = {
      ...values,
      longitude: values.longitude ? parseFloat(values.longitude).toFixed(10) : null,
      latitude: values.latitude ? parseFloat(values.latitude).toFixed(10) : null,
      is_online: values.is_online === 'yes' ? true : false,
      installed_by: values.installed_by ? values.installed_by.value : null,
      installed_timestamp: values.installed_timestamp
        ? format(new Date(values.installed_timestamp), YEAR_MONTH_DAY_TIME_HYPHEN_FORMAT)
        : null,
    };
    dispatch(saveConcentrator(postData))
      .then(unwrapResult)
      .then(_ => {
        onSuccess();
        toggleDrawer();
      })
      .catch(errors => {
        const errorElement: any = mapObjectValuesToHtmlElement(errors, 'error occured');
        toast.error(errorElement);
      });
  };

  return (
    <>
      <Typography variant="h3">{formData.id ? t('devices:editConcentrator') : t('devices:addConcentrator')}</Typography>
      <Box mt={3} height="calc(100vh - 170px)" overflow="hidden auto">
        <Formik
          initialValues={formData}
          validationSchema={concentratorValidationSchema}
          onSubmit={async values => {
            handleSubmit(values);
          }}
        >
          {() => (
            <Form noValidate>
              <FormikControl control="input" type="text" label="IMEI" name="imei" required />
              <FormikControl
                control="input"
                type="text"
                label={t('devices:concentratorNumber')}
                name="concentrator_number"
                required
              />
              <FormikControl control="input" type="text" label={t('common:ipAddress')} name="ip_address" required />
              <FormikControl control="input" type="text" label={t('common:latitude')} name="latitude" required />
              <FormikControl control="input" type="text" label={t('common:longitude')} name="longitude" required />
              <FormikControl control="input" type="text" label={t('common:phoneNumber')} name="phone_number" required />

              <Box mb={3}>
                <Typography gutterBottom variant="subtitle2">
                  {t('common:active')}
                </Typography>
                <FormikControl
                  control="radio"
                  name="is_online"
                  options={[
                    { label: t('common:yes'), value: 'yes' },
                    { label: t('common:no'), value: 'no' },
                  ]}
                  radioGroupProps={{ row: true }}
                />
              </Box>
              <FormikControl
                control="lazyAutoComplete"
                name="installed_by"
                label={t('devices:installedBy')}
                loading={getUsersStatus === 'loading'}
                textFieldProps={{ variant: 'standard' }}
                searchItems={searchItems}
                loadOptions={loadOptions}
                fetchMoreItems={fetchMoreItems}
              />
              <FormikControl
                control="datepicker"
                type="text"
                variant="standard"
                label={t('devices:installedTimestamp')}
                name="installed_timestamp"
                fullWidth={true}
                datePickerProps={{
                  showTimeSelect: true,
                  timeInputLabel: 'Time:',
                  dateFormat: MONTH_DAY_YEAR_TIME_FORMAT,
                }}
              />
              <div className={classes.footerFixedBtn}>
                <Button
                  disableElevation
                  type="submit"
                  fullWidth
                  borderRadius={0}
                  size="large"
                  loading={status === 'loading'}
                >
                  {formData.id ? t('devices:editConcentrator') : t('devices:addConcentrator')}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default AddConcentrator;
