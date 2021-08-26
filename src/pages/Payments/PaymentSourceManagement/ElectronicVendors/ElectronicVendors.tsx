import { Box, makeStyles, Typography } from '@material-ui/core';
import { DownloadIcon1 } from 'assets/images';
import Button from 'components/Button';
import { ControllableDrawer } from 'components/Drawer';
import { FilterContainer } from 'components/Filters';
import Table, { IndeterminateCheckbox, TablePagination } from 'components/Table';
import Title from 'components/Title';
import { sortingOrder } from 'global/constants';
import useStyles from 'pages/Payments/PaymentSourceManagement/styles';
import RightDrawer from 'pages/Payments/RightDrawer';
import VendorForm from 'pages/Payments/RightDrawer/VendorForm';
import Filters from 'pages/Payments/shared/Filters';
import { IGetUsersSearchQuery } from 'pages/Payments/shared/types';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ElectronicVendorData from './ElectronicVendorData';

const electronicVendorStyles = makeStyles(theme => ({
  filterOuterWrapper: {
    '& .gwcl-MuiAutocomplete-root': {
      display: 'none',
    },
  },
}));

const ElectronicVendors = () => {
  const { t } = useTranslation(['common', 'payment']);
  const classes = useStyles();
  const styles = electronicVendorStyles();
  const [electronicVendorData, setElectronicVendorData] = useState<any>([]);

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
    const data = ElectronicVendorData.payload;
    const timeOut = setTimeout(() => {
      setElectronicVendorData(data);
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
      Header: t('payment:electronicVendors'),
      accessor: 'electronic_vendor_name',
      Cell: (data: any) => (
        <>
          <Typography component="p" color="inherit" variant="body2" gutterBottom>
            {data.row.original.electronic_vendor_name}
          </Typography>
          <Typography variant="subtitle2" component="span">
            {data.row.original.electronic_vendor_code}
          </Typography>
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
      Header: t('common:customers'),
      accessor: 'customers',
      Cell: (data: any) => (
        <>
          <Typography color="primary" component="p" className={classes.receivedPayment}>
            {new Intl.NumberFormat().format(data.row.original.customers)}
          </Typography>
        </>
      ),
    },
    {
      Header: t('payment:receivedPayments'),
      accessor: 'payments',
      Cell: (data: any) => (
        <>
          <Typography color="primary" component="p" className={classes.receivedPayment}>
            {new Intl.NumberFormat().format(data.row.original.payments)}
          </Typography>
        </>
      ),
    },
    {
      Header: t('common:addedOn'),
      accessor: 'added_on',
    },
  ];

  const handleChangePage = () => {};
  const handleChangeRowsPerPage = () => {};

  return (
    <>
      <Box display="block" position="relative">
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
                <Title>{t('payment:addElectronicVendor')}</Title>
                <VendorForm />
              </RightDrawer>
            )}
          </ControllableDrawer>
        </Box>
      </Box>

      <Box className={styles.filterOuterWrapper}>
        <FilterContainer>
          <Filters
            sortedOrder={filterSchema.order!}
            handleSearchInputChange={handleSearchInputChange}
            handleFilterFormSubmit={handleFilterFormSubmit}
            handleSortingMenuChange={handleSortingMenuChange}
          />
        </FilterContainer>
      </Box>

      <Table
        columns={columns}
        data={electronicVendorData || []}
        enableRowSelect
        rowsPerPage={electronicVendorData?.meta_data?.pagination?.per_page || 10}
        renderPagination={() => (
          <TablePagination
            paginationData={electronicVendorData?.meta_data?.pagination}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        )}
      />
    </>
  );
};

export default ElectronicVendors;
