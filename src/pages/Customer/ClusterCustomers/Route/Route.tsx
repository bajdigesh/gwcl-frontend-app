import { Box } from '@material-ui/core';
import React from 'react';
import { useToggle } from 'utils/hooks';
import RouteDetail from './RouteDetail';
import RouteList from './RouteList';

const Route = () => {
  const { open: showDetail, toggleOpen: toggleShowDetail } = useToggle();

  return (
    <Box mt={1}>
      {showDetail ? (
        <RouteDetail toggleShowDetail={toggleShowDetail} />
      ) : (
        <RouteList toggleShowDetail={toggleShowDetail} />
      )}
    </Box>
  );
};
export default Route;
