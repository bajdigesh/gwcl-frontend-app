import PrivateRoute from 'components/Route/PrivateRoute';
import { RouteTabHeader } from 'components/Tabs';
import routePath from 'global/routePaths';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { paymentsTabRoutes } from '../routes';

const PaymentsTab = () => {
  const { t } = useTranslation(['common', 'payment']);
  const tabList = useMemo(
    () => [
      { title: t('common:summary'), pathname: routePath.payments.summary },
      { title: t('payment:receivedPayments'), pathname: routePath.payments.receivedPayments },
      { title: t('payment:paymentSourceManagement'), pathname: routePath.payments.paymentSourceManagement },
      { title: t('payment:debtManagement'), pathname: routePath.payments.debtManagement },
      { title: t('common:reports'), pathname: routePath.payments.reports },
    ],
    [t]
  );
  return (
    <>
      <RouteTabHeader tabHeaders={tabList} />
      <PrivateRoute appRoutes={paymentsTabRoutes} />
    </>
  );
};

export default PaymentsTab;
