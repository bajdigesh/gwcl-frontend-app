import { makeStyles, Tab, TabProps, Tabs, TabsProps } from '@material-ui/core';
import React, { memo, useCallback, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { IRouteTabHeaderItem } from './types';

export interface IRouteTabHeaderProps {
  tabHeaders: Array<IRouteTabHeaderItem>;
  tabsProps?: TabsProps;
  tabProps?: TabProps;
}

const useStyles = makeStyles(theme => ({
  tabsRoot: {
    maxWidth: '100%',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacing(3),
    },
  },
  tabWrapper: {
    width: '100%',
    overflow: 'hidden',
    display: 'inline-grid',
  },
}));

const RouteTabHeader: React.FC<IRouteTabHeaderProps> = ({ tabHeaders, tabsProps, tabProps }) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const activePathnameIndex = useMemo(
    () => tabHeaders.findIndex((item: any) => location.pathname.includes(item.pathname)),
    [location.pathname, tabHeaders]
  );

  const handleTabChange = useCallback(
    (_: React.ChangeEvent<{}>, newPathname: string) => {
      history.push(newPathname);
    },
    [history]
  );

  if (activePathnameIndex === -1) return null;

  return (
    <div className={classes.tabWrapper}>
      <Tabs
        {...tabsProps}
        value={tabHeaders[activePathnameIndex].pathname}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        indicatorColor="primary"
        className={classes.tabsRoot}
      >
        {tabHeaders.map((tabHeader: IRouteTabHeaderItem, index: number) => {
          return <Tab {...tabProps} key={index} label={tabHeader.title} value={tabHeader.pathname} />;
        })}
      </Tabs>
    </div>
  );
};

export default memo(RouteTabHeader);
