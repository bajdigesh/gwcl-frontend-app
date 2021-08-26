import { Box } from '@material-ui/core';
import AddMeterBulk from './AddMeterBulk';
import AddMeterIndividual from './AddMeterIndividual';
import { useTranslation } from 'react-i18next';
import { SwitchTabs } from 'components/Tabs';

const AddMeter = () => {
  const { t } = useTranslation(['devices']);
  const tabHeaders = [{ title: t('devices:addIndividual') }, { title: t('devices:bulkAdd') }];
  const tabPanels = [{ component: <AddMeterIndividual /> }, { component: <AddMeterBulk /> }];
  return (
    <Box mt={4.25}>
      <SwitchTabs tabHeaders={tabHeaders} tabPanels={tabPanels} />
    </Box>
  );
};

export default AddMeter;
