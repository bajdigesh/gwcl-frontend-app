import PrivateRoute from 'components/Route/PrivateRoute';
import { RouteTabHeader } from 'components/Tabs';
import routePath from 'global/routePaths';
import { customerDetailTabRoutes } from 'pages/Customer/routes';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Redirect, Switch, useParams } from 'react-router-dom';

const CustomerDetailTab: React.FC<any> = () => {
  const { t } = useTranslation(['common', 'customers']);
  const { id: customerId } = useParams<{ id?: string | undefined }>();

  const tabList = useMemo(() => {
    if (!customerId) return [];

    /**
     * Since RouteTabHeader compares location.pathname in which params value is replaced by real value.
     * So, ":id" params of tablist pathname should be replaced with real params value.
     */
    const customerDetail: any = Object.entries(routePath.customers.customerDetail).reduce(
      (accumulator, [key, value]) => {
        return { ...accumulator, [key]: value.replace(':id', customerId) };
      },
      {}
    );

    return [
      { title: t('common:all'), pathname: customerDetail.all },
      { title: t('common:billing'), pathname: customerDetail.billing },
      { title: t('common:payments'), pathname: customerDetail.payments },
      { title: t('common:adjustments'), pathname: customerDetail.adjustments },
      { title: t('customers:customerStatements'), pathname: customerDetail.customerStatements },
      { title: t('common:complaints'), pathname: customerDetail.complaints },
      { title: t('common:accountDetails'), pathname: customerDetail.accountDetails },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerId, t]);

  return (
    <>
      <Switch>
        <Redirect exact from={routePath.customers.customerDetail.base} to={routePath.customers.customerDetail.all} />
      </Switch>
      <RouteTabHeader tabHeaders={tabList} />
      <PrivateRoute appRoutes={customerDetailTabRoutes} />
    </>
  );
};

export default CustomerDetailTab;
