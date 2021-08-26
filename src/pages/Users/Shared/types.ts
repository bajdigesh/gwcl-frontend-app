import { sortingOrder } from 'global/constants';

export interface IGetUsersSearchQuery {
  active?: string;
  technicians?: string;
  page?: number;
  page_size?: number;
  region_id?: string;
  district_id?: string;
  start_date?: string;
  end_date?: string;
  search?: string;
  orderBy?: string;
  order?: typeof sortingOrder.ASCENDING | typeof sortingOrder.DESCENDING;
}
