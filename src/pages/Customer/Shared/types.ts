import { sortingOrder } from 'global/constants';

export interface IGetUsersSearchQuery {
  active?: string;
  page?: number;
  page_size?: number;
  region_id?: string;
  district_id?: string;
  search?: string;
  orderBy?: string;
  order?: typeof sortingOrder.ASCENDING | typeof sortingOrder.DESCENDING;
}
