import { Typography } from '@material-ui/core';
import { unwrapResult } from '@reduxjs/toolkit';
import Button from 'components/Button';
import { FormikControl } from 'components/Form';
import toast from 'components/Toast';
import { Form, Formik } from 'formik';
import useStyles from 'pages/Users/RightDrawer/style';
import { technicianFormData, technicianFormValidationSchema } from 'pages/Users/Technicians/schema';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import { saveTechnician, selectSaveTechnician } from 'store/users';
import { mapObjectValuesToHtmlElement } from 'utils';

interface IProps {
  formValues: typeof technicianFormData;
  onSuccess?: () => void;
  toggleDrawer: () => void;
}

const TechnicianForm: React.FC<IProps> = ({ formValues: formData, onSuccess, toggleDrawer }) => {
  const classes = useStyles();
  const { t } = useTranslation(['common', 'users']);
  const dispatch = useAppDispatch();

  const { status } = useSelector(selectSaveTechnician);

  const handleFormSubmit = (values: typeof technicianFormData) => {
    const postData = {
      ...values,
    };

    dispatch(saveTechnician(postData))
      .then(unwrapResult)
      .then(_ => {
        if (onSuccess) {
          onSuccess();
        }
        toggleDrawer();
      })
      .catch(errors => {
        const errorElement: any = mapObjectValuesToHtmlElement(errors, 'Error occured');
        toast.error(errorElement);
      });
  };

  return (
    <>
      <Typography variant="h3" className={classes.drawerTitle}>
        {formData?.id ? t('users:editTechnician') : t('users:addNewTechnician')}
      </Typography>
      <div className={classes.drawerContent}>
        <Formik
          enableReinitialize
          initialValues={formData}
          validationSchema={technicianFormValidationSchema}
          onSubmit={values => {
            handleFormSubmit(values);
          }}
        >
          {({ setFieldValue, values }) => (
            <Form autoComplete="off" noValidate>
              <FormikControl control="input" type="input" label={t('common:firstName')} name="first_name" required />
              <FormikControl control="input" type="input" label={t('common:lastName')} name="last_name" />
              <FormikControl
                control="input"
                type="input"
                label={t('users:technicianId')}
                name="technician_id"
                required
              />
              <FormikControl control="input" type="input" label={t('common:mobile')} name="mobile" required />
              <FormikControl control="input" type="input" label={t('common:email')} name="email" required />
              <div className={classes.drawerFooter}>
                <Button type="submit" fullWidth size="large" borderRadius={0} loading={status === 'loading'}>
                  {values.id ? t('users:editTechnician') : t('users:addNewTechnician')}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default TechnicianForm;
