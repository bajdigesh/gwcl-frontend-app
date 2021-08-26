import PrivateRoute from 'components/Route/PrivateRoute';
import { RouteTabHeader } from 'components/Tabs';
import Title from 'components/Title';
import routePath from 'global/routePaths';
import { devicesTabRoutes } from 'pages/Devices/routes';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const DevicesTab: React.FC<any> = () => {
  const { t } = useTranslation(['devices']);
  const tabList = useMemo(
    () => [
      { title: t('devices:meters'), pathname: routePath.devices.meters },
      { title: t('devices:concentrators'), pathname: routePath.devices.concentrators },
      { title: t('devices:phones'), pathname: routePath.devices.phones },
    ],
    [t]
  );

  return (
    <>
      <Title>{t('devices:devices')}</Title>
      <RouteTabHeader tabHeaders={tabList} />
      <PrivateRoute appRoutes={devicesTabRoutes} />
    </>
  );
};

export default DevicesTab;
