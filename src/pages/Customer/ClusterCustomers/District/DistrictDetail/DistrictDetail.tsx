import { Box, Divider, IconButton, Typography } from '@material-ui/core';
import { BackIcon } from 'assets/images';
import RouteList from 'pages/Customer/ClusterCustomers/Route/RouteList';
import Summary from 'pages/Customer/ClusterCustomers/Shared/Summary';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface IProps {
  toggleShowDetail: () => void;
}

const DistrictDetail: React.FC<IProps> = ({ toggleShowDetail }) => {
  const { t } = useTranslation(['common', 'customers']);
  return (
    <Box>
      <Box display="flex" alignItems="center" mb={1}>
        <IconButton onClick={() => toggleShowDetail()}>
          <BackIcon />
        </IconButton>
        <Typography variant="h5">District Name(16)</Typography>
      </Box>
      <Box display="flex" my={2} pl={3}>
        <Typography variant="subtitle2">{t('common:region')}: </Typography>
        <Typography variant="subtitle2" color="textPrimary">
          Region Name (29)
        </Typography>
      </Box>
      <Divider light />
      <Summary />
      <RouteList />
    </Box>
  );
};
export default DistrictDetail;
