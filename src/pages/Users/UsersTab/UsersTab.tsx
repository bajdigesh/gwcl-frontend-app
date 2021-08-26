import PrivateRoute from 'components/Route/PrivateRoute';
import { RouteTabHeader } from 'components/Tabs';
import Title from 'components/Title';
import routePath from 'global/routePaths';
import { userTabRoutes } from 'pages/Users/routes';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const UserList: React.FC<any> = () => {
  const { t } = useTranslation(['users']);
  const tabList = useMemo(
    () => [
      { title: t('users:activeUsers'), pathname: routePath.users.activeUsers },
      { title: t('users:inactiveUsers'), pathname: routePath.users.inactiveUsers },
      { title: t('users:technicians'), pathname: routePath.users.technicians },
    ],
    [t]
  );

  return (
    <>
      <Title>{t('users:userManagement')}</Title>
      <RouteTabHeader tabHeaders={tabList} />
      <PrivateRoute appRoutes={userTabRoutes} />
    </>
  );
};

export default UserList;
