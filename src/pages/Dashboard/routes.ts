import routePath from 'global/routePaths';
import Billing from 'pages/Billing';
import Customer from 'pages/Customer';
import Devices from 'pages/Devices';
import Payments from 'pages/Payments';
import Users from 'pages/Users';
import Home from './Home';

const dashboardRoutes = [
  {
    path: routePath.home.base,
    component: Home,
    exact: true,
    name: 'Dashboard',
  },
  {
    path: '/customers',
    component: Customer,
    exact: false,
    name: 'Customers',
  },
  {
    path: routePath.devices.base,
    component: Devices,
    name: 'Devices',
  },
  {
    path: routePath.users.base,
    component: Users,
    name: 'User Management',
  },
  {
    path: routePath.billing.base,
    component: Billing,
    name: 'Billing',
  },
  {
    path: routePath.payments.base,
    component: Payments,
    name: 'Payments',
  },
];

export default dashboardRoutes;
