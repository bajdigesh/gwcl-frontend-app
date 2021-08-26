import {
  Box,
  Checkbox as MUIcheckbox,
  CheckboxProps,
  FormControlLabel,
  FormGroup,
  FormGroupProps,
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { Field, FieldProps } from 'formik';
import React from 'react';

interface IProps {
  name?: string;
  options?: Array<IAutoCompleteOption>;
  formGroupProps?: FormGroupProps;
  checkboxProps?: CheckboxProps;
  loading?: boolean;
}

const CheckboxGroup: React.FC<IProps> = ({ name, options, formGroupProps, checkboxProps, loading }) => {
  return (
    <FormGroup {...formGroupProps}>
      <Field name={name}>
        {({ field }: FieldProps) => {
          if (loading)
            return Array.from(new Array(3)).map(item => (
              <Box mb={2} key={item}>
                <Skeleton />
              </Box>
            ));
          return options!.map(option => (
            <FormControlLabel
              key={option.value}
              control={<MUIcheckbox {...field} color="primary" {...checkboxProps} value={option.value} />}
              label={option.label}
            />
          ));
        }}
      </Field>
    </FormGroup>
  );
};

export default CheckboxGroup;
