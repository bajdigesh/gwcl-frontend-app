import { Box } from '@material-ui/core';
import { BanIcon, DeleteIcon, EditIcon, ExclamationIcon, FlagIcon, VerifiedIcon, WarningIcon } from 'assets/images';
import clsx from 'clsx';
import Button from 'components/Button';
import { FilterContainer } from 'components/Filters';
import Table, { IndeterminateCheckbox, TableFooter, TablePagination } from 'components/Table';
import { TitleSecondary } from 'components/Title';
import { sortingOrder } from 'global/constants';
import routePath from 'global/routePaths';
import { customerRoutePath } from 'pages/Customer/constants';
import CustomerData from 'pages/Customer/CustomerData';
import useStyles from 'pages/Customer/CustomerList/styles';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import { encrypt } from 'utils';
import Filters from './Filters';

const CustomerList = () => {
  const { t } = useTranslation(['common', 'customers']);
  const history = useHistory();
  const classes = useStyles();
  const [customerList, setCustomerList] = useState<any>([]);
  const getCustomerStatus = { status: 'success' };
  const customersPagination = CustomerData.meta_data[0].pagination;

  useEffect(() => {
    const data = CustomerData.payload;
    setCustomerList(data);
  }, []);

  const handleChangePage = () => {};
  const handleChangeRowsPerPage = () => {};
  const editCustomer = (id: number) => {};
  const openConfirmationDialog = (id: number) => {};
  const handleNewConnectionRequest = () => {
    history.push(customerRoutePath.newConnectionRequest);
  };
  const handleDeactivateButtonClick = () => {};
  const handleDeleteButtonClick = () => {};

  const [filterSchema, setFilterSchema] = useState<any>({
    page: 1,
    page_size: 15,
    region_id: '',
    district_id: '',
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
      Header: t('common:accountName'),
      accessor: 'account_name',
      Cell: (data: any) => (
        <Box display="flex" alignItems="center" className={classes.customerAccount}>
          <Link to={routePath.customers.customerDetail.base.replace(':id', encrypt(data.row.original.id))}>
            {data.row.original.account_name}
          </Link>
          <span>{data.row.original.customer_status === 'active' ? <VerifiedIcon /> : <ExclamationIcon />}</span>
          <span>{data.row.original.meter_status === 'working' ? '' : <FlagIcon />}</span>
        </Box>
      ),
    },
    {
      Header: t('common:accountNumber'),
      accessor: 'account_number',
    },
    {
      Header: t('common:customerStatus'),
      accessor: 'customer_status',
      Cell: (data: any) => (
        <>
          <span className={classes.capitalizedText}>{data.row.original.customer_status}</span>
        </>
      ),
    },
    {
      Header: t('common:meterStatus'),
      accessor: 'meter_status',
      Cell: (data: any) => (
        <Box
          display="flex"
          alignItems="center"
          className={clsx(
            classes.meterStatus,
            { [classes.statusWorking]: data.row.original.meter_status === 'working' },
            { [classes.statusFaulty]: data.row.original.meter_status !== 'working' }
          )}
        >
          {data.row.original.meter_status === 'working' ? (
            <>
              <VerifiedIcon />
              {t('common:working')}
            </>
          ) : (
            <>
              <WarningIcon />
              {t('common:faulty')}
            </>
          )}
        </Box>
      ),
    },
    {
      Header: t('common:meterType'),
      accessor: 'meter_type',
      Cell: (data: any) => <span className={classes.capitalizedText}>{data.row.original.meter_type}</span>,
    },
    {
      Header: t('common:lastPaymentOn'),
      accessor: 'last_payment_on',
    },

    {
      Header: '',
      accessor: 'id',
      Cell: (data: any) => (
        <Box display="flex" className={clsx('actionButtons', classes.actionButtons)}>
          <p onClick={() => editCustomer(data.row.original.id)}>
            <EditIcon />
          </p>
          <p onClick={() => openConfirmationDialog(data.row.original?.id)}>
            <BanIcon />
          </p>
        </Box>
      ),
    },
  ];

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={{ xs: 1, md: 2 }}>
        <TitleSecondary>
          {customerList.length} {t('common:customers')}
        </TitleSecondary>
        <Button
          disableElevation
          borderRadius={4}
          color="primary"
          variant="contained"
          onClick={handleNewConnectionRequest}
          className={classes.addBtn}
        >
          {t('customers:newConnectionRequest')}
        </Button>
      </Box>

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
        data={customerList}
        loading={getCustomerStatus.status === 'loading'}
        hoverableRow
        enableRowSelect
        rowsPerPage={customersPagination?.per_page || 10}
        renderTableFooter={selectedFlatRows => (
          <TableFooter selectedRows={selectedFlatRows}>
            <Button
              size="large"
              className={classes.deactivateBtn}
              variant="outlined"
              onClick={handleDeactivateButtonClick}
              startIcon={<BanIcon />}
            >
              {t('common:deactivate')}
            </Button>
            <Button
              size="large"
              className={classes.deleteBtn}
              variant="outlined"
              onClick={handleDeleteButtonClick}
              startIcon={<DeleteIcon />}
            >
              {t('common:delete')}
            </Button>
          </TableFooter>
        )}
        renderPagination={() => (
          <TablePagination
            paginationData={customersPagination}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        )}
      />
    </>
  );
};

export default CustomerList;
