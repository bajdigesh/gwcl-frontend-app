// import the original type declarations
// import all namespaces (for the default language, only)
import 'react-i18next';
import auth from '../../public/locales/en/auth.json';
import billing from '../../public/locales/en/billing.json';
import common from '../../public/locales/en/common.json';
import customers from '../../public/locales/en/customers.json';
import devices from '../../public/locales/en/devices.json';
import payment from '../../public/locales/en/payment.json';
import users from '../../public/locales/en/users.json';

declare module 'react-i18next' {
  // and extend them!
  interface Resources {
    common: typeof common;
    auth: typeof auth;
    devices: typeof devices;
    payment: typeof payment;
    users: typeof users;
    customers: typeof customers;
    billing: typeof billing;
  }
}
