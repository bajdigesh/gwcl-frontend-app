import yup from 'components/yup';

export const waterRateInitialData = {
  id: '',
  service_agreement_id: null as any,
  // consumption: '',
  limit_lower: '',
  limit_upper: '',
  rate: '',
  // service_charge: '',
  start_date: null as any,
  end_date: null as any,
  current: '',
};

export const validationSchema = yup.object().shape({
  service_agreement_id: yup.string().required().nullable(true),
  limit_lower: yup.number().required(),
  limit_upper: yup.number().moreThan(yup.ref('limit_lower'), { msg: "Upper limit can't be lower than lower limit" }),
  rate: yup.number().required(),
  start_date: yup.date().required().nullable(true),
  end_date: yup.date().min(yup.ref('start_date'), { msg: "End date can't be before start date" }).nullable(true),
});
