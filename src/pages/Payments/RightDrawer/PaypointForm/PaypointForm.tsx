import { Box, Link, makeStyles } from '@material-ui/core';
import Button from 'components/Button';
import { FormikControl } from 'components/Form';
import Title from 'components/Title';
import { Form, Formik } from 'formik';
import ExistingCashiers from 'pages/Payments/RightDrawer/ExistingCashiers';
import useStyles from 'pages/Payments/RightDrawer/styles';
import { paypointAddFormInitialData } from 'pages/Payments/shared/schema';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useToggle } from 'utils/hooks';

const inLineStyles = makeStyles(theme => ({
  generateId: {
    position: 'absolute',
    right: 0,
    top: theme.spacing(2.5),
  },
}));

const PaypointForm = () => {
  const { t } = useTranslation(['common', 'payment']);
  const classes = useStyles();
  const styles = inLineStyles();
  const { open: showCashier, toggleOpen: toggleCashier } = useToggle();
  const handleFormSubmit = (values: any) => {};
  const onClickGenerateId = (e: any) => {
    e.preventDefault();
  };

  return showCashier ? (
    <ExistingCashiers toggleCashier={toggleCashier} />
  ) : (
    <>
      <Title>{t('payment:addPaypoint')}</Title>
      <Formik
        enableReinitialize
        initialValues={paypointAddFormInitialData}
        onSubmit={values => {
          handleFormSubmit(values);
        }}
      >
        {() => (
          <Form noValidate>
            <FormikControl
              control="input"
              type="input"
              label={t('payment:paypointName')}
              name="paypoint_name"
              required
            />
            <Box position="relative">
              <FormikControl control="input" type="input" label={t('payment:paypointId')} name="paypointId" required />
              <Link color="primary" href="#" underline="none" onClick={onClickGenerateId} className={styles.generateId}>
                {t('payment:generateId')}
              </Link>
            </Box>
            <FormikControl
              control="input"
              type="input"
              label={t('payment:addressLine1')}
              name="address_line_1"
              required
            />
            <FormikControl control="input" type="input" label={t('payment:addressLine2')} name="address_line_2" />
            <FormikControl control="input" type="input" label={t('common:zipCode')} name="zip_code" required />
            <FormikControl control="input" type="input" label={t('common:country')} name="county" required />
            <FormikControl control="input" type="input" label={t('common:state')} name="state" required />
            <FormikControl control="input" type="input" label={t('common:city')} name="city" required />
            <FormikControl
              control="input"
              type="input"
              label={t('payment:primaryPhoneNumber')}
              name="primary_phone"
              required
            />
            <FormikControl
              control="input"
              type="input"
              label={t('payment:primaryEmailAddress')}
              name="primary_email"
              required
            />
            <Button
              disableElevation
              fullWidth
              variant="outlined"
              color="primary"
              borderRadius={0}
              onClick={() => toggleCashier()}
            >
              {t('payment:addCashiers')}
            </Button>

            <div className={classes.drawerFooter}>
              <Button type="submit" fullWidth size="large" borderRadius={0}>
                {t('payment:addPaypoint')}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default PaypointForm;
