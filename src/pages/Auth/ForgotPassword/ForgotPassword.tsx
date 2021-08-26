import Typography from '@material-ui/core/Typography';
import { unwrapResult } from '@reduxjs/toolkit';
import Button from 'components/Button';
import { FormikControl } from 'components/Form';
import { Form, Formik } from 'formik';
import routePath from 'global/routePaths';
import { forgotPasswordFormData, forgotPasswordValidationSchema } from 'pages/Auth/Shared/schema';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from 'store';
import { forgotPassword, selectForgotPassword } from 'store/authentication';

const ForgotPassword = () => {
  const { t } = useTranslation(['auth']);
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { status } = useSelector(selectForgotPassword);

  const handleFormSubmit = (values: typeof forgotPasswordFormData) => {
    dispatch(forgotPassword(values))
      .then(unwrapResult)
      .then(() => {
        history.push(routePath.auth.login);
      });
  };

  return (
    <div>
      <Typography variant="h2">{t('auth:forgotPassword')}</Typography>
      <Formik
        initialValues={forgotPasswordFormData}
        validationSchema={forgotPasswordValidationSchema}
        onSubmit={async values => {
          handleFormSubmit(values);
        }}
      >
        {() => (
          <Form autoComplete="off">
            <FormikControl control="input" type="input" label={t('auth:usernameOrEmailAddress')} name="email" />
            <Button disableElevation type="submit" fullWidth borderRadius={8} loading={status === 'loading'}>
              {t('auth:getResetLink')}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default ForgotPassword;
