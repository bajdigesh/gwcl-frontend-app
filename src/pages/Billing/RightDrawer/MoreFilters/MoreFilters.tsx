import { Box, Typography } from '@material-ui/core';
import Button from 'components/Button';
import { FormikControl } from 'components/Form';
import { Form, Formik } from 'formik';
import { moreFiltersInitialData } from 'pages/Billing/Reports/schemas';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useStyles from './styles';

const MoreFilters = () => {
  const { t } = useTranslation(['common', 'billing']);
  const classes = useStyles();
  const serviceCategoryOptions = [{}];
  const handleSubmit = (values: any) => {
    console.log(values);
  };
  return (
    <>
      <Typography variant="h3">{t('common:filters')}</Typography>
      <Box mt={3}>
        <Formik
          initialValues={moreFiltersInitialData}
          onSubmit={async values => {
            handleSubmit(values);
          }}
        >
          <Form>
            <FormikControl
              control="autoComplete"
              name="serviceCategory"
              label={t('billing:serviceCategories')}
              options={serviceCategoryOptions}
              textFieldProps={{ variant: 'outlined' }}
            />

            <div className={classes.moreFilterOptions}>
              <h4>{t('common:customerStatus')}</h4>
              <Box display="flex" flexWrap="wrap" mt={1}>
                <label>
                  <input type="radio" name="customerStatus" />
                  <span>{t('common:active')}</span>
                </label>
                <label>
                  <input type="radio" name="customerStatus" />
                  <span>{t('common:inactive')}</span>
                </label>
                <label>
                  <input type="radio" name="customerStatus" />
                  <span>{t('common:disconnected')}</span>
                </label>
              </Box>
            </div>

            <div className={classes.moreFilterOptions}>
              <h4>{t('common:meterStatus')}</h4>
              <Box display="flex" flexWrap="wrap" mt={1}>
                <label>
                  <input type="radio" name="meterStatus" />
                  <span>{t('common:working')}</span>
                </label>
                <label>
                  <input type="radio" name="meterStatus" />
                  <span>{t('common:faulty')}</span>
                </label>
                <label>
                  <input type="radio" name="meterStatus" />
                  <span>{t('billing:noMeter')}</span>
                </label>
              </Box>
            </div>

            <div className={classes.moreFilterOptions}>
              <h4>{t('common:verificationStatus')}</h4>
              <Box display="flex" flexWrap="wrap" mt={1}>
                <label>
                  <input type="radio" name="verificationStatus" />
                  <span>{t('common:verified')}</span>
                </label>
                <label>
                  <input type="radio" name="verificationStatus" />
                  <span>{t('common:notVerified')}</span>
                </label>
              </Box>
            </div>

            <div className={classes.buttonsContainer}>
              <Button disableElevation borderRadius={0} className={classes.resetButton}>
                {t('common:resetFilters')}
              </Button>
              <Button disableElevation borderRadius={0} color="primary" variant="contained">
                {t('common:apply')} 3 {t('common:filters')}
              </Button>
            </div>
          </Form>
        </Formik>
      </Box>
    </>
  );
};

export default MoreFilters;
