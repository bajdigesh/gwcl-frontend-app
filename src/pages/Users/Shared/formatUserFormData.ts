import { userFormData } from 'pages/Users/RightDrawer/UserForm/schema';
import { technicianFormData } from 'pages/Users/Technicians/schema';

export const formatUserFormData = (userData: any) => {
  if (userData) {
    return {
      id: userData?.id || '',
      first_name: userData?.first_name || '',
      last_name: userData?.last_name || '',
      staff_id: userData?.staff_id || '',
      mobile: userData?.mobile || '',
      email: userData?.email || '',
      designation: userData?.designation || '',
      role_id: userData?.role ? { label: userData.role?.name, value: userData.role?.id } : null,
      region_id: userData?.region ? { label: userData.region?.region_name, value: userData.region?.id } : null,
      district_id: userData?.district
        ? { label: userData.district?.district_name, value: userData.district?.id }
        : null,
      route_ids: userData?.routes
        ? userData?.routes.map((item: any) => ({ label: item.route_name, value: item.id }))
        : null,
    };
  } else {
    return userFormData;
  }
};

export const formatTechnicianFormData = (technicianData: any) => {
  if (technicianData) {
    return {
      id: technicianData?.id || '',
      first_name: technicianData?.first_name || '',
      last_name: technicianData?.last_name || '',
      technician_id: technicianData?.technician_id || '',
      mobile: technicianData?.mobile || '',
      email: technicianData?.email || '',
    };
  } else {
    return technicianFormData;
  }
};
