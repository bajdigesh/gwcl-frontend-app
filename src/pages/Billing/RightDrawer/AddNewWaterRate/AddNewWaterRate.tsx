import { Box, Typography } from '@material-ui/core';
import { unwrapResult } from '@reduxjs/toolkit';
import Button from 'components/Button';
import { FormikControl } from 'components/Form';
import toast from 'components/Toast';
import { format } from 'date-fns';
import { Form, Formik } from 'formik';
import { YEAR_MONTH_DAY_HYPHEN_FORMAT } from 'global/constants';
import useDrawerStyles from 'pages/Billing/RightDrawer/style';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import { selectGetServiceAgreementsOptionStatus, selectServiceAgreementOptions } from 'store/billing/serviceAgreements';
import { getServiceAgreementsOption } from 'store/billing/serviceAgreements/api';
import { getServiceRatesByServiceAgreements, saveServiceRate, selectSaveServiceRate } from 'store/billing/serviceRates';
import { mapObjectValuesToHtmlElement } from 'utils';
import { validationSchema, waterRateInitialData } from './schema';
interface IProps {
  formData?: typeof waterRateInitialData;
  toggleDrawer: () => void;
}

const AddNewWaterRate: React.FC<IProps> = ({ formData = waterRateInitialData, toggleDrawer }) => {
  const { t } = useTranslation(['common', 'billing']);
  const drawerClasses = useDrawerStyles();
  const dispatch = useAppDispatch();
  const serviceAgreementOptions = useSelector(selectServiceAgreementOptions);
  const status = useSelector(selectGetServiceAgreementsOptionStatus);
  const { status: saveServiceRateStatus } = useSelector(selectSaveServiceRate);

  useEffect(() => {
    dispatch(getServiceAgreementsOption({}));
  }, [dispatch]);

  const handleSubmit = (values: typeof waterRateInitialData) => {
    const postData = {
      ...values,
      service_agreement_id: values.service_agreement_id ? values.service_agreement_id.value : null,
      start_date: values.start_date ? format(new Date(values.start_date!), YEAR_MONTH_DAY_HYPHEN_FORMAT) : null,
      end_date: values.end_date ? format(new Date(values.end_date!), YEAR_MONTH_DAY_HYPHEN_FORMAT) : null,
    };

    dispatch(saveServiceRate(postData))
      .then(unwrapResult)
      .then(_ => {
        dispatch(getServiceRatesByServiceAgreements({ resetData: true, page_size: 9 }));
        toggleDrawer();
      })
      .catch(errors => {
        const errorElement: any = mapObjectValuesToHtmlElement(errors, 'error occured');
        toast.error(errorElement);
      });
  };

  return (
    <>
      <Typography variant="h3">{formData.id ? t('billing:editWaterRate') : t('billing:addWaterRate')}</Typography>
      <div className={drawerClasses.drawerContent}>
        <Box mt={4}>
          <Formik
            initialValues={formData}
            validationSchema={validationSchema}
            onSubmit={async values => {
              handleSubmit(values);
            }}
          >
            {() => (
              <Form noValidate>
                <FormikControl
                  control="autoComplete"
                  name="service_agreement_id"
                  label={t('billing:serviceCategory')}
                  options={serviceAgreementOptions}
                  loading={status === 'loading'}
                  textFieldProps={{ required: true }}
                />
                {/* <FormikControl
                  name="consumption"
                  label="Consumption"
                  control="input"
                  variant="standard"
                  fullWidth={true}
                /> */}
                <FormikControl
                  control="input"
                  type="text"
                  label={t('billing:waterRatePer1000Litres')}
                  name="rate"
                  required
                />
                <FormikControl
                  control="input"
                  type="text"
                  label={t('billing:lowerLimit')}
                  name="limit_lower"
                  required
                />
                <FormikControl control="input" type="text" label={t('billing:upperLimit')} name="limit_upper" />
                {/* <FormikControl
                  control="input"
                  type="text"
                  label="Service Charge"
                  name="service_charge"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <span className={classes.inputEndAdormentAdjustments}>%</span>
                      </InputAdornment>
                    ),
                  }}
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
                  control="datepicker"
                  type="text"
                  variant="standard"
                  label={t('billing:endDate')}
                  name="end_date"
                  fullWidth={true}
                />
                <Button
                  disableElevation
                  type="submit"
                  size="large"
                  borderRadius={0}
                  loading={saveServiceRateStatus === 'loading'}
                  fullWidth
                  className={drawerClasses.footerFixedBtn}
                >
                  {formData.id ? t('billing:editWaterRate') : t('billing:addWaterRate')}
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </div>
    </>
  );
};
export default AddNewWaterRate;
