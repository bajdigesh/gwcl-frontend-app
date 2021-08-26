import { Box, Paper, Typography } from '@material-ui/core';
import { unwrapResult } from '@reduxjs/toolkit';
import Button from 'components/Button';
import { FormikControl } from 'components/Form';
import toast from 'components/Toast';
import { Form, Formik } from 'formik';
import useStyles from 'pages/Billing/RightDrawer/style';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import {
  getServiceAgreements,
  getServiceAgreementsOption,
  saveServiceAgreements,
  selectGetServiceAgreementsOptionStatus,
  selectSaveServiceAgreements,
  selectServiceAgreementOptions,
} from 'store/billing/serviceAgreements';
import { useToggle } from 'utils/hooks';
import { mapObjectValuesToHtmlElement } from 'utils/mapObjectValuesToHtmlElement';
import CustomerList from './CustomerList';
import { categoryInitialData, categoryValidationSchema } from './schema';
import useCategoryClassName from './style';

interface IProps {
  toggleDrawer: () => void;
  activeTab: 'linked' | 'independent';
  formData?: typeof categoryInitialData;
}

const AddNewCategory: React.FC<IProps> = ({ toggleDrawer, formData = categoryInitialData, activeTab }) => {
  const { t } = useTranslation(['common', 'billing']);
  const classes = useStyles();
  const categoryClassName = useCategoryClassName();
  const dispatch = useAppDispatch();

  const { status: saveServiceAgreementsStatus } = useSelector(selectSaveServiceAgreements);
  const serviceAgreementOptionsStatus = useSelector(selectGetServiceAgreementsOptionStatus);
  const serviceAgreementOptions = useSelector(selectServiceAgreementOptions);
  const { open, toggleOpen } = useToggle();

  useEffect(() => {
    dispatch(getServiceAgreementsOption({ type: 'independent' }));
  }, [dispatch]);

  const handleTariffTypeChange = (value: 'linked' | 'independent', setFieldValue: Function) => {
    if (value) {
      setFieldValue('linked_category_id', null);
      setFieldValue('linked_category_ids', null);
    }
  };

  const handleSubmit = async (values: typeof categoryInitialData, { setFieldError }: any) => {
    const postData = {
      ...values,
      linked_category_id: values.linked_category_id ? values.linked_category_id.value : null,
      linked_category_ids: Array.isArray(values.linked_category_ids)
        ? values.linked_category_ids.map(i => Number(i))
        : null,
      active: values.active === 'yes' ? true : false,
    };

    console.log(postData);

    dispatch(saveServiceAgreements(postData))
      .then(unwrapResult)
      .then(_ => {
        dispatch(getServiceAgreements({ type: activeTab, page_size: 9, resetData: true }));
        toggleDrawer();
      })
      .catch(errors => {
        const errorElement: any = mapObjectValuesToHtmlElement(errors, 'error occured');
        toast.error(errorElement);
      });
  };

  return open ? (
    <CustomerList toggleOpen={toggleOpen} />
  ) : (
    <>
      <Typography variant="h3">{formData.id ? t('billing:editCategory') : t('billing:addNewCategory')}</Typography>
      <div className={classes.drawerContent}>
        <Box mt={4}>
          <Formik initialValues={formData} validationSchema={categoryValidationSchema} onSubmit={handleSubmit}>
            {({ values, setFieldValue }) => (
              <Form noValidate>
                <FormikControl control="input" type="text" label={t('billing:categoryName')} name="name" required />
                <FormikControl control="input" type="text" label={t('billing:categoryCode')} name="code" required />
                <FormikControl
                  control="input"
                  type="text"
                  label={t('billing:categoryDescription')}
                  name="description"
                  required
                />

                <Box mb={3}>
                  <Typography gutterBottom variant="subtitle2" className={categoryClassName.uppercase}>
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
                <Box>
                  <Typography gutterBottom variant="subtitle2" className={categoryClassName.uppercase}>
                    {t('billing:tariffType')}
                  </Typography>
                  <FormikControl
                    control="radio"
                    name="type"
                    options={[
                      { label: t('billing:independent'), value: 'independent' },
                      { label: t('billing:linked'), value: 'linked' },
                    ]}
                    radioGroupProps={{ row: true }}
                    onChangeCallback={(value: 'linked' | 'independent') => {
                      handleTariffTypeChange(value, setFieldValue);
                    }}
                  />
                </Box>
                {/* {values.type === 'independent' && (
                  <Box my={3}>
                    <Typography gutterBottom variant="subtitle2" className={categoryClassName.uppercase}>
                      {t('billing:linkedCategories')}
                    </Typography>
                    <Box bgcolor="grey.400" py={1} px={2}>
                      <FormikControl
                        control="checkbox"
                        name="linked_category_ids"
                        options={serviceAgreementOptions}
                        loading={serviceAgreementOptionsStatus === 'loading'}
                      />
                    </Box>
                  </Box>
                )} */}
                {values.type === 'linked' && (
                  <Box mt={2}>
                    <FormikControl
                      control="autoComplete"
                      name="linked_category_id"
                      label={t('billing:linkedToCategory')}
                      options={serviceAgreementOptions}
                      loading={serviceAgreementOptionsStatus === 'loading'}
                    />
                  </Box>
                )}
                <Box mt={3}>
                  <Typography gutterBottom variant="subtitle2" className={categoryClassName.uppercase}>
                    {t('common:customers')}
                  </Typography>
                  <Paper variant="outlined" className={categoryClassName.customInput}>
                    12 {t('common:customers')}
                    <Button variant="text" size="small" onClick={() => toggleOpen()}>
                      {t('common:edit')}
                    </Button>
                  </Paper>
                </Box>
                <FormikControl name="date" label="Date" control="datepicker" variant="standard" fullWidth={true} />
                <Button
                  disableElevation
                  type="submit"
                  size="large"
                  loading={saveServiceAgreementsStatus === 'loading'}
                  borderRadius={0}
                  fullWidth
                  className={classes.footerFixedBtn}
                >
                  {values.id ? t('billing:editCategory') : t('billing:addNewCategory')}
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </div>
    </>
  );
};

export default AddNewCategory;
