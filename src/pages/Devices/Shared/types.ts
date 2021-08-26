import { sortingOrder } from 'global/constants';

export interface IMeterSearchQuery {
  page?: number;
  page_size?: number;
  region_id?: string;
  district_id?: string;
  route_id?: string;
  search?: string;
  orderBy?: string;
  order?: typeof sortingOrder.ASCENDING | typeof sortingOrder.DESCENDING;
}

export interface IConcentratorSearchQuery {
  page?: number;
  page_size?: number;
  status_id?: string;
  search?: string;
}

export interface IGetMetersByConcentratorIdSearchQuery {
  page?: number;
  page_size?: number;
  meter_type_id?: number;
  meter_status_id?: number;
  search?: string;
}

export interface IPhoneSearchQuery {
  page?: number;
  page_size?: number;
  assigned_to_user_id?: string;
  user_phone_status_id?: string;
  search?: string;
  orderBy?: string;
  order?: typeof sortingOrder.ASCENDING | typeof sortingOrder.DESCENDING;
}
export interface IInitialFinalReadingsQuery {
  type: string;
  start_date: string;
  end_date: string;
}
