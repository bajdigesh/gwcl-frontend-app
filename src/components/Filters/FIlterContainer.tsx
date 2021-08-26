import { Hidden, makeStyles } from '@material-ui/core';
import { FilterIcon } from 'assets/images';
import Button from 'components/Button';
import Drawer from 'components/Drawer';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDrawerToggle } from 'utils/hooks';

const useStyles = makeStyles(theme => ({
  filterDrawerToggleButton: {
    lineHeight: 1.42,
    width: '100%',
  },
}));

interface IProps {
  children: React.ReactNode;
}

const FilterContainer: React.FC<IProps> = ({ children }) => {
  const classes = useStyles();
  const { t } = useTranslation(['common']);
  const { openDrawer, toggleDrawer } = useDrawerToggle();

  return (
    <>
      <Hidden smDown>{children}</Hidden>

      <Hidden mdUp>
        <Button
          disableElevation
          color="inherit"
          onClick={toggleDrawer}
          className={classes.filterDrawerToggleButton}
          startIcon={<FilterIcon />}
        >
          {t('common:filters')}
        </Button>
        <Drawer open={openDrawer} toggleDrawer={toggleDrawer} title={t('common:filters')}>
          {children}
        </Drawer>
      </Hidden>
    </>
  );
};

export default memo(FilterContainer);
