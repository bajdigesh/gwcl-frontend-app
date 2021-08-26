import { FlagIcon } from 'assets/images';
import clsx from 'clsx';
import { FilterContainer } from 'components/Filters';
import Table, { IndeterminateCheckbox, TablePagination } from 'components/Table';
import { format } from 'date-fns';
import { MONTH_DAY_YEAR_FORMAT, sortingOrder } from 'global/constants';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useStyles from '../styles';
import BillingData from './BillingData';
import Filters from './Filters';

const Billing = () => {
  const { t } = useTranslation(['common', 'customers']);
  const classes = useStyles();
  const [billingData, setBillingData] = useState<any>([]);

  const [filterSchema, setFilterSchema] = useState<any>({
    page: 1,
    page_size: 15,
    month: '',
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
  const handleSortingMenuChange = (e: any) => {
    console.log(e.target.value);
  };

  useEffect(() => {
    const data = BillingData.payload;
    const timeOut = setTimeout(() => {
      setBillingData(data);
    }, 1000);
    return () => {
      clearTimeout(timeOut);
    };
  }, []);

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
      Header: t('customers:billMonth'),
      accessor: 'month',
      Cell: (data: any) => (
        <>
          <p className={clsx(classes.primaryColorText, classes.billMonth)}>
            {data.row.original.month} {data.row.original.year} {data.row.original.is_flagged ? <FlagIcon /> : ''}
          </p>
          {data.row.original.generated_on && (
            <>
              <span className={classes.subRecords}>Generated on {data.row.original.generated_on}</span>
            </>
          )}
        </>
      ),
    },
    {
      Header: t('customers:billAmount'),
      accessor: 'bill_amount',
      Cell: (data: any) => (
        <>
          <span className={classes.amount}>{data.row.original.bill_amount}</span>
        </>
      ),
    },
    {
      Header: t('customers:consumption'),
      accessor: 'consumption',
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
      Header: t('customers:balanceDue'),
      accessor: 'balance_due',
      Cell: (data: any) => (
        <>
          <span className={classes.amount}>{data.row.original.balance_due}</span>
        </>
      ),
    },
    {
      Header: t('common:lastPaymentOn'),
      accessor: 'last_payment_on',
      Cell: (data: any) => <>{format(new Date(data.value), MONTH_DAY_YEAR_FORMAT)}</>,
    },
  ];

  const billingPagination = BillingData.meta_data[0].pagination;
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

      {billingData && (
        <Table
          columns={columns}
          data={billingData}
          enableRowSelect
          rowsPerPage={billingPagination?.per_page || 10}
          renderPagination={() => (
            <TablePagination
              paginationData={billingPagination}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
          )}
        />
      )}
    </>
  );
};

export default Billing;
