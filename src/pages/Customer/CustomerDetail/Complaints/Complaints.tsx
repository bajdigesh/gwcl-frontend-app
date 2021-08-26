import clsx from 'clsx';
import { FilterContainer } from 'components/Filters';
import Table, { IndeterminateCheckbox, TablePagination } from 'components/Table';
import { sortingOrder } from 'global/constants';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useStyles from '../styles';
import ComplaintData from './ComplaintData';
import Filters from './Filters';

const Complaints = () => {
  const { t } = useTranslation(['common', 'customers']);
  const classes = useStyles();
  const [paymentData, setPaymentData] = useState<any>([]);

  const [filterSchema, setFilterSchema] = useState<any>({
    page: 1,
    page_size: 15,
    technician: '',
    owner: '',
    date: '',
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
      Header: t('customers:complaintNumber'),
      accessor: 'complaint_number',
      Cell: (data: any) => (
        <>
          <p>#{data.row.original.complaint_number}</p>
          <span className={classes.subRecords}>
            {t('customers:registeredOn')}&nbsp;
            {new Intl.DateTimeFormat('en-US', {
              month: 'long',
              day: '2-digit',
            }).format(new Date(data.row.original.created_at))}
          </span>
        </>
      ),
    },
    {
      Header: t('customers:complaintDesc'),
      accessor: 'complaint_description',
    },
    {
      Header: t('common:status'),
      accessor: 'status',
      Cell: (data: any) => (
        <>
          <span
            className={clsx(
              classes.complaintStatus,
              classes.upperCasedText,
              { [classes.assigned]: data.row.original.status === 'assigned' },
              { [classes.resolved]: data.row.original.status === 'resolved' }
            )}
          >
            {data.row.original.status === 'assigned' ? 'technician assigned' : data.row.original.status}
          </span>
        </>
      ),
    },
    {
      Header: t('customers:technicianAssigned'),
      accessor: 'assigned_technician',
      Cell: (data: any) => (
        <>
          <span className={clsx(classes.primaryColorText, classes.bolderText)}>
            {data.row.original.assigned_technician}
          </span>
        </>
      ),
    },
    {
      Header: t('common:owner'),
      accessor: 'complained_by',
      Cell: (data: any) => (
        <>
          <span className={clsx(classes.primaryColorText, classes.bolderText)}>{data.row.original.complained_by}</span>
        </>
      ),
    },
  ];

  useEffect(() => {
    const data = ComplaintData.payload;
    const dataTimeOut = setTimeout(() => {
      setPaymentData(data);
    }, 1000);

    return () => {
      clearTimeout(dataTimeOut);
    };
  }, []);

  const paymentPagination = ComplaintData.meta_data[0].pagination;
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

export default Complaints;
