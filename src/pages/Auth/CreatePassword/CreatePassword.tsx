import { Avatar, Divider } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { unwrapResult } from '@reduxjs/toolkit';
import { celebrationIcon } from 'assets/images';
import routePath from 'global/routePaths';
import { registrationFormData } from 'pages/Auth/Shared/schema';
import SetPasswordForm from 'pages/Auth/Shared/SetPasswordForm';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useAppDispatch } from 'store';
import { createPassword, selectCreatePassword } from 'store/authentication';
import { useQuery } from 'utils/hooks/useQuery';
import useStyles from './style';

const CreatePassword = () => {
  const { t } = useTranslation(['common', 'auth']);
  const classes = useStyles();
  const query = useQuery();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { status } = useSelector(selectCreatePassword);
  const [email, setEmail] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setEmail(query.get('email'));
    setToken(query.get('token'));
  }, [query]);

  const handleFormSubmit = (values: typeof registrationFormData) => {
    const postData = {
      email: email,
      verification_token: token,
      password: values.password,
      password_confirmation: values.confirmPassword,
    };
    dispatch(createPassword(postData))
      .then(unwrapResult)
      .then(() => {
        history.push(routePath.auth.login);
      });
  };

  return (
    <div>
      <Typography variant="h3" className={classes.title}>
        <span>
          {t('common:welcome')} {email}!
        </span>
        <Avatar src={celebrationIcon} variant="square" alt="" />
      </Typography>
      {/* <Typography variant="h6">Please Create a Password to login!</Typography> */}
      <SetPasswordForm
        submitButtonLabel={t('auth:createPassword')}
        onSubmit={handleFormSubmit}
        loadingStatus={status === 'loading'}
      />
      <Divider className={classes.divider} />
      <Typography component="p" variant="body1" align="center" className={classes.signUp}>
        {t('auth:alreadyHaveAnAccount?')} <Link to={routePath.auth.login}>{t('auth:logIn')}</Link>
      </Typography>
    </div>
  );
};
export default CreatePassword;
