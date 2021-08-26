import { Box } from '@material-ui/core';
import { SwitchTabs } from 'components/Tabs';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Surcharges from './Surcharges';
import WaterRates from './WaterRates';

const Tariffs = () => {
  const { t } = useTranslation(['billing']);
  const tabHeaders = useMemo(() => [{ title: t('billing:waterRates') }, { title: t('billing:surcharges') }], [t]);
  const tabPanels = [{ component: <WaterRates /> }, { component: <Surcharges /> }];
  return (
    <Box position="relative" mt={4.25}>
      <SwitchTabs tabHeaders={tabHeaders} tabPanels={tabPanels} />
    </Box>
  );
};
export default Tariffs;
