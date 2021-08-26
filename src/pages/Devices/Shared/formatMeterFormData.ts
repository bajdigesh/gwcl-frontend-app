import { type } from 'os';
import { meterFormData } from 'pages/Devices/RightDrawer/MeterForm/schema';

export const formatMeterFormData = (meterData: any) => {
  if (meterData) {
    return {
      id: meterData?.id || '',
      meter_number: meterData.meter_number || '',
      meter_brand_id: meterData.brand ? { label: meterData.brand.name, value: meterData.brand.id } : null,
      meter_model_id: meterData.model ? { label: meterData.model.name, value: meterData.model.id } : null,
      meter_size_id: meterData.size ? { label: meterData.size.name, value: meterData.size.id } : null,
      meter_status_id: meterData.status ? { label: meterData.status.name, value: meterData.status.id } : null,
      meter_type_id: meterData.type ? { label: meterData.type.name, value: meterData.type.id } : null,
      meter_state_id: meterData.state ? { label: meterData.state.name, value: meterData.state.id } : null,
      meter_install_stage_id: meterData.install_stage
        ? { label: meterData.install_stage.name, value: meterData.install_stage.id }
        : null,
      concentrator_id: meterData.concentrator?.id || '',
      meter_verified: meterData.meter_verified ? '1' : '0',
      meter_number_verified: meterData.meter_number_verified ? '1' : '0',
    };
  } else {
    return meterFormData;
  }
};
