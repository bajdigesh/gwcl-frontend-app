import { Box, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import { unwrapResult } from '@reduxjs/toolkit';
import Button from 'components/Button';
import { FormikControl } from 'components/Form';
import toast from 'components/Toast';
import { format } from 'date-fns';
import { Form, Formik } from 'formik';
import { YEAR_MONTH_DAY_HYPHEN_FORMAT } from 'global/constants';
import useStyles from 'pages/Billing/RightDrawer/style';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import { getSurcharges, saveSurcharges, selectSaveSurcharge } from 'store/billing/surcharges';
import { mapObjectValuesToHtmlElement } from 'utils';
import { surchargeInitialData, validationSchema } from './schema';
import useStyle from './style';

interface IProps {
  formData?: typeof surchargeInitialData;
  toggleDrawer: () => void;
}

const AddSurcharge: React.FC<IProps> = ({ formData = surchargeInitialData, toggleDrawer }) => {
  const { t } = useTranslation(['common', 'billing']);
  const customClasses = useStyle();
  const classes = useStyles();

  const dispatch = useAppDispatch();
  const { status: saveSurchargeStatus } = useSelector(selectSaveSurcharge);

  const handleSubmit = (values: typeof surchargeInitialData) => {
    const postData = {
      ...values,
      code: values.code ? values.code : null,
      name: values.name ? values.name : null,
      rate: values.rate ? values.rate : null,
      active: values.active === 'yes' ? true : false,
      is_flat: values.is_flat === 'yes' ? true : false,
      start_date: values.start_date ? format(new Date(values.start_date), YEAR_MONTH_DAY_HYPHEN_FORMAT) : null,
      description: values.description ? values.description : null,
    };

    dispatch(saveSurcharges(postData))
      .then(unwrapResult)
      .then(_ => {
        dispatch(getSurcharges({ page_size: 9, resetData: true }));
        toggleDrawer();
      })
      .catch(errors => {
        const errorElement: any = mapObjectValuesToHtmlElement(errors, 'error occured');
        toast.error(errorElement);
      });
  };

  const changeRateToPercentage = () => {};
  const changeRateToDollar = () => {};
  return (
    <>
      <Typography variant="h3">{formData.id ? t('billing:editSurcharge') : t('billing:addSurcharge')}</Typography>
      {
        <Box mt={4}>
          <Formik
            initialValues={formData}
            validationSchema={validationSchema}
            onSubmit={async values => {
              handleSubmit(values);
            }}
          >
            {({ values, setFieldValue }) => (
              <Form noValidate>
                <FormikControl control="input" type="text" label={t('common:code')} name="code" required />
                <FormikControl control="input" type="text" label={t('common:name')} name="name" required />
                <Box mb={3}>
                  <Typography gutterBottom variant="subtitle2" className={customClasses.capitalizedText}>
                    {t('common:active')}
                  </Typography>
                  <FormikControl
                    control="radio"
                    name="active"
                    options={[
                      { label: t('common:yes'), value: 'yes' },
                      { label: t('common:no'), value: 'no' },
                    ]}
                    radioGroupProps={{ row: true }}
                  />
                </Box>
                <Box mb={3}>
                  <Typography gutterBottom variant="subtitle2" className={customClasses.capitalizedText}>
                    {t('billing:isFlat')}
                  </Typography>
                  <FormikControl
                    control="radio"
                    name="is_flat"
                    options={[
                      { label: t('common:yes'), value: 'yes' },
                      { label: t('common:no'), value: 'no' },
                    ]}
                    radioGroupProps={{ row: true }}
                  />
                </Box>
                <FormikControl
                  control="input"
                  type="text"
                  label={t('common:rate')}
                  name="rate"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <span>$</span>
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          className={customClasses.endAdorementButton}
                          aria-label="toggle rate to percent"
                          onClick={() => changeRateToPercentage()}
                        >
                          <span>%</span>
                        </IconButton>
                        <IconButton
                          className={customClasses.endAdorementButton}
                          aria-label="toggle rate to dollar"
                          onClick={() => changeRateToDollar()}
                        >
                          <span>$</span>
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  required
                />
                {/* <FormikControl
                  control="autoComplete"
                  name="service_category"
                  label={t('billing:serviceCategory')}
                  options={[{ label: 'category 1', value: 1 }]}
                /> */}
                <FormikControl
                  control="datepicker"
                  type="text"
                  variant="standard"
                  label={t('billing:effectiveDate')}
                  name="start_date"
                  fullWidth={true}
                  required
                />
                <FormikControl
                  multiline
                  control="input"
                  type="text"
                  label={t('common:description')}
                  name="description"
                  required
                />

                <Button
                  disableElevation
                  type="submit"
                  size="large"
                  borderRadius={0}
                  fullWidth
                  className={classes.footerFixedBtn}
                  loading={saveSurchargeStatus === 'loading'}
                >
                  {formData.id ? t('billing:editSurcharge') : t('billing:addSurcharge')}
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      }
    </>
  );
};
export default AddSurcharge;
