import * as yup from 'yup';

/**
 * Overrides default validation message of Yup
 * Use for internalization {msg: 'denotes error message', value: 'values used for interpolation'}
 */
yup.setLocale({
  mixed: {
    default: { msg: 'yup.default' },
    required: { msg: 'yup.required' },
    oneOf: ({ values }: any) => ({ msg: 'yup.oneOf', value: values }),
    defined: { msg: 'yup.defined' },
    notOneOf: ({ values }: any) => ({ msg: 'yup.notOneOf', value: values }),
    notType: ({ type, value }: any) => {
      let msg: any;
      if (type === 'number') {
        msg = { msg: 'yup.number' };
      }
      if (value === null) {
        msg += { msg: 'yup.notNull' };
      }

      return msg;
    },
  },
  string: {
    length: ({ length }: any) => ({ msg: 'yup.lengthString', value: length }),
    min: ({ min }: any) => ({ msg: 'yup.minString', value: min }),
    max: ({ max }: any) => ({ msg: 'yup.maxString', value: max }),
    matches: ({ regex }: any) => ({ msg: 'yup.maxString', value: regex }),
    email: { msg: 'yup.email' },
    url: { msg: 'yup.url' },
    uuid: { msg: 'yup.uuid' },
    trim: { msg: 'yup.trim' },
    lowercase: { msg: 'yup.lowercase' },
    uppercase: { msg: 'yup.uppercase' },
  },
  number: {
    min: ({ min }: any) => ({ msg: 'yup.minNumber', value: min }),
    max: ({ max }: any) => ({ msg: 'yup.maxNumber', value: max }),
    lessThan: ({ less }: any) => ({ msg: 'yup.lessThan', value: less }),
    moreThan: ({ more }: any) => ({ msg: 'yup.moreThan', value: more }),
    positive: { msg: 'yup.positive' },
    negative: { msg: 'yup.negative' },
    integer: { msg: 'yup.integer' },
  },
  array: {
    min: ({ min }: any) => ({ msg: 'yup.minArray', value: min }),
    max: ({ max }: any) => ({ msg: 'yup.maxArray', value: max }),
    length: ({ length }: any) => ({ msg: 'yup.lengthArray', value: length }),
  },
  object: {
    noUnknown: ({ unknown }: any) => ({ msg: 'yup.noUnknown', value: unknown }),
  },
  boolean: {
    isValue: ({ value }: any) => ({ msg: 'yup.noUnknown', value: value }),
  },
  date: {
    min: ({ min }: any) => ({ msg: 'yup.minDate', value: min }),
    max: ({ max }: any) => ({ msg: 'yup.maxDate', value: max }),
  },
});

export default yup;
