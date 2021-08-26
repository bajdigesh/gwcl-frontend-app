import yup from '../../../../components/yup';

export const meterFormData = {
  id: '',
  meter_number: '',
  meter_brand_id: null as any,
  meter_model_id: null as any,
  meter_size_id: null as any,
  meter_type_id: null as any,
  meter_status_id: null as any,
  meter_state_id: null as any,
  meter_install_stage_id: null as any,
  meter_verified: '',
  meter_number_verified: '',
};
export const meterFormValidationSchema = yup.object().shape({
  id: yup.string(),
  meter_number: yup.string().required(),
  meter_brand_id: yup.string().required().nullable(true),
  meter_model_id: yup.string().required().nullable(true),
  meter_size_id: yup.string().required().nullable(true),
  meter_type_id: yup.string().required().nullable(true),
  meter_status_id: yup.string().required().nullable(true),
  meter_state_id: yup.string().required().nullable(true),
  meter_install_stage_id: yup.string().required().nullable(true),
  meter_verified: yup.string().required().nullable(true),
  meter_number_verified: yup.string().required().nullable(true),
});
