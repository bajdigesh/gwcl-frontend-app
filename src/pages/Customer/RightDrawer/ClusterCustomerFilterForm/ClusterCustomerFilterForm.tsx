import { Box, Typography } from '@material-ui/core';
import { CheckBox } from '@material-ui/icons';
import Button from 'components/Button';
import { FormikControl } from 'components/Form';
import { Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'store';
import { getRegions } from 'store/common';
import { filterFormInitialData } from './schema';
import useStyles from './styles';

interface IProps {
  handleFilterFormSubmit: (values: any) => void;
}

const ClusterCustomerFilterForm: React.FC<IProps> = ({ handleFilterFormSubmit }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation(['common', 'customers']);
  const classes = useStyles();

  useEffect(() => {
    dispatch(getRegions());
  }, [dispatch]);

  return (
    <>
      <Box>
        <Formik
          enableReinitialize
          initialValues={filterFormInitialData}
          onSubmit={values => {
            handleFilterFormSubmit(values);
          }}
        >
          {({ setFieldValue, values }) => (
            <Form autoComplete="off" className={classes.filterFormWrapper}>
              <Typography variant="subtitle2" gutterBottom component="label" color="textSecondary">
                {t('customers:period')}
              </Typography>
              <Box display="flex" justifyContent="space-between">
                <FormikControl control="datepicker" name="start_date" label={t('common:selectStartDate')} />
                <FormikControl control="datepicker" name="end_date" label={t('common:selectEndDate')} />
              </Box>
              <FormikControl
                control="autoComplete"
                name="service_categories"
                label={t('customers:serviceCategories')}
                options={'Hello'}
                textFieldProps={{ variant: 'outlined' }}
              />
              <Box className={classes.formGroup}>
                <Typography variant="subtitle2" gutterBottom component="p" color="textSecondary">
                  {t('common:customerStatus')}
                </Typography>
                <FormikControl
                  control="radio"
                  name="customer_status"
                  options={[
                    { label: t('common:active'), value: 'active' },
                    { label: t('common:inactive'), value: 'inactive' },
                    { label: t('common:disconnected'), value: 'disconnected' },
                  ]}
                  radioGroupProps={{ row: true }}
                />
              </Box>
              <Box className={classes.formGroup}>
                <Typography variant="subtitle2" gutterBottom component="p" color="textSecondary">
                  Meter Status
                </Typography>
                <FormikControl
                  control="radio"
                  name="meter_status"
                  options={[
                    { label: t('common:working'), value: 'working' },
                    { label: t('common:faulty'), value: 'faulty' },
                    { label: t('common:noMeter'), value: 'no_meter' },
                  ]}
                  radioGroupProps={{ row: true }}
                />
              </Box>
              <Box className={classes.formGroup}>
                <label>
                  <CheckBox color="primary" style={{ verticalAlign: 'middle', marginRight: '5px' }} />
                  <span className={classes.checkboxLabel}>Lifeline Customers</span>
                </label>
              </Box>
              <div className={classes.drawerFooter}>
                <Button type="button" borderRadius={0}>
                  {t('common:resetFilters')}
                </Button>
                <Button type="submit" size="large" borderRadius={0}>
                  {t('common:apply')}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
};
export default ClusterCustomerFilterForm;
