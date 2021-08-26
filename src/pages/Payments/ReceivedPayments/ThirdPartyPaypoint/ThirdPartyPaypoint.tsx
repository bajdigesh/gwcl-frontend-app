import { Box, Typography } from '@material-ui/core';
import { ArrowDownIcon, DownloadIcon1, GraphIcon } from 'assets/images';
import clsx from 'clsx';
import { FilterContainer } from 'components/Filters';
import Table, { IndeterminateCheckbox, TablePagination } from 'components/Table';
import { sortingOrder } from 'global/constants';
import { IGetUsersSearchQuery } from 'pages/Payments/shared/types';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Filters from './Filters';
import ThirdPartyPaypointData from './ThirdPartyPaypointData';
import receivedPaymentStyles from 'pages/Payments/ReceivedPayments/style';

const ThirdPartyPaypoint = () => {
  const { t } = useTranslation(['common', 'payment']);
  const classes = receivedPaymentStyles();
  const [paypointData, setPaypointData] = useState<any>([]);
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
    const data = ThirdPartyPaypointData.payload;
    const timeOut = setTimeout(() => {
      setPaypointData(data);
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
      Header: t('payment:name'),
      accessor: 'name',
      Cell: (data: any) => (
        <>
          <Typography variant="body2" component="p" color="primary" gutterBottom>
            <Link className={classes.userName} to={''}>
              {data.row.original.name}
            </Link>
          </Typography>
          <Typography variant="body2" component="p" color="textSecondary">
            {data.row.original.account_number}
          </Typography>
        </>
      ),
    },
    {
      Header: t('payment:receiptId'),
      accessor: 'receipt_id',
      Cell: (data: any) => <>#{data.row.original.receipt_id}</>,
    },
    {
      Header: t('payment:vendor'),
      accessor: 'vendor_name',
      Cell: (data: any) => (
        <Typography component="p" color="primary">
          {data.row.original.vendor_name}
        </Typography>
      ),
    },
    {
      Header: t('payment:amount'),
      accessor: 'amount_paid',
      Cell: (data: any) => (
        <p className={classes.amount}>{new Intl.NumberFormat().format(data.row.original.amount_paid)}</p>
      ),
    },
    {
      Header: t('payment:vendorClosingBalance'),
      accessor: 'vendor_closing_balance',
      Cell: (data: any) => (
        <p className={classes.amount}>{new Intl.NumberFormat().format(data.row.original.vendor_closing_balance)}</p>
      ),
    },
    {
      Header: t('payment:method'),
      accessor: 'method',
    },
    {
      Header: t('payment:paymentDate'),
      accessor: 'payment_date',
    },
  ];

  const handleChangePage = () => {};
  const handleChangeRowsPerPage = () => {};

  return (
    <Box position="relative">
      <div className={classes.exportTable}>
        <Link to="./#">
          <DownloadIcon1 />
          {t('common:exportTable')}
        </Link>
      </div>

      <FilterContainer>
        <Filters
          sortedOrder={filterSchema.order!}
          handleSearchInputChange={handleSearchInputChange}
          handleFilterFormSubmit={handleFilterFormSubmit}
          handleSortingMenuChange={handleSortingMenuChange}
        />
      </FilterContainer>

      <Box paddingY={2} paddingX={{ xs: 2, md: 3 }} border={1} borderRadius={8} borderColor="grey.500" mt={2}>
        <Box display={{ xs: 'block', md: 'flex' }} alignItems="center">
          <Box className={classes.paymentTrendContainer}>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {t('payment:paymentReceived')}
            </Typography>
            <Box display={{ xs: 'block', md: 'flex' }} alignItems="center">
              <Typography component="h4" variant="h4" className={classes.amount}>
                {new Intl.NumberFormat().format(6102935)}
              </Typography>
              <Typography component="p" className={clsx(classes.positiveTrend, classes.paymentTrend)}>
                <ArrowDownIcon />
                20% {t('common:higherThanPrevMonth')}
              </Typography>
            </Box>
          </Box>

          <Box display="grid" className={classes.paymentClassification}>
            <div>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                {t('common:cash')}:
              </Typography>
              <Typography component="h4" variant="h4" className={classes.amount}>
                {new Intl.NumberFormat().format(4500000)}
              </Typography>
            </div>
            <div>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                {t('common:cheque')}:
              </Typography>
              <Typography component="h4" variant="h4" className={classes.amount}>
                {new Intl.NumberFormat().format(4500000)}
              </Typography>
            </div>
            <div>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                {t('common:mobileMoney')}:
              </Typography>
              <Typography component="h4" variant="h4" className={classes.amount}>
                {new Intl.NumberFormat().format(4500000)}
              </Typography>
            </div>
            <Typography color="primary" variant="body2" className={classes.viewTrend}>
              <GraphIcon />
              {t('common:viewTrend')}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Table
        columns={columns}
        data={paypointData || []}
        enableRowSelect
        rowsPerPage={paypointData?.meta_data?.pagination?.per_page || 10}
        renderPagination={() => (
          <TablePagination
            paginationData={paypointData?.meta_data?.pagination}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        )}
      />
    </Box>
  );
};
export default ThirdPartyPaypoint;
