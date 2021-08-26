import { Box, Typography } from '@material-ui/core';
import { VerifiedIcon } from 'assets/images';
import { FilterContainer } from 'components/Filters';
import Table, { IndeterminateCheckbox } from 'components/Table';
import { sortingOrder } from 'global/constants';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CellValue } from 'react-table';
import Filters from './Filters';

interface IProps {}

const UnBilledCustomers: React.FC<IProps> = () => {
  const { t } = useTranslation(['common', 'billing']);

  const data = Array.from(new Array(10)).map(_ => ({
    name: 'John Doe',
    account: '010104174161',
    meter_number: '27364892',
    last_billed_on: 'Dec 2, 2020',
    customer_status: { active: false, date: 'jul 24, 2020' },
    meter_status: { active: true },
  }));

  const columns = [
    {
      id: 'selection',
      width: 0,
      Header: ({ getToggleAllRowsSelectedProps }: any) => {
        return <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />;
      },
      Cell: ({ row }: any) => {
        return <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />;
      },
    },
    {
      Header: t('common:account'),
      accessor: 'account',
      Cell: (cell: CellValue) => {
        return (
          <Box>
            <Typography variant="body2" color="primary" gutterBottom>
              {cell.row.original?.name}
            </Typography>
            <Typography variant="subtitle2">{cell.row.original?.account}</Typography>
          </Box>
        );
      },
    },
    {
      Header: t('common:meterNumber'),
      accessor: 'meter_number',
      Cell: (cell: CellValue) => {
        return (
          <Typography variant="body2" color="primary">
            {cell.value}
          </Typography>
        );
      },
    },
    {
      Header: t('common:lastBilledOn'),
      accessor: 'last_billed_on',
    },
    {
      Header: t('common:customerStatus'),
      Cell: (cell: CellValue) => {
        return (
          <Box>
            <Typography variant="body2" gutterBottom>
              {cell.row.original?.customer_status?.active ? t('common:connected') : t('common:disconnected')}
            </Typography>
            <Typography variant="subtitle2">Since {cell.row.original?.customer_status?.date}</Typography>
          </Box>
        );
      },
    },
    {
      Header: t('common:meterStatus'),
      accessor: 'meter_status',
      Cell: (cell: CellValue) => {
        return (
          <Box display="flex" alignItems="center">
            <VerifiedIcon />
            <Box component="span" color="success.main" ml={1}>
              {cell.value?.active ? t('common:connected') : t('common:disconnected')}
            </Box>
          </Box>
        );
      },
    },
  ];

  const [filterSchema, setFilterSchema] = useState<any>({
    page: 1,
    page_size: 15,
    region_id: '',
    district_id: '',
    route_id: '',
    status: '',
    start_date: '',
    end_date: '',
    search: '',
    orderBy: 'id',
    order: sortingOrder.ASCENDING,
  });
  const handleSearchInputChange = (e: any) => {
    console.log(e.target.value);
  };
  const handleFilterFormSubmit = (e: any) => {
    console.log(e.target.value);
  };
  const handleSortingMenuChange = () => {};

  return (
    <>
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
export default UnBilledCustomers;
