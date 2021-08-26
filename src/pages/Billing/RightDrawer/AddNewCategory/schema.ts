import yup from 'components/yup';

export const categoryInitialData = {
  id: '',
  name: '',
  code: '',
  description: '',
  active: '',
  type: '',
  linked_category_id: null as any,
  linked_category_ids: [],
  customer_ids: '',
  date: null as any,
};

export const categoryValidationSchema = yup.object().shape({
  name: yup.string().required(),
  code: yup.string().required(),
  type: yup.string().required(),
  description: yup.string().required(),
});
