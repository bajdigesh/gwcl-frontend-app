import routePath from 'global/routePaths';
import ActiveUsers from './ActiveUsers';
import InactiveUsers from './InactiveUsers';
import TechnicianDetail from './TechnicianDetail';
import Technicians from './Technicians';
import UserDetail from './UserDetail';
import UsersTab from './UsersTab';

const userRoutes = [
  {
    path: routePath.users.userDetails,
    component: UserDetail,
    exact: true,
  },
  {
    path: routePath.users.base,
    component: UsersTab,
  },
];

export const userTabRoutes = [
  {
    path: routePath.users.activeUsers,
    component: ActiveUsers,
    exact: true,
  },
  {
    path: routePath.users.inactiveUsers,
    component: InactiveUsers,
    exact: true,
  },
  {
    path: routePath.users.technicians,
    component: Technicians,
    exact: true,
  },
  {
    path: routePath.users.technicianDetails,
    component: TechnicianDetail,
    exact: true,
  },
];

export default userRoutes;
