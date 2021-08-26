import { Typography } from '@material-ui/core';
import MaUTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Skeleton from '@material-ui/lab/Skeleton';
import clsx from 'clsx';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, useFlexLayout, usePagination, useRowSelect, useTable } from 'react-table';
import useStyles from './styles';

export interface IProps {
  columns: any[];
  data: any[];
  loading?: boolean;
  hideTableHead?: boolean;
  hoverableRow?: boolean;
  renderPagination?: () => React.ReactNode;
  enableRowSelect?: boolean | undefined;
  renderTableFooter?: (selectedFlatRows: Row<any>[]) => React.ReactNode;
  rowsPerPage?: number;
}

const Table: React.FC<IProps> = ({
  columns,
  data,
  loading,
  hoverableRow,
  enableRowSelect,
  rowsPerPage = 10,
  hideTableHead,
  renderPagination,
  renderTableFooter,
}) => {
  const classes = useStyles();
  const { t } = useTranslation(['common']);

  const defaultColumn = useMemo(
    () => ({
      // When using the useFlexLayout:
      minWidth: 30, // minWidth is only used as a limit for resizing
      width: 150, // width is used for both the flex-basis and flex-grow
      maxWidth: 200, // maxWidth is only used as a limit for resizing
    }),
    []
  );

  const memoizedColumns = useMemo(() => columns, [columns]);

  const memoizedData = useMemo(() => data, [data]);

  const usePaginationHook: any = renderPagination ? usePagination : '';
  const useRowSelectHook: any = enableRowSelect ? useRowSelect : '';

  const { getTableProps, headerGroups, rows, prepareRow, selectedFlatRows } = useTable(
    {
      defaultColumn,
      columns: memoizedColumns,
      data: memoizedData,
    },
    useFlexLayout,
    usePaginationHook,
    useRowSelectHook
  );

  return (
    <div className={classes.tableOuterWrapper}>
      <div
        className={clsx(classes.tableWrapper, {
          [classes.checkboxEnabled]: enableRowSelect,
          [classes.hoverEnabled]: hoverableRow,
        })}
      >
        <MaUTable {...getTableProps()}>
          {!hideTableHead && (
            <TableHead>
              {headerGroups.map(headerGroup => (
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => {
                    return (
                      <TableCell
                        {...column.getHeaderProps()}
                        className={clsx(classes.tableCell, classes.tableHeadCell)}
                      >
                        {column.render('Header')}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableHead>
          )}
          <TableBody className={classes.tableBody}>
            {loading ? (
              Array.from(new Array(+rowsPerPage)).map((headerGroup, index) => {
                return (
                  <TableRow {...headerGroups[0].getHeaderGroupProps()} key={index} className={classes.tableRow}>
                    {columns.map((item, itemIndex) => (
                      <TableCell
                        {...headerGroups[0].headers[itemIndex].getHeaderProps()}
                        key={itemIndex}
                        className={clsx(classes.tableCell, classes.tableHeadCell)}
                      >
                        <Skeleton />
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : rows.length ? (
              rows.map((row, i) => {
                prepareRow(row);
                return (
                  <TableRow
                    {...row.getRowProps()}
                    className={clsx(classes.tableRow, { 'hoverable-row': hoverableRow })}
                  >
                    {row.cells.map(cell => {
                      return (
                        <TableCell {...cell.getCellProps()} className={classes.tableCell}>
                          {cell.render('Cell')}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            ) : (
              <TableRow className={classes.tableRow}>
                <TableCell className={classes.tableCell} style={{ display: 'table-cell' }}>
                  <Typography variant="body2" align="center">
                    {t('common:noData')}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </MaUTable>
      </div>

      {/* Render pagination if loading is false and there is data*/}
      {!loading && rows.length && renderPagination ? renderPagination() : null}

      {/* If selectedFlatRows array gets populated and enableRowSelect and renderTableFooter props is passed, it will renderTableFooter
       * renderTableFooter renders the table footer as render props
       */}
      {Array.isArray(selectedFlatRows) && selectedFlatRows.length && enableRowSelect && renderTableFooter
        ? renderTableFooter(selectedFlatRows)
        : null}
    </div>
  );
};

export default Table;
