import { Box, InputAdornment, Link, makeStyles } from '@material-ui/core';
import Button from 'components/Button';
import { FormikControl } from 'components/Form';
import { Form, Formik } from 'formik';
import { gwclVendorsFormInitialData } from 'pages/Payments/shared/schema';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useStyles from './../styles';

const inLineStyles = makeStyles(theme => ({
  generateId: {
    position: 'absolute',
    right: 0,
    top: theme.spacing(2.5),
  },
}));

const VendorForm = () => {
  const { t } = useTranslation(['common', 'payment']);
  const classes = useStyles();
  const styles = inLineStyles();
  const [paypointStatus, setPaypointStatus] = useState('');
  const handleFormSubmit = (values: any) => {};
  const paypointOptions = [{}];
  const onClickGenerateId = (e: any) => {
    e.preventDefault();
  };
  return (
    <Formik
      enableReinitialize
      initialValues={gwclVendorsFormInitialData}
      onSubmit={values => {
        handleFormSubmit(values);
      }}
    >
      {({ setFieldValue, values }) => (
        <Form noValidate>
          <FormikControl control="input" type="input" label={t('payment:vendorName')} name="cashier_name" required />
          <Box position="relative">
            <FormikControl control="input" type="input" label={t('payment:vendorId')} name="cashier_id" required />
            <Link color="primary" href="#" underline="none" onClick={onClickGenerateId} className={styles.generateId}>
              {t('payment:generateId')}
            </Link>
          </Box>
          <FormikControl control="input" type="input" label={t('common:emailAddress')} name="email" required />
          <FormikControl control="input" type="input" label={t('common:phoneNumber')} name="phone" required />
          <FormikControl
            control="input"
            type="input"
            label={t('payment:commission')}
            name="commission"
            InputProps={{
              endAdornment: (
                <>
                  <InputAdornment position="end">%</InputAdornment>
                  <InputAdornment position="end">$</InputAdornment>
                </>
              ),
            }}
            required
          />
          <div className={classes.drawerFooter}>
            <Button type="submit" fullWidth size="large" borderRadius={0}>
              {t('payment:addVendor')}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default VendorForm;
