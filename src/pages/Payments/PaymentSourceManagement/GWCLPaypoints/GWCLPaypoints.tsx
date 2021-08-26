import { Box, IconButton, makeStyles, Typography } from '@material-ui/core';
import { DeleteIcon, DownloadIcon1, EditIcon } from 'assets/images';
import Button from 'components/Button';
import { ControllableDrawer } from 'components/Drawer';
import { FilterContainer } from 'components/Filters';
import Table, { IndeterminateCheckbox, TablePagination } from 'components/Table';
import { sortingOrder } from 'global/constants';
import useStyles from 'pages/Payments/PaymentSourceManagement/styles';
import RightDrawer from 'pages/Payments/RightDrawer';
import PaypointForm from 'pages/Payments/RightDrawer/PaypointForm';
import Filters from 'pages/Payments/shared/Filters';
import { IGetUsersSearchQuery } from 'pages/Payments/shared/types';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PaypointsData from './PaypointsData';

const paypointStyles = makeStyles(theme => ({
  filterOuterWrapper: {
    '& .gwcl-MuiAutocomplete-root': {
      display: 'none',
    },
  },
}));

const GWCLPaypoints = () => {
  const { t } = useTranslation(['common', 'payment']);
  const classes = useStyles();
  const styles = paypointStyles();
  const [paypointsData, setPaypointsData] = useState<any>([]);

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
    const data = PaypointsData.payload;
    const timeOut = setTimeout(() => {
      setPaypointsData(data);
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
      Header: t('payment:paypoint'),
      accessor: 'cashier_name',
      Cell: (data: any) => (
        <>
          <Typography component="p" color="inherit" variant="body2" gutterBottom>
            {data.row.original.paypoint_name}
          </Typography>
          <Typography variant="subtitle2" component="span">
            {data.row.original.paypoint_code}
          </Typography>
        </>
      ),
    },
    {
      Header: t('common:location'),
      accessor: 'location',
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
      Header: t('payment:cashiers'),
      accessor: 'cashiers',
      Cell: (data: any) => (
        <>
          <Typography color="primary" component="p" className={classes.receivedPayment}>
            {new Intl.NumberFormat().format(data.row.original.cashiers)}
          </Typography>
        </>
      ),
    },
    {
      Header: t('payment:payments'),
      accessor: 'payments',
      Cell: (data: any) => (
        <>
          <Typography color="primary" component="p" className={classes.receivedPayment}>
            {new Intl.NumberFormat().format(data.row.original.received_payment)}
          </Typography>
        </>
      ),
    },
    {
      Header: t('common:createdOn'),
      accessor: 'created_on',
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
                {t('payment:addPaypoint')}
              </Button>
            )}
          >
            {() => (
              <RightDrawer>
                <PaypointForm />
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
        data={paypointsData || []}
        hoverableRow
        enableRowSelect
        rowsPerPage={paypointsData?.meta_data?.pagination?.per_page || 10}
        renderPagination={() => (
          <TablePagination
            paginationData={paypointsData?.meta_data?.pagination}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        )}
      />
    </>
  );
};

export default GWCLPaypoints;
