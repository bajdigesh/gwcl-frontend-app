import { Box, Grid, Typography } from '@material-ui/core';
import Button from 'components/Button';
import { FormikControl } from 'components/Form';
import { Form, Formik } from 'formik';
import useStyles from 'pages/Customer/NewConnectionRequest/styles';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { customerFormData } from '../schemas';

interface IProps {
  handleSubmit: (values: any) => void;
}

const NewConnectionRequest: React.FC<IProps> = () => {
  const { t } = useTranslation(['common', 'customers']);
  const classes = useStyles();
  const serviceCategoriesOptions = [{}];
  const ownerTypeOptions = [{}];
  const stateOptions = [{}];
  const cityOptions = [{}];
  const townOptions = [{}];

  const handleSubmit = () => {
    alert('Form Submitted');
  };

  return (
    <>
      <Box className={classes.pageHeading}>
        <h1>{t('customers:newConnectionRequest')}</h1>
      </Box>
      <Box mt={4}>
        <Formik
          enableReinitialize
          initialValues={customerFormData}
          onSubmit={values => {
            handleSubmit();
          }}
        >
          {({ setFieldValue, values }) => (
            <Form>
              <Grid container spacing={4}>
                <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                  <Typography className={classes.formTitle}>{t('customers:generalDetails')}</Typography>
                  <FormikControl control="input" type="input" label={t('common:accountNumber')} name="applicant_id" />
                  <FormikControl
                    control="input"
                    type="input"
                    label={t('customers:applicantName')}
                    name="applicant_name"
                  />
                  <FormikControl
                    control="input"
                    type="input"
                    label={t('customers:structureType')}
                    name="structure_type"
                  />
                  <FormikControl
                    control="autoComplete"
                    name="service_category"
                    label={t('customers:serviceCategory')}
                    options={serviceCategoriesOptions}
                  />
                  <FormikControl
                    control="autoComplete"
                    name="owner_type"
                    label={t('customers:ownerType')}
                    options={ownerTypeOptions}
                  />
                  <FormikControl
                    control="input"
                    type="input"
                    label={t('customers:noOfOccupants')}
                    name="occupants_number"
                  />
                  <FormikControl
                    fullWidth
                    control="datepicker"
                    name="request_date"
                    label="Select Date"
                    request_date={values.request_date}
                    datePickerProps={{
                      request_date: values.request_date,
                      onChange: (dates: any) => {
                        if (dates) {
                          setFieldValue('request_date', dates[0]);
                        } else {
                          setFieldValue('request_date', null);
                        }
                      },
                      shouldCloseOnSelect: false,
                    }}
                  />
                  <FormikControl
                    control="input"
                    type="input"
                    label={t('customers:purposeOfSupply')}
                    name="supply_purpose"
                  />
                  <FormikControl
                    multiline
                    rows={4}
                    control="input"
                    type="input"
                    label={t('customers:descOfActivity')}
                    name="activity_description"
                    textFieldProps={{ variant: 'outlined' }}
                  />
                </Grid>

                <Grid item xl={2} lg={2} md={2} sm={12} xs={12} />

                <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                  <Typography className={classes.formTitle}>Contact Details</Typography>
                  <FormikControl control="input" type="input" label={t('common:mobile')} name="mobile_number" />
                  <FormikControl control="input" type="input" label={t('common:emailAddress')} name="mail" />
                  <FormikControl control="input" type="input" label="Postal Address" name="postal_address" />
                  <FormikControl control="input" type="select" label={t('common:state')} name="state" />
                  <FormikControl control="autoComplete" name="state" label={t('common:state')} options={stateOptions} />
                  <FormikControl control="autoComplete" name="city" label={t('common:city')} options={cityOptions} />
                  <FormikControl control="autoComplete" name="town" label={t('common:town')} options={townOptions} />
                  <FormikControl control="input" type="input" label={t('common:suburb')} name="suburb" />
                  <FormikControl control="input" type="input" label={t('common:houseNumber')} name="house_number" />
                  <FormikControl control="input" type="input" label={t('common:streetNumber')} name="street_number" />
                  <FormikControl
                    multiline
                    maxRows={4}
                    control="input"
                    type="input"
                    label={t('customers:streetSiteDesc')}
                    name="street_description"
                  />
                </Grid>

                <Grid item xl={2} lg={2} md={2} sm={12} xs={12} />
              </Grid>
              <Box className={classes.buttonContainer}>
                <Typography variant={'button'} className={classes.cancelButton}>
                  {t('common:cancel')}
                </Typography>
                <Button type="submit" borderRadius={4} disableElevation>
                  {t('customers:submitConnectionRequest')}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default NewConnectionRequest;
