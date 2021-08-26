import { concentratorInitialData } from 'pages/Devices/RightDrawer/AddConcentrator/schema';

export const formatConcentratorFormData = (data: any) => {
  if (data) {
    return {
      ...concentratorInitialData,
      id: data?.id || '',
      imei: data.imei || '',
      ip_address: data.ip_address || '',
      latitude: data.latitude || '',
      longitude: data.longitude || '',
      phone_number: data.phone_number || '',
      concentrator_number: data.concentrator_number || '',
      is_online: data.is_online ? 'yes' : 'no',
      installed_by: data.installed_by ? { label: data.installed_by?.first_name, value: data.installed_by?.id } : null,
      installed_timestamp: data?.installed_timestamp ? new Date(data.installed_timestamp) : null,
    };
  } else {
    return concentratorInitialData;
  }
};
