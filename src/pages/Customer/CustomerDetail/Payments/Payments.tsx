import { FilterContainer } from 'components/Filters';
import Table, { IndeterminateCheckbox, TablePagination } from 'components/Table';
import { sortingOrder } from 'global/constants';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useStyles from '../styles';
import Filters from './Filters';
import PaymentData from './PaymentsData';

const Payments = () => {
  const { t } = useTranslation(['common', 'customers']);
  const classes = useStyles();

  const [paymentData, setPaymentData] = useState<any>([]);

  const [filterSchema, setFilterSchema] = useState<any>({
    page: 1,
    page_size: 15,
    month: '',
    payment_method: '',
    paid_to: '',
    search: '',
    orderBy: 'id',
    order: sortingOrder.ASCENDING,
  });

  const handleSearchInputChange = () => {};
  const handleFilterFormSubmit = () => {};
  const handleSortingMenuChange = () => {};

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
      Header: t('customers:receiptTransId'),
      accessor: 'receipt_id',
    },
    {
      Header: t('customers:paymentAmount'),
      accessor: 'payment_amount',
      Cell: (data: any) => (
        <>
          <span className={classes.amount}>{data.row.original.payment_amount}</span>
        </>
      ),
    },
    {
      Header: t('customers:prevBalance'),
      accessor: 'prev_balance',
      Cell: (data: any) => (
        <>
          <span className={classes.amount}>{data.row.original.prev_balance}</span>
        </>
      ),
    },
    {
      Header: t('customers:closingBalance'),
      accessor: 'closing_balance',
      Cell: (data: any) => (
        <>
          <span className={classes.amount}>{data.row.original.closing_balance}</span>
        </>
      ),
    },
    {
      Header: t('common:time'),
      accessor: 'time',
      Cell: (data: any) => (
        <>
          {new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: '2-digit',
            hour: 'numeric',
            hour12: true,
            minute: 'numeric',
          }).format(new Date(data.row.original.time))}
        </>
      ),
    },
    {
      Header: t('customers:paymentMethod'),
      accessor: 'payment_method',
      Cell: (data: any) => (
        <>
          <p className={classes.capitalizedText}>{data.row.original.payment_method}</p>
          <span className={classes.subRecords}>{data.row.original.paid_to}</span>
        </>
      ),
    },
  ];

  useEffect(() => {
    const data = PaymentData.payload;
    const timeOut = setTimeout(() => {
      setPaymentData(data);
    }, 1000);
    return () => clearTimeout(timeOut);
  }, []);

  const paymentPagination = PaymentData.meta_data[0].pagination;
  const handleChangePage = () => {};
  const handleChangeRowsPerPage = () => {};

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

      <Table
        columns={columns}
        data={paymentData}
        enableRowSelect
        rowsPerPage={paymentPagination?.per_page || 10}
        renderPagination={() => (
          <TablePagination
            paginationData={paymentPagination}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        )}
      />
    </>
  );
};

export default Payments;
