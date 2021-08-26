import {
  FormControlLabel,
  FormHelperText,
  makeStyles,
  Radio,
  RadioGroup as MUIRadioGroup,
  RadioGroupProps,
  RadioProps,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { ErrorMessage, Field, FieldProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface IProps {
  name?: string;
  options?: Array<IAutoCompleteOption>;
  radioGroupProps?: RadioGroupProps;
  radioProps?: RadioProps;
  loading?: boolean;
  onChangeCallback?: (value: any) => void;
}

const useStyles = makeStyles(theme => ({
  radio: {
    '& > label': {
      position: 'relative',
      margin: 0,

      '& > span': {
        '&[class*=MuiRadio-root]': {
          position: 'absolute',
          width: '100%',
          height: '100%',
          opacity: 0,
        },

        '&[class*=MuiFormControlLabel-label]': {
          padding: theme.spacing(1.625, 2),
          border: `1px solid ${theme.palette.grey['500']}`,
          color: theme.palette.grey['700'],
          borderRadius: theme.spacing(0.5),
          marginBottom: theme.spacing(2),
          fontWeight: 500,

          [theme.breakpoints.up('md')]: {
            marginBottom: 0,
            marginRight: theme.spacing(2),
          },
        },

        '&.Mui-checked': {
          '& + span': {
            color: theme.palette.primary.main,
            background: theme.palette.grey['500'],
          },
        },
      },
    },
    '& .gwcl-MuiFormHelperText-root': {
      flexBasis: '100%',
    },
  },
}));

const RadioGroup: React.FC<IProps> = ({ name, options, radioGroupProps, radioProps, loading, onChangeCallback }) => {
  const classes = useStyles();
  const { t } = useTranslation('common');
  return (
    <MUIRadioGroup {...radioGroupProps} className={classes.radio}>
      <Field name={name}>
        {({ field }: FieldProps) => {
          if (loading) return Array.from(new Array(2)).map(item => <Skeleton />);
          return (
            <>
              {options!.map(option => (
                <FormControlLabel
                  key={option.value}
                  control={
                    <Radio
                      {...field}
                      onChange={e => {
                        field.onChange(e);
                        if (onChangeCallback) {
                          onChangeCallback(e.target.value);
                        }
                      }}
                      color="primary"
                      {...radioProps}
                      value={option.value}
                      checked={field.value === option.value}
                    />
                  }
                  label={option.label}
                />
              ))}
              <ErrorMessage
                name={name || ''}
                render={(error: any) => <FormHelperText error>{t(error.msg, { value: error.value })}</FormHelperText>}
              />
            </>
          );
        }}
      </Field>
    </MUIRadioGroup>
  );
};

export default RadioGroup;
