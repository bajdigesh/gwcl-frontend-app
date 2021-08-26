import routePath from 'global/routePaths';
import DebtManagement from './DebtManagement';
import PaymentSourceManagement from './PaymentSourceManagement';
import PaymentsTab from './PaymentsTab';
import ReceivedPayments from './ReceivedPayments';
import Reports from './Reports';
import Summary from './Summary';

const paymentsRoutes = [
  {
    path: routePath.payments.base,
    component: PaymentsTab,
  },
];

export const paymentsTabRoutes = [
  {
    path: routePath.payments.summary,
    component: Summary,
    exact: true,
  },
  {
    path: routePath.payments.receivedPayments,
    component: ReceivedPayments,
    exact: true,
  },
  {
    path: routePath.payments.paymentSourceManagement,
    component: PaymentSourceManagement,
    exact: true,
  },
  {
    path: routePath.payments.debtManagement,
    component: DebtManagement,
    exact: true,
  },
  {
    path: routePath.payments.reports,
    component: Reports,
    exact: true,
  },
];

export default paymentsRoutes;
