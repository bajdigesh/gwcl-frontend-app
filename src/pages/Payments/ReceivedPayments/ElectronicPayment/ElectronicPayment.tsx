import { Box, Typography } from '@material-ui/core';
import { ArrowDownIcon, DownloadIcon1, GraphIcon } from 'assets/images';
import clsx from 'clsx';
import Chart from 'components/Chart';
import { FilterContainer } from 'components/Filters';
import Table, { IndeterminateCheckbox } from 'components/Table';
import { sortingOrder } from 'global/constants';
import { IGetUsersSearchQuery } from 'pages/Payments/shared/types';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ElectronicPaymentData from './ElectronicPaymentData';
import Filters from './Filters';
import useStyles from './styles';

const ElectronicPayment = () => {
  const { t } = useTranslation(['common', 'payment']);
  const [paymentData, setPaymentData] = useState<any>([]);
  const classes = useStyles();
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
    const data = ElectronicPaymentData.payload;
    const timeOut = setTimeout(() => {
      setPaymentData(data);
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
      Header: t('payment:transactionId'),
      accessor: 'transaction_id',
      Cell: (data: any) => <>#{data.row.original.transaction_id}</>,
    },
    {
      Header: t('payment:amount'),
      accessor: 'amount',
      Cell: (data: any) => <p className={classes.amount}>{new Intl.NumberFormat().format(data.row.original.amount)}</p>,
    },
    {
      Header: t('payment:prevBalance'),
      accessor: 'prev_balance',
      Cell: (data: any) => (
        <p className={classes.amount}>{new Intl.NumberFormat().format(data.row.original.prev_balance)}</p>
      ),
    },
    {
      Header: t('payment:closingBalance'),
      accessor: 'closing_balance',
      Cell: (data: any) => (
        <p className={classes.amount}>{new Intl.NumberFormat().format(data.row.original.closing_balance)}</p>
      ),
    },
    {
      Header: t('payment:electronicVendor'),
      accessor: 'electronic_vendor',
    },
    {
      Header: t('payment:paymentDate'),
      accessor: 'payment_date',
    },
  ];

  const chartData = {
    labels: ['Cashier', 'Vendor', 'Online'],
    datasets: [
      {
        data: [4500000, 1280000, 322935],
        backgroundColor: ['#F8B06D', '#8DC5C9', '#887CAA'],
        borderWidth: 0,
      },
    ],
  };

  const pieChartOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

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

      <Box paddingY={1.5} paddingX={{ xs: 2, md: 3 }} border={1} borderRadius={8} borderColor="grey.500" mt={2}>
        <Box display={{ xs: 'block', md: 'flex' }} alignItems="center">
          <div className={classes.chart}>
            <Chart type="pie" data={chartData} options={pieChartOptions} width={100} height={100} />
          </div>

          <Box display={{ xs: 'block', md: 'flex' }} flexDirection="column" className={classes.paymentsReceived}>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {t('payment:paymentReceived')}
            </Typography>
            <Typography component="h4" variant="h4" className={classes.amount} color="primary">
              {new Intl.NumberFormat().format(6102935)}
            </Typography>
            <Typography component="p" className={clsx(classes.positiveTrend, classes.paymentTrend)}>
              <ArrowDownIcon />
              20% {t('common:higherThanPrevMonth')}
            </Typography>
          </Box>

          <Box
            display={{ xs: 'block', md: 'flex' }}
            justifyContent="space-between"
            className={classes.paymentBreakdown}
          >
            <Box>
              <p className={clsx(classes.paymentsIndex, classes.type1)}>
                <Typography component="label" variant="body2" color="textSecondary">
                  Electronic Vendor 1
                </Typography>
                <Typography component="span" variant="body2" className={classes.amount}>
                  {new Intl.NumberFormat().format(4500000)}
                </Typography>
              </p>
              <p className={clsx(classes.paymentsIndex, classes.type2)}>
                <Typography component="label" variant="body2" color="textSecondary">
                  Electronic Vendor 2
                </Typography>
                <Typography component="span" variant="body2" className={classes.amount}>
                  {new Intl.NumberFormat().format(1280000)}
                </Typography>
              </p>
              <p className={clsx(classes.paymentsIndex, classes.type2)}>
                <Typography component="label" variant="body2" color="textSecondary">
                  Electronic Vendor 3
                </Typography>
                <Typography component="span" variant="body2" className={classes.amount}>
                  {new Intl.NumberFormat().format(1280000)}
                </Typography>
              </p>
              <p className={clsx(classes.paymentsIndex, classes.type3)}>
                <Typography component="label" variant="body2" color="textSecondary">
                  Electronic Vendor 4
                </Typography>
                <Typography component="span" variant="body2" className={classes.amount}>
                  {new Intl.NumberFormat().format(220000)}
                </Typography>
              </p>
            </Box>

            <Box>
              <p className={clsx(classes.paymentsIndex, classes.type1)}>
                <Typography component="label" variant="body2" color="textSecondary">
                  Electronic Vendor 1
                </Typography>
                <Typography component="span" variant="body2" className={classes.amount}>
                  {new Intl.NumberFormat().format(4500000)}
                </Typography>
              </p>
              <p className={clsx(classes.paymentsIndex, classes.type2)}>
                <Typography component="label" variant="body2" color="textSecondary">
                  Electronic Vendor 2
                </Typography>
                <Typography component="span" variant="body2" className={classes.amount}>
                  {new Intl.NumberFormat().format(1280000)}
                </Typography>
              </p>
              <p className={clsx(classes.paymentsIndex, classes.type2)}>
                <Typography component="label" variant="body2" color="textSecondary">
                  Electronic Vendor 3
                </Typography>
                <Typography component="span" variant="body2" className={classes.amount}>
                  {new Intl.NumberFormat().format(1280000)}
                </Typography>
              </p>
              <p className={clsx(classes.paymentsIndex, classes.type3)}>
                <Typography component="label" variant="body2" color="textSecondary">
                  Electronic Vendor 4
                </Typography>
                <Typography component="span" variant="body2" className={classes.amount}>
                  {new Intl.NumberFormat().format(220000)}
                </Typography>
              </p>
            </Box>

            <Typography color="primary" variant="body2" className={classes.viewTrend}>
              <GraphIcon />
              {t('common:viewTrend')}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Table columns={columns} data={paymentData || []} enableRowSelect />
    </Box>
  );
};
export default ElectronicPayment;
