// import { customerRoutePath } from 'pages/Customer/constants';
import routePath from 'global/routePaths';
import ClusterCustomers from './ClusterCustomers';
import CustomerDetail from './CustomerDetail';
import AccountDetails from './CustomerDetail/AccountDetails';
import Adjustments from './CustomerDetail/Adjustments';
import All from './CustomerDetail/All';
import Billing from './CustomerDetail/Billing';
import Complaints from './CustomerDetail/Complaints';
import CustomerStatements from './CustomerDetail/CustomerStatements';
import CustomerStatementDetail from './CustomerDetail/CustomerStatements/CustomerStatementDetail';
import CustomerStatementList from './CustomerDetail/CustomerStatements/CustomerStatementList';
import Payment from './CustomerDetail/Payments';
import CustomerList from './CustomerList';
import CustomersTab from './CustomerTab/CustomerTab';
import NewConnectionRequest from './NewConnectionRequest';
import NewServiceRequest from './NewServiceRequest';

const customerRoutes = [
  {
    path: routePath.customers.newConnectionRequest,
    component: NewConnectionRequest,
    exact: true,
  },
  {
    path: routePath.customers.customerDetail.base,
    component: CustomerDetail,
  },
  {
    path: routePath.customers.base,
    component: CustomersTab,
  },
];
export default customerRoutes;

export const customerTabRoutes = [
  {
    path: routePath.customers.customerList,
    component: CustomerList,
    exact: true,
  },
  {
    path: routePath.customers.newServiceRequest,
    component: NewServiceRequest,
    exact: true,
  },
  {
    path: routePath.customers.clusterCustomers.base,
    component: ClusterCustomers,
    exact: true,
  },
];

export const customerDetailTabRoutes = [
  {
    path: routePath.customers.customerDetail.all,
    component: All,
    exact: true,
  },
  {
    path: routePath.customers.customerDetail.billing,
    component: Billing,
    exact: true,
  },
  {
    path: routePath.customers.customerDetail.payments,
    component: Payment,
    exact: true,
  },
  {
    path: routePath.customers.customerDetail.adjustments,
    component: Adjustments,
    exact: true,
  },
  {
    path: routePath.customers.customerDetail.customerStatements,
    component: CustomerStatements,
  },
  {
    path: routePath.customers.customerDetail.complaints,
    component: Complaints,
    exact: true,
  },
  {
    path: routePath.customers.customerDetail.accountDetails,
    component: AccountDetails,
    exact: true,
  },
];

export const customerStatementRoutes = [
  {
    path: routePath.customers.customerStatements.base,
    component: CustomerStatementList,
    exact: true,
  },
  {
    path: routePath.customers.customerStatements.detail,
    component: CustomerStatementDetail,
    exact: true,
  },
];
