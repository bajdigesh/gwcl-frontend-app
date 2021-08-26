import React from 'react';

import { TablePagination as MUTablePagination } from '@material-ui/core';

interface IPaginationProps {
  paginationData: any;
  handleChangePage: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const ROWS_PER_PAGE_OPTIONS = [5, 10, 15, 25, 50, 100];

const TablePagination: React.FC<IPaginationProps> = ({ paginationData, handleChangePage, handleChangeRowsPerPage }) => {
  return (
    <MUTablePagination
      component="div"
      count={+paginationData?.total || 10}
      page={+paginationData?.current_page - 1 || 0}
      onChangePage={handleChangePage}
      rowsPerPage={+paginationData?.per_page || 15}
      rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
      onChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
};

export default TablePagination;
