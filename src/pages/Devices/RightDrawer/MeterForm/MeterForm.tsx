import { Box, Typography } from '@material-ui/core';
import { unwrapResult } from '@reduxjs/toolkit';
import { Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import Button from 'components/Button';
import { FormikControl } from 'components/Form';
import useStyles from 'pages/Devices/RightDrawer/styles';
import {
  getMeterFormAutoCompleteOptions,
  saveMeter,
  selectSaveMeterState,
  selectGetMeterFormAutocompleteOptions,
  resetMeterFormAutoCompleteOptions,
} from 'store/device/meters';
import { meterFormData, meterFormValidationSchema } from './schema';

interface IProps {
  formValues: typeof meterFormData;
  onSuccess?: () => void;
  toggleDrawer: () => void;
}
const MeterForm: React.FC<IProps> = ({ formValues: formData, onSuccess, toggleDrawer }) => {
  const classes = useStyles();
  const { t } = useTranslation(['common', 'devices']);
  const dispatch = useAppDispatch();
  const { status: saveMeterStatus } = useSelector(selectSaveMeterState);
  const { status: meterFormAutoCompleteOptionsStatus, data: meterFormAutoCompleteOptionsData } = useSelector(
    selectGetMeterFormAutocompleteOptions
  );

  const meterVerificationOptions = [
    { label: t('common:yes'), value: '1' },
    { label: t('common:no'), value: '0' },
  ];

  useEffect(() => {
    dispatch(getMeterFormAutoCompleteOptions());
    return () => {
      dispatch(resetMeterFormAutoCompleteOptions());
    };
  }, [dispatch]);

  const handleFormSubmit = (values: typeof meterFormData) => {
    const postData = {
      ...values,
      meter_brand_id: values.meter_brand_id?.value || null,
      meter_model_id: values.meter_model_id?.value || null,
      meter_size_id: values.meter_size_id?.value || null,
      meter_type_id: values.meter_type_id?.value || null,
      meter_status_id: values.meter_status_id?.value || null,
      meter_state_id: values.meter_state_id?.value || null,
      meter_install_stage_id: values.meter_install_stage_id?.value || null,
    };
    dispatch(saveMeter(postData))
      .then(unwrapResult)
      .then(_ => {
        if (onSuccess) {
          onSuccess();
        }
        toggleDrawer();
      });
  };
  return (
    <>
      <Typography variant="h3" className={classes.drawerTitle}>
        {formData?.id ? t('devices:editMeter') : t('devices:addMeter')}
      </Typography>
      <div className={classes.drawerContent}>
        <Formik
          enableReinitialize
          initialValues={formData}
          validationSchema={meterFormValidationSchema}
          onSubmit={values => {
            handleFormSubmit(values);
          }}
        >
          {({ setFieldValue, values }) => (
            <Form autoComplete="off">
              <FormikControl
                control="input"
                type="input"
                label={t('devices:meterNumber')}
                name="meter_number"
                required
              />
              <FormikControl
                control="autoComplete"
                label={t('devices:meterBrands')}
                name="meter_brand_id"
                loading={meterFormAutoCompleteOptionsStatus === 'loading'}
                options={meterFormAutoCompleteOptionsData.meterBrands}
                textFieldProps={{ variant: 'standard', required: true }}
              />
              <FormikControl
                control="autoComplete"
                label={t('devices:meterModal')}
                name="meter_model_id"
                loading={meterFormAutoCompleteOptionsStatus === 'loading'}
                options={meterFormAutoCompleteOptionsData.meterModels}
                textFieldProps={{ variant: 'standard', required: true }}
              />
              <FormikControl
                control="autoComplete"
                label={t('devices:meterSize')}
                name="meter_size_id"
                loading={meterFormAutoCompleteOptionsStatus === 'loading'}
                options={meterFormAutoCompleteOptionsData.meterSizes}
                textFieldProps={{ variant: 'standard', required: true }}
              />
              <FormikControl
                control="autoComplete"
                label={t('devices:meterType')}
                name="meter_type_id"
                loading={meterFormAutoCompleteOptionsStatus === 'loading'}
                options={meterFormAutoCompleteOptionsData.meterTypes}
                textFieldProps={{ variant: 'standard', required: true }}
              />
              <FormikControl
                control="autoComplete"
                label={t('devices:meterStatus')}
                name="meter_status_id"
                loading={meterFormAutoCompleteOptionsStatus === 'loading'}
                options={meterFormAutoCompleteOptionsData.meterStatus}
              />
              <FormikControl
                control="autoComplete"
                label={t('devices:meterState')}
                name="meter_state_id"
                loading={meterFormAutoCompleteOptionsStatus === 'loading'}
                options={meterFormAutoCompleteOptionsData.meterStates}
                textFieldProps={{ variant: 'standard', required: true }}
              />
              <FormikControl
                control="autoComplete"
                label={t('devices:meterInstallStage')}
                name="meter_install_stage_id"
                loading={meterFormAutoCompleteOptionsStatus === 'loading'}
                options={meterFormAutoCompleteOptionsData.meterInstallStages}
              />
              <Box mb={3}>
                <Typography gutterBottom variant="subtitle2" className={classes.capitalizedText}>
                  {t('devices:meterVerification')}
                </Typography>
                <FormikControl
                  control="radio"
                  name="meter_verified"
                  options={meterVerificationOptions}
                  radioGroupProps={{ row: true }}
                  textFieldProps={{ variant: 'standard', required: true }}
                />
              </Box>
              <Box mb={3}>
                <Typography gutterBottom variant="subtitle2" className={classes.capitalizedText}>
                  {t('devices:meterNumberVerified')}
                </Typography>
                <FormikControl
                  control="radio"
                  name="meter_number_verified"
                  options={meterVerificationOptions}
                  radioGroupProps={{ row: true }}
                  textFieldProps={{ variant: 'standard', required: true }}
                />
              </Box>
              <div className={classes.drawerFooter}>
                <Button type="submit" fullWidth size="large" borderRadius={0} loading={saveMeterStatus === 'loading'}>
                  {values.id ? t('devices:editMeter') : t('devices:addMeter')}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};
export default MeterForm;
