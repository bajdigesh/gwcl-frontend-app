import routePath from 'global/routePaths';
import ConcentratorDetail from './ConcentratorDetail';
import Concentrators from './Concentrators';
import DevicesTab from './DevicesTab';
import MeterDetail from './MeterDetail';
import Meters from './Meters';
import PhoneDetail from './PhoneDetail';
import Phones from './Phones';

const devicesRoutes = [
  {
    path: routePath.devices.meterDetail,
    component: MeterDetail,
    exact: true,
  },
  {
    path: routePath.devices.concentratorDetail,
    component: ConcentratorDetail,
    exact: true,
  },
  {
    path: routePath.devices.phoneDetail,
    component: PhoneDetail,
    exact: true,
  },
  {
    path: routePath.devices.base,
    component: DevicesTab,
  },
];

export const devicesTabRoutes = [
  {
    path: routePath.devices.meters,
    component: Meters,
    exact: true,
  },
  {
    path: routePath.devices.concentrators,
    component: Concentrators,
    exact: true,
  },
  {
    path: routePath.devices.phones,
    component: Phones,
    exact: true,
  },
];

export default devicesRoutes;
