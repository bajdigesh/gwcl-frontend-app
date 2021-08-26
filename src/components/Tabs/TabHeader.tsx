import { Tab, TabProps, Tabs, TabsProps } from '@material-ui/core';
import React, { memo } from 'react';
import { ITabHeaderItem } from './types';

export interface ITabHeaderProps {
  tabHeaders: Array<ITabHeaderItem>;
  tabsProps?: TabsProps;
  tabProps?: TabProps;
  activeTab: number;
  handleTabChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
}

const TabHeader: React.FC<ITabHeaderProps> = ({ tabHeaders, tabsProps, tabProps, activeTab, handleTabChange }) => {
  return (
    <>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        indicatorColor="primary"
        {...tabsProps}
      >
        {tabHeaders.map((tabHeader: ITabHeaderItem, index: number) => {
          return <Tab key={index} label={tabHeader.title} {...tabProps} />;
        })}
      </Tabs>
    </>
  );
};

export default memo(TabHeader);
