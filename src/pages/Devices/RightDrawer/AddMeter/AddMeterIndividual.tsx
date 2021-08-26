import { Box, Typography } from '@material-ui/core';
import { unwrapResult } from '@reduxjs/toolkit';
import Button from 'components/Button';
import { FormikControl } from 'components/Form';
import { Form, Formik } from 'formik';
import useStyles from 'pages/Devices/RightDrawer/styles';
import { checkMeterInitialData, checkMeterlValidationSchema } from 'pages/Devices/Shared/schema';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import {
  linkConcentratorWithMeter,
  selectGetConcentratorByIdState,
  selectLinkConcentratorWithMeterState,
} from 'store/device/concentrators';
import {
  getMeterByMeterNumber,
  resetGetMeterByMeterNumberState,
  selectGetMeterByMeterNumberState,
} from 'store/device/meters';
import { useTranslation } from 'react-i18next';

const AddMeterIndividual = () => {
  const classes = useStyles();
  const { t } = useTranslation(['devices']);
  const dispatch = useAppDispatch();
  const { data: concentratorByIdData } = useSelector(selectGetConcentratorByIdState);
  const { status: linkConcentratorWithMeterStatus } = useSelector(selectLinkConcentratorWithMeterState);
  const { status, data } = useSelector(selectGetMeterByMeterNumberState);
  const formikRef = useRef(null) as any;

  useEffect(() => {
    return () => {
      dispatch(resetGetMeterByMeterNumberState());
    };
  }, [dispatch]);

  const handleSubmit = (values: typeof checkMeterInitialData) => {
    dispatch(getMeterByMeterNumber(values.meter));
  };

  const handleLinkButtonClick = () => {
    const linkData = {
      concentratorId: concentratorByIdData?.payload?.id,
      postData: { meter_id: +data?.payload?.id },
    };
    dispatch(linkConcentratorWithMeter(linkData))
      .then(unwrapResult)
      .then(_ => {
        if (formikRef?.current) {
          formikRef?.current.resetForm();
        }
        dispatch(resetGetMeterByMeterNumberState());
      });
  };

  return (
    <Box mt={3}>
      <Formik
        innerRef={formikRef}
        initialValues={checkMeterInitialData}
        enableReinitialize={true}
        validationSchema={checkMeterlValidationSchema}
        onSubmit={async values => {
          handleSubmit(values);
        }}
      >
        {() => (
          <Form>
            <FormikControl control="input" type="text" placeholder={t('devices:meterSerialNumber')} name="meter" />
            <Button disableElevation type="submit" borderRadius={8} loading={status === 'loading'}>
              {t('devices:checkMeter')}
            </Button>
          </Form>
        )}
      </Formik>
      {status === 'failed' && (
        <Box bgcolor="grey.400" p={3} mt={6} borderRadius={6} border={0}>
          <Typography variant="body1" color="textSecondary">
            {t('devices:meterNotFound')}
          </Typography>
        </Box>
      )}
      {status === 'success' && data?.payload?.concentrator_id && (
        <Box bgcolor="grey.400" p={3} mt={6} borderRadius={6} border={0}>
          <Typography variant="body2" color="textPrimary" gutterBottom>
            {t('devices:this')}{' '}
            <Box component="span" color="primary.main" fontWeight={600}>
              {t('devices:meter')} (#{data.payload?.meter_number}){' '}
            </Box>
            {t('devices:isCurrentlyLinkedTo')}{' '}
            <Box component="span" color="primary.main" fontWeight={600}>
              {t('devices:concentrator')} #{data.payload?.concentrator?.concentrator_number}.
            </Box>
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {t('devices:linkToAnotherWillDisconnect')}
          </Typography>
        </Box>
      )}
      {status === 'success' && !data?.payload?.concentrator_id && (
        <>
          <Box bgcolor="grey.400" p={3} mt={6} borderRadius={6} border={0}>
            <Typography variant="body2" color="textPrimary" gutterBottom>
              {t('devices:this')}{' '}
              <Box component="span" color="primary.main" fontWeight={600}>
                {t('devices:meter')} (#{data?.payload?.meter_number}){' '}
              </Box>
              {t('devices:isCurrentlyLinkedTo')}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {t('devices:canAddToCurrentConcentrator')}
            </Typography>
          </Box>
          <div className={classes.footerFixedBtn}>
            <Button
              disableElevation
              fullWidth
              type="submit"
              borderRadius={0}
              size="large"
              loading={linkConcentratorWithMeterStatus === 'loading'}
              onClick={handleLinkButtonClick}
            >
              {t('devices:linkToConc')} {concentratorByIdData?.payload?.concentrator_number}
            </Button>
          </div>
        </>
      )}
    </Box>
  );
};

export default AddMeterIndividual;
