import { CircularProgress, makeStyles } from '@material-ui/core';
import { TextFieldProps } from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from 'components/Form/TextField';
import { ErrorMessage, Field, FieldProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';

export interface IFormikAutocompleteProps {
  name?: string;
  textFieldProps?: TextFieldProps;
  options?: Array<IAutoCompleteOption>;
  label?: string;
  autoCompleteProps?: any;
  loading?: boolean;
  multiple?: boolean;
  disabled?: boolean;
  onChangeCallBack?: (value: { label: string; value: string }) => void;
}

const useAutoCompleteStyles = makeStyles(theme => ({
  autoCompleteField: {
    '& .gwcl-MuiOutlinedInput-root ': {
      '& .gwcl-MuiCircularProgress-root': {
        position: 'absolute',
        right: 0,
        top: 12,
        margin: '0 8px',
        background: theme.palette.primary.contrastText,
        zIndex: 1,
      },
    },

    '& .gwcl-MuiFormLabel-root:not(.gwcl-MuiInputLabel-shrink)': {
      width: 'calc(100% - 50px)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      lineHeight: 1.42857,
      marginTop: -3,
    },
  },
}));

const AutoComplete: React.FC<IFormikAutocompleteProps> = ({
  name,
  options,
  label,
  loading,
  multiple,
  disabled,
  autoCompleteProps,
  textFieldProps,
  onChangeCallBack,
}) => {
  const autoCompleteClasses = useAutoCompleteStyles();
  const { t } = useTranslation();
  return (
    <>
      <Field name={name}>
        {({ field, meta, form: { setFieldValue } }: FieldProps) => {
          return (
            <Autocomplete
              {...autoCompleteProps}
              className={autoCompleteClasses.autoCompleteField}
              id={name}
              multiple={multiple}
              autoComplete={false}
              onChange={(_: any, value: any) => {
                if (onChangeCallBack) {
                  onChangeCallBack(value);
                }
                setFieldValue(name!, value);
              }}
              value={meta.value}
              options={!loading ? options : []}
              disabled={disabled}
              getOptionLabel={(option: IAutoCompleteOption) => option?.label || ''}
              getOptionSelected={(option: IAutoCompleteOption) => {
                if (multiple) {
                  return meta.value.map((item: IAutoCompleteOption) => item.value).includes(option?.value);
                } else {
                  return option?.value === meta.value?.value;
                }
              }}
              loading={loading}
              renderInput={params => {
                return (
                  <TextField
                    variant="standard"
                    {...textFieldProps}
                    {...params}
                    fullWidth
                    label={label}
                    autoComplete="off"
                    error={(meta.error && meta.touched) || false}
                    helperText={
                      <ErrorMessage
                        name={name || ''}
                        render={(error: any) => <span>{t(error.msg, { value: error.value })}</span>}
                      />
                    }
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {loading ? <CircularProgress color="inherit" size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                );
              }}
            />
          );
        }}
      </Field>
    </>
  );
};

export default AutoComplete;
