import Typography from '@material-ui/core/Typography';
import { unwrapResult } from '@reduxjs/toolkit';
import routePath from 'global/routePaths';
import { registrationFormData } from 'pages/Auth/Shared/schema';
import SetPasswordForm from 'pages/Auth/Shared/SetPasswordForm';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from 'store';
import { resetPassword, selectResetPassword } from 'store/authentication';
import { useQuery } from 'utils/hooks/useQuery';

const ResetPassword = () => {
  const { t } = useTranslation(['common', 'auth']);
  const query = useQuery();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { status } = useSelector(selectResetPassword);
  const [email, setEmail] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setEmail(query.get('email'));
    setToken(query.get('token'));
  }, [query]);

  const handleFormSubmit = (values: typeof registrationFormData) => {
    const postData = {
      email: email,
      token: token,
      password: values.password,
      password_confirmation: values.confirmPassword,
    };
    dispatch(resetPassword(postData))
      .then(unwrapResult)
      .then(() => {
        history.push(routePath.auth.login);
      });
  };

  return (
    <div>
      <Typography variant="h2">{t('auth:resetPassword')}</Typography>
      <SetPasswordForm
        submitButtonLabel={t('auth:resetPassword')}
        onSubmit={handleFormSubmit}
        loadingStatus={status === 'loading'}
      />
    </div>
  );
};
export default ResetPassword;
