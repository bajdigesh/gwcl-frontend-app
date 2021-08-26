import { Box } from '@material-ui/core';
import { SwitchTabs } from 'components/Tabs';
import CompletedRequest from 'pages/Customer/NewServiceRequest/CompletedRequest';
import InProgressRequest from 'pages/Customer/NewServiceRequest/InProgressRequest';
import NewServiceRequestData from 'pages/Customer/NewServiceRequest/NewServiceRequestData';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

const NewServiceRequest = () => {
  const { t } = useTranslation(['customers']);
  const [selectedServiceRequests, setSelectedServiceRequests] = useState<any>([]);
  const [selectedInProgressServiceRequests, setSelectedInProgressServiceRequests] = useState<any>([]);
  const tabHeaders = useMemo(() => [{ title: t('customers:inProgress') }, { title: t('customers:completed') }], [t]);
  const tabPanels = [
    { component: <InProgressRequest inProgressServiceRequest={selectedInProgressServiceRequests} /> },
    { component: <CompletedRequest completedRequest={selectedServiceRequests} /> },
  ];

  useEffect(() => {
    const data = NewServiceRequestData.completed;
    const inprogress = NewServiceRequestData.inProgress;
    setSelectedInProgressServiceRequests(inprogress);
    setSelectedServiceRequests(data);
  }, []);

  return (
    <Box textAlign="center">
      <SwitchTabs tabHeaders={tabHeaders} tabPanels={tabPanels} />
    </Box>
  );
};
export default NewServiceRequest;
