import { BillingIcon, CardIcon, CustomersIcon, DashboardIcon, DevicesIcon, UserIcon } from 'assets/images';
import routePath from 'global/routePaths';

export const sideBarList: Array<ISidebarItem> = [
  {
    path: routePath.home.base,
    icon: DashboardIcon,
    label: 'dashboard',
  },
  {
    path: routePath.customers.base,
    icon: CustomersIcon,
    label: 'customers',
  },
  {
    path: routePath.devices.base,
    icon: DevicesIcon,
    label: 'devices',
  },
  {
    path: routePath.billing.base,
    icon: BillingIcon,
    label: 'billing',
  },
  // {
  //   path: '/complaints',
  //   icon: ComplaintIcon,
  //   label: 'Complaints',
  // },
  {
    path: routePath.payments.base,
    icon: CardIcon,
    label: 'payments',
  },
  // {
  //   path: '/adjustments',
  //   icon: AdjustmentsIcon,
  //   label: 'Adjustments',
  // },
  // {
  //   path: '/analytics',
  //   icon: DashboardIcon,
  //   label: 'Analytics',
  // },
  {
    path: routePath.users.base,
    icon: UserIcon,
    label: 'userManagement',
  },
  // {
  //   path: '/settings',
  //   icon: GearIcon,
  //   label: 'Settings',
  // },
];
