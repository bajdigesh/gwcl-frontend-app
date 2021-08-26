import { TextFieldProps } from '@material-ui/core/TextField';
import TextField from 'components/Form/TextField';
import { ErrorMessage, Field, FieldProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';

export type TFormikInputProps = TextFieldProps & {
  linkElement?: React.ReactNode;
};

const Input: React.FC<TFormikInputProps> = ({ name, linkElement, ...rest }) => {
  const { t } = useTranslation('common');
  return (
    <>
      <Field name={name}>
        {({ field, meta }: FieldProps) => {
          return (
            <TextField
              {...field}
              error={(meta.error && meta.touched) || false}
              helperText={
                <>
                  <ErrorMessage
                    name={name || ''}
                    render={(error: any) => <span>{t(error.msg, { value: error.value })}</span>}
                  />
                  {linkElement && linkElement}
                </>
              }
              {...rest}
            />
          );
        }}
      </Field>
    </>
  );
};

export default Input;
