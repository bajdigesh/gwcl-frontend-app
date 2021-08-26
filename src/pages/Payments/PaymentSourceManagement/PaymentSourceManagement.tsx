import { SwitchTabs } from 'components/Tabs';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Vendors from './3rdPartyVendors';
import ElectronicVendors from './ElectronicVendors';
import GWCLCashiers from './GWCLCashiers';
import GWCLPaypoints from './GWCLPaypoints';

const PaymentSourceManagement = () => {
  const { t } = useTranslation(['common', 'payment']);
  const tabHeaders = [
    { title: t('payment:3rdPartyVendors') },
    { title: t('payment:gwclCashiers') },
    { title: t('payment:gwclPaypoints') },
    { title: t('payment:electronicVendors') },
  ];
  const tabPanels = [
    { component: <Vendors /> },
    { component: <GWCLCashiers /> },
    { component: <GWCLPaypoints /> },
    { component: <ElectronicVendors /> },
  ];

  return <SwitchTabs tabHeaders={tabHeaders} tabPanels={tabPanels} />;
};

export default PaymentSourceManagement;
