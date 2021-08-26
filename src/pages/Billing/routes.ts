import routePaths from 'global/routePaths';
import CategoryManagement from 'pages/Billing/CategoryManagement';
import Tariffs from 'pages/Billing/Tariffs';
import UnBilledCustomers from 'pages/Billing/UnBilledCustomers';
import BillingExceptions from './BillingExceptions';
import BillingTab from './BillingTab';
import GenerateBill from './GenerateBill';
import WorkingMeters from './GenerateBill/FinalizeBills/WorkingMeters';
import GeneratedBills from './GeneratedBills';
import Reports from './Reports';
import ReportForm from './Reports/ReportForm';
import Summary from './Summary';

const billingRoutes = [
  {
    path: routePaths.billing.generateBill,
    exact: true,
    component: GenerateBill,
  },
  {
    path: routePaths.billing.workingMeters,
    exact: true,
    component: WorkingMeters,
  },
  {
    path: routePaths.billing.createReport,
    exact: true,
    component: ReportForm,
  },
  {
    path: routePaths.billing.base,
    component: BillingTab,
  },
];

export const billingTabRoutes = [
  {
    path: routePaths.billing.summary,
    component: Summary,
    exact: true,
  },
  {
    path: routePaths.billing.generatedBills,
    component: GeneratedBills,
    exact: true,
  },
  {
    path: routePaths.billing.billingException,
    component: BillingExceptions,
    exact: true,
  },
  {
    path: routePaths.billing.tariffs,
    component: Tariffs,
    exact: true,
  },
  {
    path: routePaths.billing.unBilledCustomers,
    component: UnBilledCustomers,
    exact: true,
  },
  {
    path: routePaths.billing.categoryManagement,
    component: CategoryManagement,
    exact: true,
  },
  {
    path: routePaths.billing.reports,
    component: Reports,
    exact: true,
  },
];

export default billingRoutes;
