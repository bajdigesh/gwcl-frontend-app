import { Box } from '@material-ui/core';
import React from 'react';
import { useToggle } from 'utils/hooks';
import RegionDetail from './RegionDetail';
import RegionList from './RegionList';

const Region = () => {
  const { open: showDetail, toggleOpen: toggleShowDetail } = useToggle();

  return (
    <Box mt={1}>
      {showDetail ? (
        <RegionDetail toggleShowDetail={toggleShowDetail} />
      ) : (
        <RegionList toggleShowDetail={toggleShowDetail} />
      )}
    </Box>
  );
};
export default Region;
