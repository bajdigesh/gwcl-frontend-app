import { makeStyles } from '@material-ui/core/styles';
import { default as MuiTextField, TextFieldProps } from '@material-ui/core/TextField';
import React from 'react';

const useStyles = makeStyles(theme => ({
  // TEXTFIELD STYLES
  control: {
    marginBottom: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacing(3.5),
    },
    '& .gwcl-MuiInput-underline:before': {
      borderBottomColor: theme.palette.grey[500],
    },
  },
  label: {
    color: `${theme.palette.grey[700]}`,
  },
  input: {
    '& .gwcl-MuiInputBase-input': {
      color: theme.palette.grey['900'],
    },
  },
}));

const TextField: React.FC<TextFieldProps> = props => {
  const classes = useStyles();
  return (
    <MuiTextField
      classes={{ root: classes.control }}
      InputLabelProps={{ className: classes.label }}
      className={classes.input}
      {...props}
    />
  );
};

export default TextField;
