import { Box, Divider, IconButton, Typography } from '@material-ui/core';
import { BackIcon } from 'assets/images';
import ServicePointList from 'pages/Customer/ClusterCustomers/ServicePointList';
import Summary from 'pages/Customer/ClusterCustomers/Shared/Summary';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface IProps {
  toggleShowDetail: () => void;
}

const RouteDetail: React.FC<IProps> = ({ toggleShowDetail }) => {
  const { t } = useTranslation(['common']);
  return (
    <>
      <Box display="flex" alignItems="center" mb={1}>
        <IconButton onClick={() => toggleShowDetail()}>
          <BackIcon />
        </IconButton>
        <Typography variant="h5">Route Name(16)</Typography>
      </Box>
      <Box display="inline-flex" my={1} pl={3}>
        <Typography variant="subtitle2">{t('common:region')}: </Typography>
        <Typography variant="subtitle2" color="textPrimary">
          Region Name(29)
        </Typography>
      </Box>
      <Box display="inline-flex" my={1} pl={3}>
        <Typography variant="subtitle2">{t('common:district')}: </Typography>
        <Typography variant="subtitle2" color="textPrimary">
          District Name(48)
        </Typography>
      </Box>
      <Box display="flex" mb={2} pl={3}>
        <Typography variant="subtitle2">{t('common:meterReader')}: </Typography>
        <Typography variant="subtitle2" color="textPrimary">
          Barima Kartweng
        </Typography>
      </Box>
      <Divider light />
      <Summary />
      <ServicePointList />
    </>
  );
};
export default RouteDetail;
