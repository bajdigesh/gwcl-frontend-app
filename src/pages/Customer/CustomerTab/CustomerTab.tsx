import PrivateRoute from 'components/Route/PrivateRoute';
import { RouteTabHeader } from 'components/Tabs';
import Title from 'components/Title';
import routePath from 'global/routePaths';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { customerTabRoutes } from '../routes';

const CustomersTab: React.FC<any> = () => {
  const { t } = useTranslation(['customers']);
  const tabList = useMemo(
    () => [
      { title: t('customers:list'), pathname: routePath.customers.customerList },
      { title: t('customers:newServiceRequest'), pathname: routePath.customers.newServiceRequest },
      { title: t('customers:clusterCustomers'), pathname: routePath.customers.clusterCustomers.base },
    ],
    [t]
  );

  return (
    <>
      <Title>{t('customers:customers')}</Title>
      <RouteTabHeader tabHeaders={tabList} />
      <PrivateRoute appRoutes={customerTabRoutes} />
    </>
  );
};

export default CustomersTab;
