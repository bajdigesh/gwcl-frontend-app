import { Box, Divider, Typography } from '@material-ui/core';
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
  selectGetConcentratorByIdState,
  selectUnLinkConcentratorWithMeterState,
  unLinkConcentratorWithMeter,
} from 'store/device/concentrators';
import {
  getMeterByMeterNumber,
  resetGetMeterByMeterNumberState,
  selectGetMeterByMeterNumberState,
} from 'store/device/meters';
import { useTranslation } from 'react-i18next';

const DeleteMeter = () => {
  const classes = useStyles();
  const { t } = useTranslation(['common', 'devices']);
  const dispatch = useAppDispatch();
  const { data: concentratorByIdData } = useSelector(selectGetConcentratorByIdState);
  const { status, data } = useSelector(selectGetMeterByMeterNumberState);
  const { status: unLinkConcentratorWithMeterStatus } = useSelector(selectUnLinkConcentratorWithMeterState);
  const formikRef = useRef(null) as any;

  useEffect(() => {
    return () => {
      dispatch(resetGetMeterByMeterNumberState());
    };
  }, [dispatch]);

  const handleSubmit = (values: typeof checkMeterInitialData) => {
    dispatch(getMeterByMeterNumber(values.meter));
  };

  const handleRemoveMeterButtonClick = () => {
    const unLinkData = {
      concentratorId: concentratorByIdData?.payload?.id,
      postData: { meter_id: +data?.payload?.id },
    };
    dispatch(unLinkConcentratorWithMeter(unLinkData))
      .then(unwrapResult)
      .then(_ => {
        if (formikRef?.current) {
          formikRef?.current.resetForm();
        }
        dispatch(resetGetMeterByMeterNumberState());
      });
  };

  return (
    <Box mt={7}>
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
      {/* Meter Not Found */}
      {status === 'failed' && (
        <Box bgcolor="grey.400" p={3} mt={6} borderRadius={6} border={0}>
          <Typography variant="body1" color="textSecondary">
            {t('devices:meterNotFound')}
          </Typography>
        </Box>
      )}

      {/* Not linked to concentrator message */}
      {status === 'success' &&
        data?.payload?.concentrator?.concentrator_number !== concentratorByIdData?.payload?.concentrator_number && (
          <Box bgcolor="grey.400" p={3} mt={6} borderRadius={6} border={0}>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              {t('devices:meterNotLinked')} {concentratorByIdData?.payload?.concentrator_number}.
            </Typography>
            <Box mt={1.25} mb={1}>
              <Divider light />
            </Box>
            <Typography variant="body2" color="textPrimary" gutterBottom>
              {t('devices:this')}{' '}
              <Box component="span" color="primary.main" fontWeight={600}>
                {t('devices:meter')} (#{data?.payload?.meter_number}){' '}
              </Box>
              {data?.payload?.concentrator?.concentrator_number ? (
                <>
                  {t('devices:isCurrentlyLinkedTo')}{' '}
                  <Box component="span" color="primary.main" fontWeight={600}>
                    {t('devices:concentrator')} #{data?.payload?.concentrator?.concentrator_number}.
                  </Box>
                </>
              ) : (
                <>
                  {t('devices:isNotLinkedToAny')}{' '}
                  <Box component="span" color="primary.main" fontWeight={600}>
                    {t('devices:concentrator')}
                  </Box>
                </>
              )}
            </Typography>
          </Box>
        )}

      {/* Success message */}
      {status === 'success' && data?.payload?.concentrator_id && (
        <>
          <Box bgcolor="grey.400" p={3} mt={6} borderRadius={6} border={0}>
            <Typography variant="body1" color="textPrimary" gutterBottom>
              {t('devices:meter')}:{' '}
              <Box component="span" color="primary.main" fontWeight={600}>
                {data?.payload?.meter_number}
              </Box>
            </Typography>
            <Typography variant="body1" color="textPrimary" gutterBottom>
              {t('common:accountName')}:{' '}
              <Box component="span" color="primary.main" fontWeight={600}>
                {data?.payload?.brand?.name || '___'}
              </Box>
            </Typography>
            <Box mt={1.25} mb={1}>
              <Divider light />
            </Box>
            <Typography variant="caption" color="textSecondary">
              {t('devices:deleteConcentratorWarning')}
            </Typography>
          </Box>
          <div className={classes.footerFixedBtn}>
            <Button
              disableElevation
              fullWidth
              btnDanger
              borderRadius={0}
              size="large"
              loading={unLinkConcentratorWithMeterStatus === 'loading'}
              onClick={handleRemoveMeterButtonClick}
            >
              {t('devices:removeMeterFromConc')} 27364892
            </Button>
          </div>
        </>
      )}
    </Box>
  );
};

export default DeleteMeter;
