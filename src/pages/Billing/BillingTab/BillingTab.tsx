import PrivateRoute from 'components/Route/PrivateRoute';
import { RouteTabHeader } from 'components/Tabs';
import Title from 'components/Title';
import routePath from 'global/routePaths';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { billingTabRoutes } from '../routes';

const BillingTab = () => {
  const { t } = useTranslation(['common', 'billing']);
  const tabList = useMemo(
    () => [
      { title: t('common:summary'), pathname: routePath.billing.summary },
      { title: t('billing:generatedBills'), pathname: routePath.billing.generatedBills },
      { title: t('billing:billingExceptions'), pathname: routePath.billing.billingException },
      { title: t('common:tariffs'), pathname: routePath.billing.tariffs },
      { title: t('billing:unbilledCustomers'), pathname: routePath.billing.unBilledCustomers },
      { title: t('billing:categoryMgmt'), pathname: routePath.billing.categoryManagement },
      { title: t('common:reports'), pathname: routePath.billing.reports },
    ],
    [t]
  );

  return (
    <>
      <Title>{t('common:billing')}</Title>
      <RouteTabHeader tabHeaders={tabList} />
      <PrivateRoute appRoutes={billingTabRoutes} />
    </>
  );
};

export default BillingTab;
