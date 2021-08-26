import React from 'react';
import AutoComplete from './AutoComplete';
import CheckboxGroup from './CheckboxGroup';
import DatePicker from './DatePicker';
import Input from './Input';
import LazyAutoComplete from './LazyAutocomplete';
import RadioGroup from './RadioGroup';

type TProps = {
  control: 'input' | 'autoComplete' | 'datepicker' | 'checkbox' | 'radio' | 'lazyAutoComplete';
  [key: string]: any;
};

const FormikControl: React.FC<TProps> = ({ control, ...rest }) => {
  switch (control) {
    case 'input':
      return <Input fullWidth {...rest} />;
    case 'autoComplete':
      return <AutoComplete {...rest} />;
    case 'lazyAutoComplete':
      return <LazyAutoComplete {...rest} />;
    case 'datepicker':
      return <DatePicker {...rest} />;
    case 'checkbox':
      return <CheckboxGroup {...rest} />;
    case 'radio':
      return <RadioGroup {...rest} />;
    default:
      return null;
  }
};

export default FormikControl;
