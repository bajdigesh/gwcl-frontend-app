import { fade, InputAdornment, makeStyles, TextFieldProps, useTheme } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { CalendarIcon } from 'assets/images';
import clsx from 'clsx';
import TextField from 'components/Form/TextField';
import { format } from 'date-fns';
import { ErrorMessage, Field, FieldProps } from 'formik';
import { MONTH_DAY_YEAR_FORMAT } from 'global/constants';
import React, { forwardRef } from 'react';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
  // TEXTFIELD STYLES
  rootWrapper: {
    '&.fullWidth': {
      width: '100%',
    },
    '& .react-datepicker__close-icon': {
      padding: 0,
      right: (props: TextFieldProps) => (props.variant === 'standard' ? '-2px' : '12px'),
      top: (props: TextFieldProps) => (props.variant === 'standard' ? '-6px' : '0'),

      '&:after': {
        width: '20px',
        height: '20px',
        fontSize: 17,
      },
    },
    '& + div': {
      '& .react-datepicker-popper': {
        '&[data-placement^="bottom"]': {
          '& .react-datepicker__triangle': {
            borderBottomColor: theme.palette.primary.contrastText,
            '&:before': {
              borderBottomColor: theme.palette.grey['500'],
            },
          },
        },
        '&[data-placement^="top"]': {
          '& .react-datepicker__triangle': {
            borderTopColor: theme.palette.primary.contrastText,
            '&:before': {
              borderTopColor: theme.palette.grey['500'],
            },
          },
        },
      },
    },
  },
  datePickerComp: {
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    border: `1px solid ${theme.palette.grey['500']}`,
    fontFamily: theme.typography.fontFamily,
    padding: theme.spacing(2),
    '& .react-datepicker__navigation': {
      top: theme.spacing(3.25),
    },
    '& .react-datepicker__navigation--previous': {
      right: theme.spacing(7),
      left: 'initial',
      borderRightColor: theme.palette.primary.main,
    },
    '& .react-datepicker__navigation--next': {
      right: theme.spacing(3),
      borderLeftColor: theme.palette.primary.main,
    },
    '& .react-datepicker__header': {
      background: theme.palette.primary.contrastText,
      border: 0,
    },
    '&  .react-datepicker__day-name,  .react-datepicker__day,  .react-datepicker__time-name': {
      borderRadius: '50%',
      margin: 0,
      width: theme.typography.pxToRem(32),
      lineHeight: theme.typography.pxToRem(32),
      '&:focus': {
        outline: 'none',
      },
    },
    '& .react-datepicker__day--keyboard-selected': {
      borderRadius: '50%',
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
    '& .react-datepicker__day--in-range': {
      borderRadius: '0',
      backgroundColor: fade(theme.palette.primary.main, 0.1),
      color: 'inherit',
    },
    '& .react-datepicker__day--range-start': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      borderRadius: '50%',
    },
    '& .react-datepicker__day--range-end': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      borderRadius: '50%',
    },
    //Year Dropdown
    '& .react-datepicker__year-dropdown-container': {
      position: 'absolute',
      top: '-30px',
      left: 0,
    },
    '& .react-datepicker__year-select': {
      padding: theme.spacing(0.75),
      borderColor: theme.palette.grey[500],
      borderRadius: 4,
      cursor: 'pointer',
    },
    '& .react-datepicker__month-container': {
      marginTop: theme.spacing(4.5),
    },

    '& .react-datepicker__time-container ': {
      marginTop: '36px',
    },
  },
}));

type IProps = TextFieldProps & {
  name?: string;
  label?: string;
  datePickerProps?: ReactDatePickerProps;
};

/**
 *
 * @param {Date | null} startDate startDate
 * @param {Date | null} endDate endDate
 * @param {string}  value date input values
 * @returns {string}
 */
const formatRangeInput = (startDate: Date | null = null, endDate: Date | null = null, value: string) => {
  if (startDate && endDate) {
    return format(startDate, MONTH_DAY_YEAR_FORMAT) + ' - ' + format(endDate, MONTH_DAY_YEAR_FORMAT);
  } else if (startDate) {
    return format(startDate, MONTH_DAY_YEAR_FORMAT);
  } else {
    return value;
  }
};

/**
 * For range picker send lowerletter startdate and enddate as props
 */
const CustomInput: React.FC<any> = forwardRef((props: any, _: any) => {
  const inputValue = formatRangeInput(props.startdate, props.enddate, props.value);
  return <TextField variant="outlined" {...props} value={inputValue} required={props.isrequired ? true : false} />;
});

const DatePicker: React.FC<IProps> = ({ name, datePickerProps, fullWidth, ...props }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const classes = useStyles(props);
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Field name={name}>
      {({ field, meta, form }: FieldProps) => {
        return (
          <ReactDatePicker
            customInput={
              <CustomInput
                {...props}
                fullWidth
                required={props.required}
                isrequired={props.required ? 'true' : undefined}
                error={(meta.error && meta.touched) || false}
                helperText={
                  <ErrorMessage
                    name={name || ''}
                    render={(error: any) => <span>{t(error.msg, { value: error.value })}</span>}
                  />
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <CalendarIcon />
                    </InputAdornment>
                  ),
                }}
              />
            }
            showYearDropdown
            dropdownMode="select"
            onChange={date => form.setFieldValue(name!, date)}
            dateFormat={MONTH_DAY_YEAR_FORMAT}
            selected={meta.value}
            closeOnScroll
            isClearable
            withPortal={matches && true}
            wrapperClassName={clsx(classes.rootWrapper, fullWidth && 'fullWidth')}
            calendarClassName={classes.datePickerComp}
            {...datePickerProps}
          />
        );
      }}
    </Field>
  );
};

export default DatePicker;

/**
 * @example For range picker
 * 
  <FormikControl
    control="datepicker"
    name="startDate"
    label="Added Between"
    startdate={values.startDate}
    enddate={values.endDate}
    datePickerProps={{
      startDate: values.startDate,
      endDate: values.endDate,
      onChange: (dates: any) => {
        if (dates) {
          setFieldValue('startDate', dates[0]);
          setFieldValue('endDate', dates[1]);
        } else {
          setFieldValue('startDate', null);
          setFieldValue('endDate', null);
        }
      },
      monthsShown: 2,
      selectsRange: true,
      shouldCloseOnSelect: false,
    }}
  />;
*/
