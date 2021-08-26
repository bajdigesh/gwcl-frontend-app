import { Box } from '@material-ui/core';
import React from 'react';
import { useToggle } from 'utils/hooks';
import DistrictDetail from './DistrictDetail';
import DistrictList from './DistrictList';

const District = () => {
  const { open: showDetail, toggleOpen: toggleShowDetail } = useToggle();

  return (
    <Box mt={1}>
      {showDetail ? (
        <DistrictDetail toggleShowDetail={toggleShowDetail} />
      ) : (
        <DistrictList toggleShowDetail={toggleShowDetail} />
      )}
    </Box>
  );
};
export default District;
