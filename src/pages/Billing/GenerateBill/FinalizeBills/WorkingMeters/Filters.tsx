import { Box, Link, makeStyles, useMediaQuery, useTheme } from '@material-ui/core';
import { DownloadIcon1, FilterIcon } from 'assets/images';
import Button from 'components/Button';
import { FilterSearch } from 'components/Filters';
import SortByDropdown from 'components/Filters/SortByDropdown';
import { FormikControl } from 'components/Form';
import { Form, Formik } from 'formik';
import { sortingOrder } from 'global/constants';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { workingMetersInitialData } from './schema';

interface IProps {
  sortedOrder: string;
  handleFilterFormSubmit: (values: any) => void;
  handleSearchInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSortingMenuChange: (value: any) => void;
}

const useStyles = makeStyles(theme => ({
  filterFormWrapper: {
    '& > div:not(.react-datepicker__tab-loop)': {
      flex: '0 1 175px',
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
  },

  filterButton: {
    marginBottom: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      marginBottom: 0,
    },
  },

  workingMetersSort: {
    '& .gwcl-MuiBox-root': {
      margin: theme.spacing(1, 0),
      [theme.breakpoints.up('md')]: {
        margin: theme.spacing(0, 1, 0),
      },
    },

    '& > .gwcl-MuiFormControl-root': {
      alignSelf: 'start',
    },
  },
}));

const Filters: React.FC<IProps> = ({
  sortedOrder,
  handleFilterFormSubmit,
  handleSearchInputChange,
  handleSortingMenuChange,
}) => {
  const { t } = useTranslation(['common', 'billing']);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const classes = useStyles();
  const meterStatusOptions = [{}];
  const sortByDropdownOption = [
    { label: t('common:firstAdded'), value: sortingOrder.ASCENDING },
    { label: t('common:lastAdded'), value: sortingOrder.DESCENDING },
  ];

  const selectedSortedOption = useMemo(() => {
    return sortByDropdownOption.find((item: IAutoCompleteOption) => item.value === sortedOrder);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortedOrder, t]);

  const preventDefault = (e: any) => {
    console.log(e.preventDefault);
  };
  return (
    <Box display={{ sm: 'block', md: 'grid' }} gridGap={16} gridTemplateColumns={'2fr 1fr'} paddingX={{ sm: 2, md: 0 }}>
      {/* Meter Status and Date Filter */}
      <Formik
        enableReinitialize
        initialValues={workingMetersInitialData}
        onSubmit={values => {
          handleFilterFormSubmit(values);
        }}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <Box display={{ sm: 'block', md: 'flex' }} alignItems="center" className={classes.filterFormWrapper}>
              <FormikControl
                control="autoComplete"
                name="status"
                options={meterStatusOptions}
                label={t('common:meterStatus')}
                textFieldProps={{ variant: 'outlined' }}
              />
              <FormikControl
                control="datepicker"
                name="startDate"
                label={t('common:chooseDate')}
                startdate={values.date}
                datePickerProps={{
                  startDate: values.date,
                  onChange: (dates: any) => {
                    if (dates) {
                      setFieldValue('startDate', dates[0]);
                    } else {
                      setFieldValue('startDate', null);
                    }
                  },
                  monthsShown: 1,
                  selectsRange: true,
                  shouldCloseOnSelect: false,
                }}
              />
              <Button
                type="submit"
                color="inherit"
                variant="outlined"
                fullWidth={matches}
                className={classes.filterButton}
                startIcon={<FilterIcon />}
              >
                {t('common:filters')}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>

      {/* Search, Sort and Dowload Bills */}
      <Box
        className={classes.workingMetersSort}
        display={{ sm: 'block', md: 'flex' }}
        justifyContent="flex-end"
        alignItems="center"
      >
        <FilterSearch onChange={handleSearchInputChange} />

        <SortByDropdown
          value={selectedSortedOption!}
          options={sortByDropdownOption}
          handleMenuItemChange={handleSortingMenuChange!}
        />

        <Link color="primary" href="#" onClick={preventDefault}>
          <DownloadIcon1 />
          {t('billing:downloadAllBills')}
        </Link>
      </Box>
    </Box>
  );
};

export default Filters;
