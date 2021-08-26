import { Box, IconButton, Typography } from '@material-ui/core';
import { DeleteIcon, DownloadIcon1, EditIcon } from 'assets/images';
import Button from 'components/Button';
import { ControllableDrawer } from 'components/Drawer';
import { FilterContainer } from 'components/Filters';
import Table, { IndeterminateCheckbox, TablePagination } from 'components/Table';
import Title from 'components/Title';
import { sortingOrder } from 'global/constants';
import RightDrawer from 'pages/Payments/RightDrawer';
import VendorForm from 'pages/Payments/RightDrawer/VendorForm';
import Filters from 'pages/Payments/shared/Filters';
import { IGetUsersSearchQuery } from 'pages/Payments/shared/types';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import useStyles from './../styles';
import VendorsData from './VendorsData';

const Vendors = () => {
  const { t } = useTranslation(['common', 'payment']);
  const classes = useStyles();
  const [vendorData, setVendorData] = useState<any>([]);
  const [filterSchema, setFilterSchema] = useState<IGetUsersSearchQuery>({
    page: 1,
    page_size: 15,
    region_id: '',
    district_id: '',
    search: '',
    orderBy: 'id',
    order: sortingOrder.ASCENDING,
  });
  const handleSearchInputChange = () => {};
  const handleFilterFormSubmit = () => {};
  const handleSortingMenuChange = () => {};

  useEffect(() => {
    const data = VendorsData.payload;
    const timeOut = setTimeout(() => {
      setVendorData(data);
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
      Header: t('payment:vendor'),
      accessor: 'vendor_name',
      Cell: (data: any) => (
        <>
          <Typography component="p" color="inherit" variant="body2" gutterBottom>
            {data.row.original.vendor_name}
          </Typography>
          <Typography variant="subtitle2" component="span">
            {data.row.original.vendor_code}
          </Typography>
        </>
      ),
    },
    {
      Header: t('payment:currentBalance'),
      accessor: 'current_balance',
      Cell: (data: any) => (
        <>
          <Typography component="p" color="inherit" variant="body2" gutterBottom className={classes.amount}>
            {new Intl.NumberFormat().format(data.row.original.current_balance)}
          </Typography>
          <Link className={classes.goToHistory} to="./#">
            {t('payment:seeBalanceHistory')}
          </Link>
        </>
      ),
    },
    {
      Header: t('common:contact'),
      accessor: 'email',
      Cell: (data: any) => (
        <>
          <Typography component="p" color="inherit" variant="body2" gutterBottom>
            E: {data.row.original.email}
          </Typography>
          <Typography component="p" color="inherit" variant="body2">
            P: {data.row.original.phone}
          </Typography>
        </>
      ),
    },
    {
      Header: t('payment:receivedPayments'),
      accessor: 'received_payment',
      Cell: (data: any) => (
        <>
          <Typography color="primary" component="p" className={classes.receivedPayment}>
            {new Intl.NumberFormat().format(data.row.original.received_payment)}
          </Typography>
        </>
      ),
    },
    {
      Header: t('common:addedOn'),
      accessor: 'added_on',
    },
    {
      Header: '',
      accessor: 'vendor_code',
      Cell: (data: any) => (
        <div className="actionButtons">
          <IconButton>
            <EditIcon />
          </IconButton>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  const handleChangePage = () => {};
  const handleChangeRowsPerPage = () => {};
  return (
    <>
      <Box display={{ xs: 'block', md: 'flex' }} justifyContent="space-between" position="relative">
        <Box
          display="flex"
          justifyContent="space-between"
          marginY={{ xs: 2, lg: 0 }}
          position={{ xs: 'static', lg: 'absolute' }}
          right={0}
          top={-60}
        >
          <Button
            disableElevation
            variant="text"
            color="primary"
            borderRadius={8}
            className={classes.exportTableBtn}
            startIcon={<DownloadIcon1 />}
          >
            {t('payment:exportTable')}
          </Button>
          <ControllableDrawer
            toggleElement={handleToggle => (
              <Button disableElevation variant="contained" color="primary" borderRadius={8} onClick={handleToggle}>
                {t('payment:addVendor')}
              </Button>
            )}
          >
            {() => (
              <RightDrawer>
                <Title>{t('payment:addVendor')}</Title>
                <VendorForm />
              </RightDrawer>
            )}
          </ControllableDrawer>
        </Box>
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
        data={vendorData || []}
        hoverableRow
        enableRowSelect
        rowsPerPage={vendorData?.meta_data?.pagination?.per_page || 10}
        renderPagination={() => (
          <TablePagination
            paginationData={vendorData?.meta_data?.pagination}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        )}
      />
    </>
  );
};

export default Vendors;
