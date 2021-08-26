import { Box, makeStyles, useMediaQuery, useTheme } from '@material-ui/core';
import { FilterIcon } from 'assets/images';
import Button from 'components/Button';
import SortByDropdown from 'components/Filters/SortByDropdown';
import { FormikControl } from 'components/Form';
import { Form, Formik } from 'formik';
import { sortingOrder } from 'global/constants';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { reportsFilterInitialData } from '../schemas';

interface IProps {
  sortedOrder: string;
  handleFilterFormSubmit: (values: any) => void;
  handleSearchInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSortingMenuChange: (value: any) => void;
}

const useStyles = makeStyles(theme => ({
  filterForm: {
    flex: 1,
    '& .gwcl-MuiAutocomplete-root': {
      flex: '0 0 175px',
      [theme.breakpoints.up('sm')]: {
        marginRight: theme.spacing(1.5),
      },
      '&:not(:first-of-type) + div': {
        width: 'auto !important',
        [theme.breakpoints.up('sm')]: {
          marginRight: theme.spacing(1.5),
        },
      },
    },
    '& .gwcl-MuiFormControl-root': {
      [theme.breakpoints.up('md')]: {
        marginBottom: 0,
      },
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
}));

const Filters: React.FC<IProps> = ({
  sortedOrder,
  handleFilterFormSubmit,
  handleSearchInputChange,
  handleSortingMenuChange,
}) => {
  const { t } = useTranslation(['common']);
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const reportTypeOptions = [{ label: 'Revenue Summary' }, { label: 'Billing Summary' }];
  const createdByOptions: any = [{}];

  const sortByDropdownOption = [
    { label: t('common:firstAdded'), value: sortingOrder.ASCENDING },
    { label: t('common:lastAdded'), value: sortingOrder.DESCENDING },
  ];

  const selectedSortedOption = useMemo(() => {
    return sortByDropdownOption.find((item: IAutoCompleteOption) => item.value === sortedOrder);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortedOrder, t]);

  return (
    <>
      <Box display={{ sm: 'block', md: 'flex' }} alignItems="center" justifyContent="space-between" mt={2}>
        {/* FILTERS */}
        <Formik
          enableReinitialize
          initialValues={reportsFilterInitialData}
          onSubmit={values => {
            handleFilterFormSubmit(values);
          }}
        >
          {({ setFieldValue, values }) => (
            <Form className={classes.filterForm}>
              <Box display={{ sm: 'block', md: 'flex' }}>
                <FormikControl
                  control="autoComplete"
                  name="report_type"
                  label={t('common:type')}
                  options={reportTypeOptions}
                  textFieldProps={{ variant: 'outlined' }}
                />
                <FormikControl
                  control="autoComplete"
                  name="created_by"
                  label={t('common:createdBy')}
                  options={createdByOptions}
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
                    monthsShown: 1,
                    selectsRange: true,
                    shouldCloseOnSelect: false,
                  }}
                />
                <Button
                  fullWidth={matches}
                  type="submit"
                  variant="outlined"
                  className={classes.filterButton}
                  startIcon={<FilterIcon />}
                >
                  {t('common:filters')}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>

        {/* SORT BY */}
        <SortByDropdown
          value={selectedSortedOption!}
          options={sortByDropdownOption}
          handleMenuItemChange={handleSortingMenuChange!}
        />
      </Box>
    </>
  );
};

export default Filters;
