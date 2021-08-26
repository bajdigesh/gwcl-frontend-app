import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import { visibilityIcon, visibilityOffIcon } from 'assets/images';
import Button from 'components/Button';
import { FormikControl } from 'components/Form';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { registrationFormData } from '../schema';
import { TPasswordStrength } from '../type';
import useStyles from './style';

type TProps = {
  submitButtonLabel: string;
  onSubmit: Function;
  loadingStatus?: boolean;
};

const SetPasswordForm: React.FC<TProps> = ({ submitButtonLabel, onSubmit, loadingStatus }) => {
  const { t } = useTranslation(['common', 'auth']);
  const [passwordStrength, setPasswordStrength] = useState<TPasswordStrength>(null);
  const classes = useStyles({ passwordStrength });

  const handleClickShowPassword = (setFieldValue: Function, name: any, showPassword: boolean) => {
    setFieldValue(name, !showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const validateFormField = (values: typeof registrationFormData) => {
    let error: any = {};
    let regExpWeak = /[a-z]/;
    let regExpMedium = /\d+/;
    let regExpStrong = /.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/;

    // password validation
    if (!values.password) {
      error.password = 'required';
      setPasswordStrength(null);
    }
    if (
      values.password.length &&
      (values.password.match(regExpWeak) || values.password.match(regExpMedium) || values.password.match(regExpStrong))
    ) {
      error.password = 'weak';
      setPasswordStrength('weak');
    }
    if (
      values.password.length >= 4 &&
      ((values.password.match(regExpWeak) && values.password.match(regExpMedium)) ||
        (values.password.match(regExpMedium) && values.password.match(regExpStrong)) ||
        (values.password.match(regExpWeak) && values.password.match(regExpStrong)))
    ) {
      error.password = 'medium';
      setPasswordStrength('medium');
    }
    if (
      values.password.length >= 8 &&
      values.password.match(regExpWeak) &&
      values.password.match(regExpMedium) &&
      values.password.match(regExpStrong)
    ) {
      delete error.password;
      setPasswordStrength('strong');
    }

    // confirmPasswordValidation
    if (values.password !== values.confirmPassword) {
      error.confirmPassword = { msg: t('auth:error.errorConfirmPasswordNotMatch') };
    }

    return error;
  };

  return (
    <>
      <Formik
        initialValues={registrationFormData}
        validate={validateFormField}
        onSubmit={async values => {
          onSubmit(values);
        }}
      >
        {({ setFieldValue, values, isValid, dirty }) => {
          return (
            <Form autoComplete="off">
              <FormikControl
                control="input"
                type={values.showPassword ? 'text' : 'password'}
                label={t('auth:setPassword')}
                name="password"
                linkElement={
                  <div>
                    <div className={classes.indicator}>
                      <span className={classes.weak}></span>
                      <span className={classes.medium}></span>
                      <span className={classes.strong}></span>
                    </div>
                    <Typography variant="body1" component="span" className={classes.indicatorLabel}>
                      {/* @ts-ignore */}
                      {t(`auth:error.${passwordStrength}`)} {t('common:password')}
                    </Typography>
                  </div>
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => handleClickShowPassword(setFieldValue, 'showPassword', values.showPassword)}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showPassword ? (
                          <Avatar
                            src={visibilityOffIcon}
                            variant="square"
                            alt="visibility"
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
              <FormikControl
                control="input"
                type={values.showConfirmPassword ? 'text' : 'password'}
                label={t('auth:confirmPassword')}
                name="confirmPassword"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() =>
                          handleClickShowPassword(setFieldValue, 'showConfirmPassword', values.showConfirmPassword)
                        }
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showConfirmPassword ? (
                          <Avatar
                            src={visibilityOffIcon}
                            variant="square"
                            alt="visibility"
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
              <Button
                type="submit"
                disableElevation
                fullWidth
                borderRadius={8}
                disabled={!(dirty && isValid)}
                className={classes.submitBtn}
                loading={loadingStatus}
              >
                {submitButtonLabel}
              </Button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};
export default SetPasswordForm;
