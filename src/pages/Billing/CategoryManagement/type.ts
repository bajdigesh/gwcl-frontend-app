export interface IServiceAgreementQuery {
  page?: number;
  page_size?: number;
  code?: string;
  name?: string;
  active?: string;
  search?: string;
  type?: 'independent' | 'linked';
}
