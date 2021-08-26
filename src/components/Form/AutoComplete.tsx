import { CircularProgress, makeStyles } from '@material-ui/core';
import { TextFieldProps } from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from 'components/Form/TextField';
import React from 'react';

export interface IAutocompleteProps {
  textFieldProps?: TextFieldProps;
  options: Array<IAutoCompleteOption>;
  label?: string;
  autoCompleteProps?: any;
  loading?: boolean;
  disabled?: boolean;
}

const autoCompleteStyles = makeStyles(theme => ({
  autoCompleteField: {
    '& .gwcl-MuiCircularProgress-root': {
      position: 'absolute',
      right: 0,
      top: 12,
      margin: '0 8px',
      background: theme.palette.primary.contrastText,
      zIndex: 1,
    },
  },
}));

const AutoComplete: React.FC<IAutocompleteProps> = ({ options, label, loading, autoCompleteProps, textFieldProps }) => {
  const autoCompleteClasses = autoCompleteStyles();
  return (
    <Autocomplete
      {...autoCompleteProps}
      className={autoCompleteClasses.autoCompleteField}
      autoComplete={false}
      options={!loading ? options : []}
      getOptionLabel={(option: IAutoCompleteOption) => option?.label || ''}
      renderInput={params => {
        return (
          <TextField
            {...textFieldProps}
            {...params}
            label={label}
            autoComplete="off"
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
};

export default AutoComplete;
