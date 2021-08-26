import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import { unwrapResult } from '@reduxjs/toolkit';
import { celebrationIcon, visibilityIcon, visibilityOffIcon } from 'assets/images';
import Button from 'components/Button';
import { FormikControl } from 'components/Form';
import { Form, Formik } from 'formik';
import routePath from 'global/routePaths';
import { loginFormData, loginFormValidationSchema } from 'pages/Auth/Shared/schema';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useAppDispatch } from 'store';
import { postLogin, selectLogin } from 'store/authentication';
import useStyles from './styles';
interface LoginData {
  email: string;
  password: string;
  showPassword: boolean;
}

const Login = () => {
  const { t } = useTranslation(['common', 'auth']);
  const classes = useStyles();
  const history = useHistory();
  const { status } = useSelector(selectLogin);
  const dispatch = useAppDispatch();

  const handleClickShowPassword = (setFieldValue: Function, showPassword: boolean) => {
    setFieldValue('showPassword', !showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSubmit = ({ email, password }: LoginData) => {
    const postData = { email, password };
    dispatch(postLogin(postData))
      .then(unwrapResult)
      .then(() => {
        history.push(routePath.home.base);
      });
  };

  return (
    <>
      <Typography variant="h2" className={classes.title}>
        {t('auth:welcomeBack')}! <Avatar src={celebrationIcon} variant="square" alt="" />
      </Typography>
      <div>
        <Formik
          initialValues={loginFormData}
          validationSchema={loginFormValidationSchema}
          onSubmit={async values => {
            handleSubmit(values);
          }}
        >
          {({ setFieldValue, values }) => (
            <Form>
              <FormikControl control="input" type="input" label={t('common:email')} name="email" />
              <FormikControl
                control="input"
                type={values.showPassword ? 'text' : 'password'}
                label={t('common:password')}
                name="password"
                linkElement={
                  <Link to="/auth/forgot-password" className={classes.link}>
                    {t('auth:forgotPassword')}
                  </Link>
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => handleClickShowPassword(setFieldValue, values.showPassword)}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showPassword ? (
                          <Avatar
                            src={visibilityOffIcon}
                            variant="square"
                            alt="visibilityOff"
                            className={classes.avatar}
                          />
                        ) : (
                          <Avatar src={visibilityIcon} variant="square" alt="visibility" className={classes.avatar} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button disableElevation type="submit" fullWidth borderRadius={8} loading={status === 'loading'}>
                {t('common:login')}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
      {/* <Divider className={classes.divider} />
      <Typography component="p" variant="body1" align="center" className={classes.signUp}>
        {t('auth:Already have an account?')} <Link to="/auth/registration"> {t('auth:Sign Up')} </Link>
      </Typography> */}
    </>
  );
};
export default Login;
