import { Box, Typography } from '@material-ui/core';
import { FilterContainer } from 'components/Filters';
import Table, { IndeterminateCheckbox } from 'components/Table';
import { sortingOrder } from 'global/constants';
import BarChart from 'pages/Payments/DebtManagement/BarChart';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CellValue } from 'react-table';
import { debounce, formatNumberInDollar } from 'utils';
import Filters from './Filters';

interface IProps {}

const Route: React.FC<IProps> = () => {
  const { t } = useTranslation(['common', 'payment']);
  const [filterSchema, setFilterSchema] = useState<any>({
    page: 1,
    page_size: 15,
    region_id: '',
    district_id: '',
    search: '',
    orderBy: 'id',
    order: sortingOrder.ASCENDING,
  });
  const data = Array.from(new Array(10)).map(_ => ({
    name: 'Route Name',
    customers_count: '204',
    debt: {
      total: { amount: 382110, percentage: 6 },
      '0-1': { amount: 382110, percentage: 23 },
      '1-2': { amount: 382110, percentage: 23 },
      '2-3': { amount: 382110, percentage: 23 },
      '3-12': { amount: 382110, percentage: 23 },
      '13-24': { amount: 382110, percentage: 23 },
      '24+': { amount: 382110, percentage: 23 },
    },
  }));

  const columns = [
    {
      id: 'selection',
      width: 0,
      Header: ({ getToggleAllRowsSelectedProps }: any) => {
        return (
          <div>
            <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
          </div>
        );
      },
      Cell: ({ row }: any) => {
        return (
          <div>
            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
          </div>
        );
      },
    },
    {
      Header: t('common:route'),
      accessor: 'name',
      Cell: (cell: CellValue) => {
        return (
          <Box>
            <Typography variant="body2" color="primary" gutterBottom>
              {cell.value}
            </Typography>
            <Typography variant="subtitle2">{cell.row.original?.customers_count} Customers</Typography>
          </Box>
        );
      },
    },
    {
      Header: t('payment:totalDebt'),
      Cell: (cell: CellValue) => {
        return (
          <>
            <Typography variant="body2" color="textPrimary" gutterBottom>
              ${formatNumberInDollar(cell.row.original?.debt.total?.amount)}
            </Typography>
            <Typography variant="body2" color="textPrimary" gutterBottom>
              {cell.row.original?.debt.total?.percentage}%
            </Typography>
          </>
        );
      },
    },
    {
      Header: `0-30 ${t('common:days')}`,
      Cell: (cell: CellValue) => {
        return (
          <>
            <Typography variant="body2" color="textPrimary" gutterBottom>
              ${formatNumberInDollar(cell.row.original?.debt['0-1']?.amount)}
            </Typography>
            <Typography variant="body2" color="textPrimary" gutterBottom>
              {cell.row.original?.debt['0-1']?.percentage}%
            </Typography>
          </>
        );
      },
    },
    {
      Header: `31-60 ${t('common:days')}`,
      Cell: (cell: CellValue) => {
        return (
          <>
            <Typography variant="body2" color="textPrimary" gutterBottom>
              ${formatNumberInDollar(cell.row.original?.debt['1-2']?.amount)}
            </Typography>
            <Typography variant="body2" color="textPrimary" gutterBottom>
              {cell.row.original?.debt['1-2']?.percentage}%
            </Typography>
          </>
        );
      },
    },
    {
      Header: `61-90 ${t('common:days')}`,
      Cell: (cell: CellValue) => {
        return (
          <>
            <Typography variant="body2" color="textPrimary" gutterBottom>
              ${formatNumberInDollar(cell.row.original?.debt['2-3']?.amount)}
            </Typography>
            <Typography variant="body2" color="textPrimary" gutterBottom>
              {cell.row.original?.debt['2-3']?.percentage}%
            </Typography>
          </>
        );
      },
    },
    {
      Header: `4-12 ${t('common:month')}`,
      Cell: (cell: CellValue) => {
        return (
          <>
            <Typography variant="body2" color="textPrimary" gutterBottom>
              ${formatNumberInDollar(cell.row.original?.debt['3-12']?.amount)}
            </Typography>
            <Typography variant="body2" color="textPrimary" gutterBottom>
              {cell.row.original?.debt['3-12']?.percentage}%
            </Typography>
          </>
        );
      },
    },
    {
      Header: `13-24 ${t('common:month')}`,
      Cell: (cell: CellValue) => {
        return (
          <>
            <Typography variant="body2" color="textPrimary" gutterBottom>
              ${formatNumberInDollar(cell.row.original?.debt['13-24']?.amount)}
            </Typography>
            <Typography variant="body2" color="textPrimary" gutterBottom>
              {cell.row.original?.debt['13-24']?.percentage}%
            </Typography>
          </>
        );
      },
    },
    {
      Header: `24+ ${t('common:month')}`,
      Cell: (cell: CellValue) => {
        return (
          <>
            <Typography variant="body2" color="textPrimary" gutterBottom>
              ${formatNumberInDollar(cell.row.original?.debt['24+']?.amount)}
            </Typography>
            <Typography variant="body2" color="textPrimary" gutterBottom>
              {cell.row.original?.debt['24+']?.percentage}%
            </Typography>
          </>
        );
      },
    },
  ];

  //Filter form handler
  const handleFilterFormSubmit = useCallback((values: any) => {
    // const updatedFilterSchema = {
    //   ...filterSchema,
    //   region_id: values.region_id?.value,
    //   district_id: values.district_id?.value,
    // };
    // setFilterSchema(updatedFilterSchema);
    // dispatch(getUsers(updatedFilterSchema));
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearchInputChange = useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      // const searchValue = e.target.value;
      // const updatedFilterSchema = { ...filterSchema, search: searchValue };
      // setFilterSchema(updatedFilterSchema);
      // dispatch(getUsers(updatedFilterSchema));
    }, 500),
    []
  );

  const handleSortingMenuChange = useCallback((data: IAutoCompleteOption) => {
    // console.log(data);
    // if (data.value === filterSchema.order) return;
    // const updatedFilterSchema = { ...filterSchema, order: data.value };
    // setFilterSchema(updatedFilterSchema);
    // dispatch(getUsers(updatedFilterSchema));
  }, []);

  return (
    <>
      <BarChart />
      <FilterContainer>
        <Filters
          sortedOrder={filterSchema.order!}
          handleSearchInputChange={handleSearchInputChange}
          handleFilterFormSubmit={handleFilterFormSubmit}
          handleSortingMenuChange={handleSortingMenuChange}
        />
      </FilterContainer>
      <Table columns={columns} data={data} hoverableRow enableRowSelect />
    </>
  );
};
export default Route;
