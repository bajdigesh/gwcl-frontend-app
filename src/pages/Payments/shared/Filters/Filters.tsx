import { Box, makeStyles, useMediaQuery, useTheme } from '@material-ui/core';
import { FilterIcon } from 'assets/images';
import Button from 'components/Button';
import FilterSearch from 'components/Filters/FilterSearch';
import SortByDropdown from 'components/Filters/SortByDropdown';
import FormikControl from 'components/Form/FormikControl';
import { Form, Formik } from 'formik';
import { sortingOrder } from 'global/constants';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { gwclCashiersFilterInitialData } from './../schema';

interface IProps {
  sortedOrder: string;
  handleFilterFormSubmit: (values: any) => void;
  handleSearchInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSortingMenuChange: (value: any) => void;
}

const useStyles = makeStyles(theme => ({
  filterForm: {
    '& .gwcl-MuiAutocomplete-root': {
      flex: '1 1 175px',
      margin: theme.spacing(0, 0, 1),
      [theme.breakpoints.up('md')]: {
        margin: theme.spacing(0, 1, 0, 0),
      },
    },
    '& .react-datepicker-wrapper': {
      margin: theme.spacing(0, 0, 1),
      [theme.breakpoints.up('md')]: {
        margin: theme.spacing(0, 1, 0, 0),
      },
    },
    '& .gwcl-MuiFormControl-root': {
      marginBottom: 0,
    },
    '& .gwcl-MuiFormHelperText-root': {
      display: 'none',
    },
    '& .gwcl-MuiButton-outlined': {
      margin: theme.spacing(1, 0),
      [theme.breakpoints.up('md')]: {
        margin: 0,
      },
    },
    '& + .gwcl-MuiBox-root': {
      '& > .gwcl-MuiBox-root': {
        margin: theme.spacing(1, 0),
        [theme.breakpoints.up('md')]: {
          margin: 0,
        },
      },
    },
  },
}));

const Filters: React.FC<IProps> = ({
  sortedOrder,
  handleFilterFormSubmit,
  handleSearchInputChange,
  handleSortingMenuChange,
}) => {
  const classes = useStyles();
  const { t } = useTranslation(['common', 'payment']);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const sortByDropdownOption = [
    { label: t('common:firstAdded'), value: sortingOrder.ASCENDING },
    { label: t('common:firstAdded'), value: sortingOrder.DESCENDING },
  ];

  const paypointOptions = [{}];

  const selectedSortedOption = useMemo(() => {
    return sortByDropdownOption.find((item: IAutoCompleteOption) => item.value === sortedOrder);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortedOrder, t]);

  return (
    <Box display={{ sm: 'block', md: 'flex' }} alignItems="center" justifyContent="space-between" marginTop={2}>
      <Formik
        enableReinitialize
        initialValues={gwclCashiersFilterInitialData}
        onSubmit={values => {
          handleFilterFormSubmit(values);
        }}
      >
        {({ setFieldValue, values }) => (
          <Form className={classes.filterForm}>
            <Box display={{ sm: 'block', md: 'flex' }}>
              <FormikControl
                control="autoComplete"
                name="paypoint"
                label={t('payment:paypoint')}
                options={paypointOptions}
                textFieldProps={{ variant: 'outlined' }}
              />

              <FormikControl
                control="datepicker"
                name="startDate"
                label={t('common:addedBetween')}
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
                  monthsShown: matches ? 1 : 2,
                  selectsRange: true,
                  shouldCloseOnSelect: false,
                }}
              />

              <Button fullWidth={matches} type="submit" variant="outlined" startIcon={<FilterIcon />}>
                {t('common:filters')}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>

      <Box display={{ sm: 'block', md: 'flex' }} justifyContent="center" justifySelf="end">
        <FilterSearch onChange={handleSearchInputChange} />
        <SortByDropdown
          value={selectedSortedOption!}
          options={sortByDropdownOption}
          handleMenuItemChange={handleSortingMenuChange!}
        />
      </Box>
    </Box>
  );
};

export default Filters;
