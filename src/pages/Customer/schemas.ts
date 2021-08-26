import yup from 'components/yup';

export const customerFormData = {
  applicant_id: null,
  applicant_name: null,
  structure_type: null,
  service_category: null,
  owner_type: null,
  occupants_number: null,
  request_date: null,
  supply_purpose: null,
  activity_description: null,
  mobile_number: null,
  mail: null,
  postal_address: null,
  state: null,
  city: null,
  town: null,
  suburb: null,
  house_number: null,
  street_number: null,
  street_description: null,
};

export const customerFormValidationSchema = yup.object().shape({
  applicant_id: yup.string().required(),
  applicant_name: yup.string().required(),
  structure_type: yup.string().required(),
  service_category: yup.string().required(),
  owner_type: yup.string().required(),
  occupants_number: yup.string().required(),
  request_date: yup.string().required(),
  supply_purpose: yup.string().required(),
  activity_description: yup.string().required(),
  mobile_number: yup.string().required(),
  mail: yup.string().required(),
  postal_address: yup.string().required(),
  state: yup.string().required(),
  city: yup.string().required(),
  town: yup.string().required(),
  suburb: yup.string().required(),
  house_number: yup.string().required(),
  street_number: yup.string().required(),
  street_description: yup.string().required(),
});

export const filterFormInitialData = {
  start_date: null,
  end_date: null,
  service_categories: null,
  customer_status: null,
  meter_status: null,
  lifeline_customers: null,
};
