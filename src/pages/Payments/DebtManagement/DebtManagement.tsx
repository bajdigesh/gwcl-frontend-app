import { Box } from '@material-ui/core';
import { SwitchTabs } from 'components/Tabs';
import { useTranslation } from 'react-i18next';
import Customers from './Customers';
import District from './District';
import Region from './Region';
import Route from './Route';

const DebtManagement = () => {
  const { t } = useTranslation(['common']);
  const tabHeaders = [
    { title: t('common:region') },
    { title: t('common:district') },
    { title: t('common:route') },
    { title: t('common:customers') },
  ];
  const tabPanels = [
    { component: <Region /> },
    { component: <District /> },
    { component: <Route /> },
    { component: <Customers /> },
  ];
  return (
    <Box position="relative" mt={4.25}>
      <SwitchTabs tabHeaders={tabHeaders} tabPanels={tabPanels} />
    </Box>
  );
};
export default DebtManagement;
