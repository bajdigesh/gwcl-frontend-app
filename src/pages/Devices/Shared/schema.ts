import yup from 'components/yup';
import { IPV4_REGEX } from 'global/constants';

// Check Meter Schema
export const checkMeterInitialData = {
  meter: '',
};

export const checkMeterlValidationSchema = yup.object().shape({
  meter: yup.string().required(),
});

// // Read IMEI schema
// export const concentratorInitialData = {
//   concentratorId: '',
// };

// export const concentratorValidationSchema = yup.object().shape({
//   concentratorId: yup.number().required(),
// });

export const modifyIPInitialData = {
  ip_address: '',
  ip_address_confirmation: '',
};

export const modifyIPValidationSchema = yup.object().shape({
  ip_address: yup.string().matches(IPV4_REGEX, 'Enter correct IP address').required(),
  ip_address_confirmation: yup
    .string()
    .oneOf([yup.ref('ip_address'), null], 'IP must match')
    .required(),
});
// device Filter form schema
export const deviceFilterFormInitialData = {
  region_id: null,
  district_id: null,
  route_id: null,
  status: null,
};
