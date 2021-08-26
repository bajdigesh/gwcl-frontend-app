import { sortingOrder } from 'global/constants';

export interface IGetClusterCustomersSearchQuery {
  active?: string;
  page?: number;
  page_size?: number;
  region_id?: string;
  district_id?: string;
  start_date?: string;
  end_date?: string;
  search?: string;
  service_categories: string;
  customer_status: string;
  meter_status: string;
  lifeline_customers: string;
  orderBy?: string;
  order?: typeof sortingOrder.ASCENDING | typeof sortingOrder.DESCENDING;
}
