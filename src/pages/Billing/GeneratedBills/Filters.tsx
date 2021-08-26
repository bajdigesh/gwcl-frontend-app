import { Box, makeStyles, useMediaQuery, useTheme } from '@material-ui/core';
import { FilterIcon } from 'assets/images';
import Button from 'components/Button';
import { SortByDropdown } from 'components/Filters';
import { FormikControl } from 'components/Form';
import { Form, Formik } from 'formik';
import { sortingOrder } from 'global/constants';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { billsFilterInitialData } from './schemas';

interface IProps {
  sortedOrder: string;
  handleFilterFormSubmit: (values: any) => void;
  handleSortingMenuChange: (value: any) => void;
  handleSearchInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const useStyles = makeStyles(theme => ({
  filterOptions: {
    '& > form': {
      flex: 1,
    },
    '& .gwcl-MuiAutocomplete-root': {
      marginBottom: theme.spacing(1),
      [theme.breakpoints.up('md')]: {
        width: 150,
        marginRight: theme.spacing(1),
        marginBottom: 0,
      },
    },
    '& .gwcl-MuiFormControl-root': {
      marginBottom: 0,
    },
    '& .gwcl-MuiFormHelperText-root': {
      display: 'none',
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
  const theme = useTheme();
  const { t } = useTranslation();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const sortByDropdownOption = [
    { label: t('common:firstAdded'), value: sortingOrder.ASCENDING },
    { label: t('common:lastAdded'), value: sortingOrder.DESCENDING },
  ];

  const selectedSortedOption = useMemo(() => {
    return sortByDropdownOption.find((item: IAutoCompleteOption) => item.value === sortedOrder);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortedOrder, t]);

  const handleFormSubmit = (values: any) => {};
  const meterStatusOptions = [{ label: 'Working' }, { label: 'Faulty' }];
  return (
    <Box className={classes.filterOptions} display={{ sm: 'block', md: 'flex' }} justifyContent="space-between" mt={2}>
      <Formik
        enableReinitialize
        initialValues={billsFilterInitialData}
        onSubmit={values => {
          handleFormSubmit(values);
        }}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <Box display={{ sm: 'block', md: 'flex' }}>
              <FormikControl
                control="autoComplete"
                name="meterStatus"
                label={t('common:meterStatus')}
                options={meterStatusOptions}
                textFieldProps={{ variant: 'outlined' }}
              />
              <Button fullWidth={matches} type="submit" variant="outlined" startIcon={<FilterIcon />}>
                {t('common:filters')}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>

      <SortByDropdown
        value={selectedSortedOption!}
        options={sortByDropdownOption}
        handleMenuItemChange={handleSortingMenuChange!}
      />
    </Box>
  );
};

export default Filters;
