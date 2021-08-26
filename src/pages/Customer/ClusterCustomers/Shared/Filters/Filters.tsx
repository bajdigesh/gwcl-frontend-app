import { Box, useMediaQuery, useTheme } from '@material-ui/core';
import { FilterIcon } from 'assets/images';
import Button from 'components/Button';
import { ControllableDrawer } from 'components/Drawer';
import { FilterSearch, SortByDropdown } from 'components/Filters';
import { sortingOrder } from 'global/constants';
import { ClusterCustomerFilterForm } from 'pages/Customer/RightDrawer';
import React, { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import useStyles from './styles';
interface IProps {
  sortedOrder: string;
  handleFilterFormSubmit: (values: any) => void;
  handleSearchInputChange: (e: any) => void;
  handleSortingMenuChange: (values: any) => void;
}

const Filters: React.FC<IProps> = ({
  sortedOrder,
  handleFilterFormSubmit,
  handleSearchInputChange,
  handleSortingMenuChange,
}) => {
  const classes = useStyles();
  const { t } = useTranslation(['common']);
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
    <>
      <Box display={{ xs: 'block', md: 'flex' }} justifyContent="flex-end">
        <FilterSearch onChange={handleSearchInputChange} />

        <ControllableDrawer
          title={t('common:filters')}
          toggleElement={handleToggle => (
            <Button
              variant="outlined"
              onClick={handleToggle}
              fullWidth={matches}
              className={classes.filterButton}
              startIcon={<FilterIcon />}
            >
              {t('common:filters')}
            </Button>
          )}
        >
          {() => <ClusterCustomerFilterForm handleFilterFormSubmit={handleFilterFormSubmit} />}
        </ControllableDrawer>

        <SortByDropdown
          value={selectedSortedOption!}
          options={sortByDropdownOption}
          handleMenuItemChange={handleSortingMenuChange!}
        />
      </Box>
    </>
  );
};
export default memo(Filters);
