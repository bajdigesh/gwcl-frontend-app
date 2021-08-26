import { FallBackLoader } from 'components/Loader';
import { TabHeader, TabPanel } from 'components/Tabs';
import useStyles from 'components/Tabs/styles';
import React, { memo, Suspense } from 'react';

interface ISwitchTabsProps {
  tabHeaders: Array<{ title: string }>;
  activeTab: number;
  handleTabChange: (newValue: number) => void;
  tabPanels: Array<{ component: React.ReactNode }>;
}

const SwitchTabs: React.FC<ISwitchTabsProps> = ({ tabHeaders, tabPanels, activeTab, handleTabChange }) => {
  const classes = useStyles();
  // const [activeTab, setActiveTab] = useState<number>(0);

  // const handleTabChange = useCallback((event: React.ChangeEvent<{}>, newValue: number) => {
  //   setActiveTab(newValue);
  // }, []);

  return (
    <>
      <TabHeader
        tabHeaders={tabHeaders}
        activeTab={activeTab}
        handleTabChange={(e, newValue) => handleTabChange(newValue)}
        tabsProps={{ className: classes.switchTabs, variant: 'standard', TabIndicatorProps: { hidden: true } }}
        tabProps={{ className: classes.switchTab }}
      />
      <Suspense fallback={<FallBackLoader height={50} />}>
        <TabPanel tabPanels={tabPanels} value={activeTab} />
      </Suspense>
    </>
  );
};

export default memo(SwitchTabs);
