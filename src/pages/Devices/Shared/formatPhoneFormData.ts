import { phoneInitialData } from 'pages/Devices/RightDrawer/AddPhone/schema';

export const formatPhoneFormData = (data: any) => {
  if (data) {
    return {
      ...phoneInitialData,
      id: data?.id || '',
      imei: data?.IMEI || '',
      assigned_to_user_id: data?.assigned_to_user
        ? { label: data.assigned_to_user?.first_name, value: data.assigned_to_user?.id }
        : '',
      user_phone_model_id: data?.user_phone_model
        ? { label: data.user_phone_model?.name, value: data.user_phone_model?.id }
        : '',
      user_phone_status_id: data?.user_phone_status
        ? { label: data.user_phone_status?.name, value: data.user_phone_status?.id }
        : '',
      received_date: data?.received_date ? new Date(data?.received_date) : (null as any),
      retirement_date: data?.retirement_date ? new Date(data?.retirement_date) : (null as any),
      monthly_data_allowance: data?.monthly_data_allowance || '',
    };
  } else {
    return phoneInitialData;
  }
};
