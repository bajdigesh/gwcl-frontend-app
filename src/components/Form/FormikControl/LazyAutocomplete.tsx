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
  label?: string;
  autoCompleteProps?: any;
  loading?: boolean;
  multiple?: boolean;
  disabled?: boolean;
  searchItems?: any;
  fetchMoreItems?: () => void;
  loadOptions?: any;
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
  },
}));

const LazyAutoComplete: React.FC<IFormikAutocompleteProps> = ({
  name,
  label,
  loading,
  multiple,
  disabled,
  autoCompleteProps,
  textFieldProps,
  fetchMoreItems,
  searchItems,
  loadOptions,
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
              onInputChange={(e: React.ChangeEvent<HTMLInputElement>, value: any, reason: string) => {
                searchItems(e, value, reason);
              }}
              value={meta.value}
              options={loadOptions.options}
              disabled={disabled}
              getOptionLabel={(option: IAutoCompleteOption) => option?.label || ''}
              getOptionSelected={(option: IAutoCompleteOption) => {
                if (multiple) {
                  return meta.value.map((item: IAutoCompleteOption) => item.value).includes(option?.value);
                } else {
                  return option?.value === meta.value?.value;
                }
              }}
              ListboxProps={{
                onScroll: (event: React.SyntheticEvent) => {
                  const listboxNode = event.currentTarget;

                  if (
                    listboxNode.scrollTop + listboxNode.clientHeight === listboxNode.scrollHeight &&
                    loadOptions.hasMore
                  ) {
                    if (fetchMoreItems) {
                      fetchMoreItems();
                    }
                  }
                },
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

export default LazyAutoComplete;
