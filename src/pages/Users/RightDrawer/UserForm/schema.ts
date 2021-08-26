import yup from 'components/yup';
import { PHONE_REGEX } from 'global/constants';

// Add User form Schema
export const userFormData = {
  id: '',
  first_name: '',
  last_name: '',
  staff_id: '',
  mobile: '',
  email: '',
  designation: '',
  role_id: null as any,
  region_id: null as any,
  district_id: null as any,
  route_ids: [] as any,
};

export const userFormValidationSchema = yup.object().shape({
  id: yup.string(),
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  staff_id: yup.string().required(),
  mobile: yup
    .string()
    .required()
    .matches(PHONE_REGEX, () => ({ msg: 'This should be valid phone number' })),
  email: yup.string().email().required(),
  designation: yup.string().required(),
  role_id: yup.string().required().nullable(true),
  region_id: yup.string().nullable(true),
  district_id: yup.string().nullable(true),
  route_ids: yup.array(),
});
