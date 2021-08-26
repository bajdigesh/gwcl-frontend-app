import yup from 'components/yup';

export const phoneInitialData = {
  id: '',
  imei: '',
  assigned_to_user_id: null as any,
  user_phone_model_id: null as any,
  user_phone_status_id: null as any,
  received_date: null as any,
  retirement_date: null as any,
  monthly_data_allowance: '' as any,
};

export const phoneFormValidationSchema = yup.object().shape({
  imei: yup.string().required(),
  assigned_to_user_id: yup.string().required(),
  user_phone_model_id: yup.string().required(),
  user_phone_status_id: yup.string().required(),
  received_date: yup.date().nullable(true).required(),
  retirement_date: yup.date().nullable(true).required(),
  monthly_data_allowance: yup.number().required(),
});
