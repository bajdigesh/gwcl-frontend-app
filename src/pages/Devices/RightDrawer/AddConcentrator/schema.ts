import yup from 'components/yup';
import { IPV4_REGEX, PHONE_REGEX } from 'global/constants';

export const concentratorInitialData = {
  id: '',
  imei: '',
  concentrator_number: '',
  is_online: '',
  ip_address: '',
  latitude: '',
  longitude: '',
  phone_number: '',
  installed_timestamp: null as any,
  installed_by: null as any,
};

export const concentratorValidationSchema = yup.object().shape({
  imei: yup.number().required(),
  concentrator_number: yup.number().required(),
  ip_address: yup
    .string()
    .matches(IPV4_REGEX, () => ({ msg: 'Enter correct IP address' }))
    .required(),
  latitude: yup.number().min(-90).max(90).required(),
  longitude: yup.number().min(-180).max(180).required(),
  phone_number: yup
    .string()
    .matches(PHONE_REGEX, () => ({ msg: 'Enter correct Phone' }))
    .required(),
});
