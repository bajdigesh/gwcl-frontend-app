import yup from 'components/yup';

export const surchargeInitialData = {
  id: '',
  code: '',
  name: '',
  rate: '',
  start_date: null as any,
  is_flat: '',
  active: '',
  description: '',
};

export const validationSchema = yup.object().shape({
  code: yup.string().required(),
  name: yup.string().required(),
  rate: yup.string().required(),
  start_date: yup.date().required().nullable(true),
  description: yup.string().required(),
});
