import yup from 'components/yup';

export const loginFormData = {
  email: '',
  password: '',
  showPassword: false,
};

export const forgotPasswordFormData = {
  email: '',
};

export const registrationFormData = {
  password: '',
  confirmPassword: '',
  showPassword: false,
  showConfirmPassword: false,
};

export const loginFormValidationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const forgotPasswordValidationSchema = yup.object().shape({
  email: yup.string().email().required(),
});
