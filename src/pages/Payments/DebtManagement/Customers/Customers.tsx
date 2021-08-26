import { Box, Typography } from '@material-ui/core';
import { FilterContainer } from 'components/Filters';
import Table, { IndeterminateCheckbox } from 'components/Table';
import { sortingOrder } from 'global/constants';
import BarChart from 'pages/Payments/DebtManagement/BarChart';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CellValue } from 'react-table';
import { debounce } from 'utils';
import Filters from './Filters';

interface IProps {}

const Customers: React.FC<IProps> = () => {
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
    name: 'John Doe',
    account: '010104174161',
    email: 'john.doe@gmail.com',
    phone: '827-172-3547',
    arrears: '500',
    payment_date: 'Jul 2, 2020',
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
      Header: t('common:customer'),
      accessor: 'customer',
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
      Header: t('common:contact'),
      Cell: (cell: CellValue) => {
        return (
          <>
            <Typography variant="body2" color="textPrimary" gutterBottom>
              E: {cell.row.original?.email}
            </Typography>
            <Typography variant="body2" color="textPrimary" gutterBottom>
              E: {cell.row.original?.phone}
            </Typography>
          </>
        );
      },
    },
    {
      Header: t('payment:currentArrears'),
      accessor: 'arrears',
      Cell: (cell: CellValue) => {
        return (
          <Typography variant="body2" color="textPrimary" gutterBottom>
            ${cell.value}
          </Typography>
        );
      },
    },
    {
      Header: t('payment:lastPayment'),
      Cell: (cell: CellValue) => {
        return (
          <Box>
            <Typography variant="body2" gutterBottom>
              ${cell.row.original?.arrears}
            </Typography>
            <Typography variant="subtitle2">{cell.row.original?.payment_date}</Typography>
          </Box>
        );
      },
    },
    {
      Header: '',
      id: 'actions',
      Cell: (cell: CellValue) => {
        return <Box display="flex" alignItems="center"></Box>;
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
export default Customers;
