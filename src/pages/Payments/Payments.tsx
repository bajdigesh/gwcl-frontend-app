import PrivateRoute from 'components/Route/PrivateRoute';
import Title from 'components/Title';
import routePath from 'global/routePaths';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Redirect, Switch } from 'react-router-dom';
import paymentsRoutes from './routes';

const Payments = () => {
  const { t } = useTranslation(['common']);
  return (
    <>
      <Title>{t('common:payments')}</Title>
      <Switch>
        <Redirect exact from={routePath.payments.base} to={routePath.payments.summary} />
      </Switch>
      <PrivateRoute appRoutes={paymentsRoutes} />
    </>
  );
};

export default Payments;
