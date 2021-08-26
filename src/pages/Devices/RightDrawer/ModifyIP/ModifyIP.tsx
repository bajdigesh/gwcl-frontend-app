import { Avatar, Box, InputAdornment, Typography } from '@material-ui/core';
import { unwrapResult } from '@reduxjs/toolkit';
import { tickIcon } from 'assets/images';
import Button from 'components/Button';
import { FormikControl, TextField } from 'components/Form';
import { Form, Formik } from 'formik';
import useStyles from 'pages/Devices/RightDrawer/styles';
import { modifyIPInitialData, modifyIPValidationSchema } from 'pages/Devices/Shared/schema';
import React from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import {
  getConcentratorById,
  getConcentratorHistoriesById,
  selectGetConcentratorByIdState,
  selectUpdateConcentratorIpState,
  updateConcentratorIp,
} from 'store/device/concentrators';
import { useTranslation } from 'react-i18next';

const ModifyIP = () => {
  const classes = useStyles();
  const { t } = useTranslation(['devices']);
  const dispatch = useAppDispatch();
  const { status } = useSelector(selectUpdateConcentratorIpState);
  const { data: concentratorByIdData } = useSelector(selectGetConcentratorByIdState);
  // const handleSubmit = (values: typeof concentratorInitialData) => {
  //   console.log(values);
  // };

  const handleFormSubmit = (values: typeof modifyIPInitialData) => {
    console.log(values);
    const updateData = {
      concentratorId: concentratorByIdData?.payload?.id!,
      postData: values,
    };
    dispatch(updateConcentratorIp(updateData))
      .then(unwrapResult)
      .then(_ => {
        dispatch(getConcentratorById(concentratorByIdData?.payload?.id!));
        dispatch(getConcentratorHistoriesById(concentratorByIdData?.payload?.id!));
      });
  };

  return (
    <>
      <Typography variant="h3">{t('devices:modifyIP')}</Typography>
      <Box mt={3}>
        <TextField
          fullWidth
          label={t('devices:concentratorNumber')}
          value={concentratorByIdData?.payload?.concentrator_number}
        />

        <Box bgcolor="grey.400" p={3} mt={1} borderRadius={6} border={0}>
          <Typography variant="body1">
            {t('devices:IPOfConc')}
            {concentratorByIdData?.payload?.concentrator_number}:{' '}
            <Box component="span" color="primary.main" fontWeight="600">
              {concentratorByIdData?.payload?.ip_address || '_____'}
            </Box>
          </Typography>
          <Formik
            initialValues={modifyIPInitialData}
            validationSchema={modifyIPValidationSchema}
            onSubmit={async values => {
              handleFormSubmit(values);
            }}
          >
            {({ dirty, isValid, values }) => (
              <Box mt={3}>
                <Form>
                  <FormikControl
                    control="input"
                    type="text"
                    label={t('devices:newIP')}
                    name="ip_address"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {values.ip_address && values.ip_address === values.ip_address_confirmation && (
                            <Avatar
                              src={tickIcon}
                              variant="circle"
                              alt="correctIcon"
                              className={classes.smallTickIcon}
                            />
                          )}
                        </InputAdornment>
                      ),
                    }}
                  />
                  <FormikControl
                    control="input"
                    type="text"
                    label={t('devices:confirmNewIP')}
                    name="ip_address_confirmation"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {values.ip_address_confirmation && values.ip_address === values.ip_address_confirmation && (
                            <Avatar src={tickIcon} alt="correctIcon" className={classes.smallTickIcon} />
                          )}
                        </InputAdornment>
                      ),
                    }}
                  />
                  <div className={classes.footerFixedBtn}>
                    <Button
                      disableElevation
                      fullWidth
                      type="submit"
                      borderRadius={0}
                      size="large"
                      loading={status === 'loading'}
                    >
                      {t('devices:modifyIP')}
                    </Button>
                  </div>
                </Form>
              </Box>
            )}
          </Formik>
        </Box>
      </Box>
    </>
  );
};

export default ModifyIP;
