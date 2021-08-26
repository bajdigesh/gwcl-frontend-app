export interface IserviceRates {
  page?: number;
  page_size?: number;
  start_date?: string;
  end_date?: string;
}

export interface IServiceRatesByServiceAgreement {
  page?: number;
  page_size?: number;
  resetData?: boolean;
}
export interface IServiceRatesHistoriesByServiceAgreementId {
  serviceAgreementId: string;
  searchQuery: {
    page?: number;
    page_size?: number;
  };
}
