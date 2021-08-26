const endpoints = {
  auth: {
    login: 'auth/tokens',
    forgotPassword: 'auth/forgot-passwords',
    resetPassword: 'auth/reset-passwords',
    logout: 'auth/logout',
    createPassword: 'auth/password-creations',
    emailVerification: 'auth/email-verifications',
    permissions: 'auth/me/permissions',
  },
  billing: {
    serviceAgreement: {
      serviceAgreement: 'service-agreements',
      serviceAgreementById: '/service-agreements/{id}',
    },
    serviceRates: {
      serviceRates: '/service-rates',
      serviceRatesByServiceAgreement: '/service-rates/service-agreements',
      serviceRatesHistoriesByServiceAgreeementId: '/service-rates/service-agreement/{serviceAgreementId}/histories',
    },
    surcharges: {
      surcharges: '/surcharges',
    },
  },
  common: {
    roles: '/roles',
    districts: '/districts',
    regions: '/regions',
    routes: '/routes',
  },
  customers: {},
  devices: {
    concentrators: {
      concentrators: 'concentrators',
      concentratorById: 'concentrators/{concentratorId}',
      concentratorHistoriesById: 'concentrators/{concentratorId}/histories',
      concentratorMeterBulklink: 'concentrators/{concentratorId}/meters/bulks',
      concentratorMeterBulkUnlink: 'concentrators/{concentratorId}/meters/dissociations',
      downloadMeters: 'concentrators/{concentratorId}/meters/exports',
      metersByConcentratorId: 'concentrators/{concentratorId}/meters',
      resetGPRS: 'concentrators/{concentratorId}/gprs-resets',
      updateConcentratorIp: 'concentrators/{concentratorId}/ip-alterations',
      updateClockCalibration: 'concentrators/{concentratorId}/clock-calibrations',
    },
    concentratorStatus: {
      concentratorStatus: 'concentrator-statuses',
    },
    meters: {
      meters: 'meters',
      meterById: 'meters/{meterId}',
      meterByMeterNumber: 'meters/{meterNumber}/meter-numbers',
      meterCsvUploads: 'meters/csv-uploads',
      meterValveOpening: 'meters/{meterNumber}/valve-openings',
      meterValveClosing: 'meters/{meterNumber}/valve-closings',

      // meter details
      meterBrands: 'meter-brands',
      meterInstallStages: 'meter-install-stages',
      meterModels: 'meter-models',
      meterSizes: 'meter-sizes',
      meterStates: 'meter-states',
      meterStatus: 'meter-statuses',
      meterTypes: 'meter-types',
      meterReadings: 'meters/{meterId}/readings',
      meterInitialFinalReadings: 'meters/{meterId}/reading-initials-finals',
      meterInstallationHistory: 'meters/{meterId}/installation-history',
    },
    phones: {
      phones: 'user-phones',
      phoneById: 'user-phones/{phoneId}',
      phoneHistoriesById: 'user-phones/{phoneId}/histories',
      phoneStatuses: 'user-phone-statuses',
      phoneModels: 'user-phone-models',
    },
  },
  payments: {},
  user: {
    users: 'users',
    userById: 'users/{userId}',
    userActivationById: 'users/{userId}/activations',
    usersActivation: 'users/activations',
    technicians: 'technicians',
    technicianById: 'technicians/{technicianId}',
  },
};

export default endpoints;
