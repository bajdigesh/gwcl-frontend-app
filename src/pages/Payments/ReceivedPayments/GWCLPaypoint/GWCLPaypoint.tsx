import { Box, Typography } from '@material-ui/core';
import { ArrowDownIcon, DownloadIcon1, GraphIcon } from 'assets/images';
import clsx from 'clsx';
import { FilterContainer } from 'components/Filters';
import Table, { IndeterminateCheckbox } from 'components/Table';
import { sortingOrder } from 'global/constants';
import PaymentData from 'pages/Payments/PaymentData';
import receivedPaymentStyles from 'pages/Payments/ReceivedPayments/style';
import { IGetUsersSearchQuery } from 'pages/Payments/shared/types';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Filters from './Filters';

const GWCLPaypoint = () => {
  const { t } = useTranslation(['common', 'payment']);
  const data = PaymentData.gwclPaypoint;
  const classes = receivedPaymentStyles();
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
          <Box display="flex" alignItems="center" component="p">
            <Link className={classes.userName} to={''}>
              {data.row.original.first_name} {data.row.original.last_name}
            </Link>
          </Box>
          <p className={classes.userType}>{data.row.original.user_type}</p>
        </>
      ),
    },
    {
      Header: t('payment:receiptId'),
      accessor: 'reciept_id',
    },
    {
      Header: t('payment:amount'),
      accessor: 'amount',
      Cell: (data: any) => <>{data.row.original.amount}</>,
    },
    {
      Header: t('payment:prevBalance'),
      accessor: 'previous_balance',
    },
    {
      Header: t('payment:closingBalance'),
      accessor: 'closing_balance',
    },
    {
      Header: t('payment:recievedBy'),
      accessor: 'recieved_by',
      Cell: (data: any) => (
        <>
          <Box display="flex" alignItems="center" component="p">
            <Link className={classes.userName} to={''}>
              {data.row.original.recieved_by.first_name} {data.row.original.recieved_by.last_name}
            </Link>
          </Box>
          <p className={classes.userType}>{data.row.original.recieved_by.user_type}</p>
        </>
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

      <Table columns={columns} data={data || []} enableRowSelect />
    </Box>
  );
};
export default GWCLPaypoint;
