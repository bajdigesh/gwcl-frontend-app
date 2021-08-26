import { Box, Link, makeStyles } from '@material-ui/core';
import Button from 'components/Button';
import { FormikControl } from 'components/Form';
import { Form, Formik } from 'formik';
import { gwclCashiersFormInitialData } from 'pages/Payments/shared/schema';
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

const CashierForm = () => {
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
      initialValues={gwclCashiersFormInitialData}
      onSubmit={values => {
        handleFormSubmit(values);
      }}
    >
      {({ setFieldValue, values }) => (
        <Form noValidate>
          <FormikControl control="input" type="input" label={t('payment:cashierName')} name="cashier_name" required />
          <Box position="relative">
            <FormikControl control="input" type="input" label={t('payment:cashierId')} name="cashier_id" required />
            <Link color="primary" href="#" underline="none" onClick={onClickGenerateId} className={styles.generateId}>
              {t('payment:generateId')}
            </Link>
          </Box>
          <FormikControl
            control="autoComplete"
            name="role_id"
            label={t('payment:paypoint')}
            loading={paypointStatus === 'loading'}
            options={paypointOptions}
            required
          />
          <FormikControl control="input" type="input" label={t('common:emailAddress')} name="email" required />
          <FormikControl control="input" type="input" label={t('common:phoneNumber')} name="phone" required />
          <div className={classes.drawerFooter}>
            <Button type="submit" fullWidth size="large" borderRadius={0}>
              {t('payment:addCashier')}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CashierForm;
