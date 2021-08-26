import { Box, makeStyles } from '@material-ui/core';
import Button from 'components/Button';
import FilterSearch from 'components/Filters/FilterSearch';
import SortByDropdown from 'components/Filters/SortByDropdown';
import { sortingOrder } from 'global/constants';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface IProps {
  sortedOrder: string;
  handleSearchInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSortingMenuChange: (value: any) => void;
}

const useStyles = makeStyles(theme => ({
  buttonsContainer: {
    borderRadius: theme.spacing(9),
    [theme.breakpoints.up('md')]: {
      background: theme.palette.grey['400'],
    },
    '& button': {
      borderRadius: theme.spacing(9),
      background: theme.palette.grey['400'],
      width: '100%',
      marginBottom: theme.spacing(1),
      '& .gwcl-MuiButton-label': {
        fontWeight: 500,
      },
      [theme.breakpoints.up('md')]: {
        width: 'auto',
        background: 'transparent',
        marginBottom: 0,
      },
    },
  },
  filterAndSort: {
    '& .gwcl-MuiBox-root': {
      margin: theme.spacing(1, 0),
      [theme.breakpoints.up('md')]: {
        margin: 0,
      },
    },
  },
}));

const Filters: React.FC<IProps> = ({ sortedOrder, handleSearchInputChange, handleSortingMenuChange }) => {
  const { t } = useTranslation(['common', 'billing']);
  const classes = useStyles();
  const [viewBy, setViewBy] = useState('');
  const sortByDropdownOption = [
    { label: t('common:firstAdded'), value: sortingOrder.ASCENDING },
    { label: t('common:lastAdded'), value: sortingOrder.DESCENDING },
  ];
  const selectedSortedOption = useMemo(() => {
    return sortByDropdownOption.find((item: IAutoCompleteOption) => item.value === sortedOrder);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortedOrder, t]);

  return (
    <Box display={{ sm: 'block', md: 'flex' }} paddingX={{ xs: 2, md: 0 }} justifyContent="space-between">
      <Box className={classes.buttonsContainer} marginBottom={{ sm: 2, md: 0 }}>
        <Button disableElevation color="secondary" onClick={() => setViewBy('regions')}>
          {t('billing:viewByRegions')}
        </Button>
        <Button disableElevation color="secondary" onClick={() => setViewBy('districts')}>
          {t('billing:viewByDistricts')}
        </Button>
        <Button disableElevation color="secondary" onClick={() => setViewBy('routes')}>
          {t('billing:viewByRoutes')}
        </Button>
      </Box>

      <Box display={{ sm: 'block', md: 'flex' }} position="relative" className={classes.filterAndSort}>
        <FilterSearch />
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
