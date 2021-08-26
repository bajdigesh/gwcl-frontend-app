import { Box, IconButton, Typography } from '@material-ui/core';
import { BackIcon } from 'assets/images';
import DistrictList from 'pages/Customer/ClusterCustomers/District/DistrictList';
import Summary from 'pages/Customer/ClusterCustomers/Shared/Summary';
import React from 'react';

interface IProps {
  toggleShowDetail: () => void;
}

const RegionDetail: React.FC<IProps> = ({ toggleShowDetail }) => {
  return (
    <>
      <Box display="flex" alignItems="center" mb={1}>
        <IconButton onClick={() => toggleShowDetail()}>
          <BackIcon />
        </IconButton>
        <Typography variant="h5">Region Name(16)</Typography>
      </Box>
      <Summary />
      <DistrictList />
    </>
  );
};
export default RegionDetail;
