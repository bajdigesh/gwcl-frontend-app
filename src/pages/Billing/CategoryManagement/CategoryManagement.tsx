import { Box, useMediaQuery, useTheme } from '@material-ui/core';
import Button from 'components/Button';
import { ControllableDrawer } from 'components/Drawer';
import { ControllableSwitchTabs } from 'components/Tabs';
import AddNewCategory from 'pages/Billing/RightDrawer/AddNewCategory/AddNewCategory';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import IndependantCategories from './IndependantCategories/IndependantCategories';
import LinkedCategories from './LinkedCategories/LinkedCategories';
import useStyles from './style';

const CategoryManagement = () => {
  const { t } = useTranslation(['billing']);
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeTab, setActiveTab] = useState<number>(0);

  const tabHeaders = useMemo(
    () => [{ title: t('billing:independentCategories') }, { title: t('billing:linkedCategories') }],
    [t]
  );
  const tabPanels = [{ component: <IndependantCategories /> }, { component: <LinkedCategories /> }];

  const handleTabChange = useCallback((newValue: number) => {
    setActiveTab(newValue);
  }, []);

  return (
    <Box className={classes.categories} position="relative" mt={4.25}>
      <ControllableSwitchTabs
        tabHeaders={tabHeaders}
        tabPanels={tabPanels}
        handleTabChange={handleTabChange}
        activeTab={activeTab}
      />
      <ControllableDrawer
        toggleElement={handleToggle => (
          <Button fullWidth={!!matches} disableElevation className={classes.btnNewCategory} onClick={handleToggle}>
            {t('billing:addNewCategory')}
          </Button>
        )}
      >
        {toggleDrawer => (
          <AddNewCategory toggleDrawer={toggleDrawer} activeTab={activeTab === 0 ? 'independent' : 'linked'} />
        )}
      </ControllableDrawer>
    </Box>
  );
};

export default CategoryManagement;
