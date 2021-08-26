import { Box, makeStyles, useMediaQuery, useTheme } from '@material-ui/core';
import { DownloadIcon1, FilterIcon } from 'assets/images';
import Button from 'components/Button';
import FilterSearch from 'components/Filters/FilterSearch';
import SortByDropdown from 'components/Filters/SortByDropdown';
import { FormikControl } from 'components/Form';
import { Form, Formik } from 'formik';
import { sortingOrder } from 'global/constants';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { statementFilterFormData } from './schema';

interface IProps {
  sortedOrder: string;
  handleFilterFormSubmit: (values: any) => void;
  handleSearchInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSortingMenuChange: (value: any) => void;
}

const useStyles = makeStyles(theme => ({
  filterWrapper: {
    '& .gwcl-MuiButton-outlined.gwcl-MuiButton-colorInherit': {
      margin: theme.spacing(0, 0, 1),
      [theme.breakpoints.up('md')]: {
        margin: theme.spacing(0, 1, 0, 1),
      },
    },
    '@media (max-width: 1550px)': {
      display: 'block !important',
    },
  },
  filterForm: {
    flex: 2,
    '& .gwcl-MuiAutocomplete-root': {
      flex: '0 0 175px',
      margin: theme.spacing(0, 0, 1),
      [theme.breakpoints.up('md')]: {
        margin: theme.spacing(0, 1, 0, 0),
      },
    },
    '& .react-datepicker-wrapper': {
      margin: theme.spacing(0, 0, 1),
      [theme.breakpoints.up('md')]: {
        margin: theme.spacing(0, 1),
      },
    },
    '& .gwcl-MuiFormControl-root': {
      marginBottom: 0,
    },
    '& .gwcl-MuiFormHelperText-root': {
      display: 'none',
    },
    '& .gwcl-MuiFormControlLabel-root': {
      margin: theme.spacing(1, 0, 0),
      [theme.breakpoints.up('md')]: {
        margin: theme.spacing(0, 0, 0, 1),
      },
      '& .gwcl-MuiFormControlLabel-label': {
        whiteSpace: 'nowrap',
      },
    },
  },
  filterButton: {
    margin: theme.spacing(1, 0, 0),
    [theme.breakpoints.up('md')]: {
      margin: 0,
    },
  },
  filterAndSort: {
    flex: 1,
    '& .gwcl-MuiBox-root': {
      margin: theme.spacing(1, 0),
      [theme.breakpoints.up('md')]: {
        margin: 0,
      },
    },
    '@media (max-width: 1550px)': {
      marginTop: theme.spacing(1),
      justifyContent: 'flex-start !important',
      '& > div:first-of-type': {
        order: 2,
        '& .gwcl-MuiInputBase-root': {
          position: 'static',
        },
      },
      '& .gwcl-MuiBox-root': {
        order: 1,
      },
    },
  },
  exportTable: {
    margin: theme.spacing(1, 0),
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(0, 0, 0, 1),
    },
    '& > a': {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      '& > svg': {
        flex: '0 0 16px',
        height: 16,
        marginRight: theme.spacing(1),
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
  const { t } = useTranslation(['common', 'customers']);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const sortByDropdownOption = [
    { label: t('common:firstAdded'), value: sortingOrder.ASCENDING },
    { label: t('common:lastAdded'), value: sortingOrder.DESCENDING },
  ];

  const selectedSortedOption = useMemo(() => {
    return sortByDropdownOption.find((item: IAutoCompleteOption) => item.value === sortedOrder);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortedOrder, t]);

  return (
    <Box
      paddingX={{ xs: 2, md: 0 }}
      display={{ xs: 'block', md: 'flex' }}
      alignItems="center"
      justifyContent="space-between"
      className={classes.filterWrapper}
    >
      <Box display={{ xs: 'block', md: 'flex' }} alignItems="center">
        <Formik
          enableReinitialize
          initialValues={statementFilterFormData}
          onSubmit={values => {
            handleFilterFormSubmit(values);
          }}
        >
          {({ setFieldValue, values }) => (
            <Form className={classes.filterForm}>
              <Box display={{ sm: 'block', md: 'flex' }}>
                <FormikControl
                  control="radio"
                  name="statementType"
                  options={[
                    { label: t('customers:accountStatement'), value: 'accountStatement' },
                    { label: t('customers:billingStatement'), value: 'billingStatement' },
                  ]}
                  radioGroupProps={{ row: true }}
                />

                <FormikControl
                  control="datepicker"
                  name="startDate"
                  label={t('common:month')}
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

                <Button
                  fullWidth={matches}
                  type="submit"
                  variant="outlined"
                  startIcon={<FilterIcon />}
                  className={classes.filterButton}
                >
                  {t('common:filters')}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
      <Box
        display={{ sm: 'block', md: 'flex' }}
        alignItems="center"
        justifyContent="flex-end"
        justifySelf="flex-end"
        className={classes.filterAndSort}
      >
        <FilterSearch onChange={handleSearchInputChange} />
        <SortByDropdown
          value={selectedSortedOption!}
          options={sortByDropdownOption}
          handleMenuItemChange={handleSortingMenuChange!}
        />
        <div className={classes.exportTable}>
          <Link to="./#">
            <DownloadIcon1 />
            {t('common:exportTable')}
          </Link>
        </div>
      </Box>
    </Box>
  );
};

export default Filters;
