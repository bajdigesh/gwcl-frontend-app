import yup from 'components/yup';
import { PHONE_REGEX } from 'global/constants';

// Users Filter form schema
export const userFilterFormInitialData = {
  start_date: null as any,
  end_date: null as any,
};

export const technicianFormData = {
  id: '',
  first_name: '',
  last_name: '',
  technician_id: '',
  mobile: '',
  email: '',
};

export const technicianFormValidationSchema = yup.object().shape({
  first_name: yup.string().required(),
  last_name: yup.string(),
  technician_id: yup.string().required(),
  mobile: yup
    .string()
    .required()
    .matches(PHONE_REGEX, () => ({ msg: 'This should be valid phone number' })),
  email: yup.string().email().required(),
});
