import { Box } from '@material-ui/core';
import { SwitchTabs } from 'components/Tabs';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import ElectronicPayment from './ElectronicPayment';
import GWCLPaypoint from './GWCLPaypoint';
import useStyles from './style';
import ThirdPartyPaypoint from './ThirdPartyPaypoint';

const ReceivedPayments = () => {
  const classes = useStyles();
  const { t } = useTranslation(['payment']);
  const tabHeaders = useMemo(
    () => [
      { title: t('payment:gwclPaypoint') },
      { title: t('payment:3rdPartyPaypoint') },
      { title: t('payment:electronicPayment') },
    ],
    [t]
  );
  const tabPanels = [
    { component: <GWCLPaypoint /> },
    { component: <ThirdPartyPaypoint /> },
    { component: <ElectronicPayment /> },
  ];
  return (
    <Box position="relative" marginTop={{ xs: 2, md: 4.25 }}>
      <SwitchTabs tabHeaders={tabHeaders} tabPanels={tabPanels} />
    </Box>
  );
};

export default ReceivedPayments;
