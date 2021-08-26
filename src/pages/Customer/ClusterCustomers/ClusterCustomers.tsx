import { Box, Grid, MenuItem } from '@material-ui/core';
import { ArrowDownIcon } from 'assets/images';
import Button from 'components/Button';
import { ControllableDrawer } from 'components/Drawer';
import CustomizedDropdown from 'components/Dropdown/CustomizedDropdown';
import Map from 'components/Map';
import { SwitchTabs } from 'components/Tabs';
import District from 'pages/Customer/ClusterCustomers/District';
import Region from 'pages/Customer/ClusterCustomers/Region';
import Route from 'pages/Customer/ClusterCustomers/Route';
import { AddDistrict, AddRegion, AddRoute } from 'pages/Customer/RightDrawer';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import useStyles from './style';

const ClusterCustomers = () => {
  const classes = useStyles();
  const { t } = useTranslation(['common']);
  const tabHeaders = useMemo(
    () => [{ title: t('common:region') }, { title: t('common:district') }, { title: t('common:route') }],
    [t]
  );
  const tabPanels = [{ component: <Region /> }, { component: <District /> }, { component: <Route /> }];

  const menuList = useMemo(
    () => [
      { title: t('common:route'), component: AddRoute },
      { title: t('common:district'), component: AddDistrict },
      { title: t('common:region'), component: AddRegion },
    ],
    [t]
  );
  const markers = [
    { lat: 6.518235, lng: -0.270231 },
    { lat: 6.528234, lng: -0.230221 },
    { lat: 6.538236, lng: -0.250211 },
    { lat: 6.548238, lng: -0.280271 },
    { lat: 6.558239, lng: -0.290261 },
  ];
  return (
    <>
      <Grid container className={classes.clusterContainer} spacing={2}>
        <Grid item xl={7} lg={7} md={7} sm={12} xs={12}>
          <Box position="relative" height="100%">
            <CustomizedDropdown
              open={true}
              renderTriggerElement={handleClick => (
                <Button
                  disableElevation
                  color="primary"
                  variant="contained"
                  className={classes.buttonPosition}
                  endIcon={<ArrowDownIcon />}
                  onClick={handleClick}
                >
                  {t('common:addNew')}
                </Button>
              )}
            >
              {handleClose => {
                return (
                  <div>
                    {menuList.map(
                      ({
                        title,
                        component: Component,
                        disableDrawerTitle,
                      }: {
                        title: string;
                        component: any;
                        disableDrawerTitle?: boolean;
                      }) => (
                        <ControllableDrawer
                          key={title}
                          toggleElement={handleToggle => <MenuItem onClick={handleToggle}>{title}</MenuItem>}
                        >
                          {() => <Component />}
                        </ControllableDrawer>
                      )
                    )}
                  </div>
                );
              }}
            </CustomizedDropdown>
            <SwitchTabs tabHeaders={tabHeaders} tabPanels={tabPanels} />
          </Box>
        </Grid>
        <Grid item xl={5} lg={5} md={5} sm={12} xs={12} style={{ position: 'relative' }}>
          <Map
            mapStyles={{ height: '100%', width: '100%', minHeight: '300px' }}
            zoom={13}
            latLng={{
              lat: 6.518237,
              lng: -0.270221,
            }}
            markers={markers}
            drawingManager
          ></Map>
        </Grid>
      </Grid>
    </>
  );
};
export default ClusterCustomers;
