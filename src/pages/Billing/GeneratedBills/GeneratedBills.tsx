import { Box, Grid, Hidden, Tooltip, Typography } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import { ArrowDownIcon, BillingOutlineIcon, DownloadIcon1, SearchIcon, VerifiedIcon, WarningIcon } from 'assets/images';
import clsx from 'clsx';
import Button from 'components/Button';
import { ControllableDrawer } from 'components/Drawer';
import { FilterContainer } from 'components/Filters';
import Table, { IndeterminateCheckbox, TablePagination } from 'components/Table';
import { sortingOrder } from 'global/constants';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useDrawerToggle } from 'utils/hooks';
import Filters from './Filters';
import GeneratedBillsData from './GeneratedBillsData';
import SearchForm from './SearchForm';
import useStyles from './styles';

const GeneratedBills = () => {
  const { t } = useTranslation(['common', 'billing']);
  const classes = useStyles();
  const { openDrawer, toggleDrawer } = useDrawerToggle();
  const [generatedBillsData, setGeneratedBillsData] = useState<any>([]);
  const [showBills, setShowBills] = useState(false);

  useEffect(() => {
    const data = GeneratedBillsData.payload;
    const timeOut = setTimeout(() => {
      setGeneratedBillsData(data);
    }, 1000);
    return () => {
      clearTimeout(timeOut);
    };
  }, []);

  const onHandleShowBills = (e: any) => {
    e.preventDefault();
    setShowBills(!showBills);
  };

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
      Header: t('common:account'),
      accessor: 'account_name',
      Cell: (data: any) => (
        <>
          <Typography variant="body2" color="primary" component="p">
            {data.row.original.account_name}
          </Typography>
          <Typography component="span" variant="subtitle2">
            {data.row.original.account_number}
          </Typography>
        </>
      ),
    },
    {
      Header: t('common:meterNumber'),
      accessor: 'meter_number',
      Cell: (data: any) => (
        <Typography color="primary" component="p" variant="body2">
          {data.row.original.meter_number}
        </Typography>
      ),
    },
    {
      Header: t('common:billMonth'),
      accessor: 'bill_month',
    },
    {
      Header: t('common:billAmount'),
      accessor: 'bill_amount',
      Cell: (data: any) => <span className={classes.amount}>{data.row.original.bill_amount}</span>,
    },
    {
      Header: t('billing:deliveredVia'),
      accessor: 'delivered_via',
    },
    {
      Header: t('common:meterStatus'),
      accessor: 'is_working',
      Cell: (data: any) =>
        data.row.original.is_working ? (
          <Box className={classes.statusInfo} display="flex" alignItems="center" color="success.main">
            <VerifiedIcon />
            {t('common:working')}
          </Box>
        ) : (
          <Box className={classes.statusInfo} display="flex" alignItems="center" color="error.main">
            <WarningIcon />
            {t('common:faulty')}
          </Box>
        ),
    },
    {
      Header: '',
      accessor: 'account_number',
      Cell: (data: any) => (
        <Box display="flex" className={clsx('actionButtons', classes.actionButtons)}>
          <p onClick={() => handleInvoice(data.row.original.account_number)}>
            <Tooltip title={t('billing:invoice')} arrow>
              <BillingOutlineIcon />
            </Tooltip>
          </p>
          <p onClick={() => handleDownload(data.row.original.account_number)}>
            <Tooltip title={t('common:download')} arrow>
              <DownloadIcon1 />
            </Tooltip>
          </p>
        </Box>
      ),
    },
  ];

  const generatedBillsTablePagination = GeneratedBillsData.meta_data[0].pagination;
  const handleChangePage = () => {};
  const handleChangeRowsPerPage = () => {};

  const handleDownload = (id: any) => {};
  const handleInvoice = (id: any) => {};

  const handleSearchInputChange = (e: any) => {
    console.log(console.log(e));
  };
  const handleFilterFormSubmit = (e: any) => {
    e.preventDefault();
  };

  const handleSortingMenuChange = (data: IAutoCompleteOption) => {
    console.log(data);
  };

  return (
    <>
      <Hidden smDown>
        <SearchForm />
      </Hidden>
      <Hidden mdUp>
        <ControllableDrawer
          toggleElement={handleToggle => (
            <Button
              color="inherit"
              disableElevation
              onClick={handleToggle}
              className={classes.filterDrawerToggleButton}
              startIcon={<SearchIcon />}
            >
              {t('common:search')}
            </Button>
          )}
        >
          {() => <SearchForm />}
        </ControllableDrawer>
      </Hidden>
      <Grid container spacing={3} className={classes.billingSummary}>
        {/* TOTAL BILLED CUSTOMERS */}
        <Grid item xl={3} lg={3} md={3} sm={6} xs={12}>
          <Box borderRadius={8} border={1} borderColor="grey.500" p={{ xs: 2, md: 3 }} mt={2}>
            <h5>{t('billing:totalBilledCustomers')}</h5>
            <h3>{new Intl.NumberFormat().format(9293)}</h3>
            <p>
              <label>{t('billing:workingMeter')}</label>
              <span>{new Intl.NumberFormat().format(9246)}</span>
            </p>
            <p>
              <label>{t('billing:faultyMeter')}</label>
              <span>{new Intl.NumberFormat().format(36)}</span>
            </p>
            <p>
              <label>{t('billing:noMeter')}</label>
              <span>{new Intl.NumberFormat().format(11)}</span>
            </p>
          </Box>
        </Grid>

        {/* TOTAL WATER USAGE */}
        <Grid item xl={3} lg={3} md={3} sm={6} xs={12}>
          <Box borderRadius={8} border={1} borderColor="grey.500" p={{ xs: 2, md: 3 }} mt={2}>
            <h5>{t('billing:totalWaterUsage')}</h5>
            <h3>{new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(102938.65)}</h3>
            <p>
              <label>{t('billing:workingMeter')}</label>
              <span>{new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(102938.65)}</span>
            </p>
            <p>
              <label>{t('billing:faultyMeter')}</label>
              <span>{new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(1980)}</span>
            </p>
            <p>
              <label>{t('billing:noMeter')}</label>
              <span>{new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(22)}</span>
            </p>
          </Box>
        </Grid>

        {/* TOTAL REVENUE */}
        <Grid item xl={3} lg={3} md={3} sm={6} xs={12}>
          <Box borderRadius={8} border={1} borderColor="grey.500" p={{ xs: 2, md: 3 }} mt={2}>
            <h5>{t('billing:totalRevenue')}</h5>
            <h3 className={classes.amount}>
              {new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(102938.65)}
            </h3>
            <p>
              <label>{t('billing:workingMeter')}</label>
              <span>{new Intl.NumberFormat().format(102938.65)}</span>
            </p>
            <p>
              <label>{t('billing:faultyMeter')}</label>
              <span>{new Intl.NumberFormat().format(1980)}</span>
            </p>
            <p>
              <label>{t('billing:noMeter')}</label>
              <span>{new Intl.NumberFormat().format(22)}</span>
            </p>
          </Box>
        </Grid>

        {/* TOTAL INVOICES SENT */}
        <Grid item xl={3} lg={3} md={3} sm={6} xs={12}>
          <Box borderRadius={8} border={1} borderColor="grey.500" p={{ xs: 2, md: 3 }} mt={2}>
            <h5>{t('billing:toalInvoicesSent')}</h5>
            <h3>{new Intl.NumberFormat().format(9246)}</h3>
            <p>
              <label>{t('common:sms')}</label>
              <span>{new Intl.NumberFormat().format(9028)}</span>
            </p>
            <p>
              <label>{t('common:email')}</label>
              <span>{new Intl.NumberFormat().format(9028)}</span>
            </p>
            <p>
              <label>{t('billing:hardcopy')}</label>
              <span>{new Intl.NumberFormat().format(9002)}</span>
            </p>
          </Box>
        </Grid>

        {/* TOTAL ARREARS */}
        <Grid item xl={3} lg={3} md={3} sm={6} xs={12}>
          <Box
            className={classes.arrerarsSummary}
            borderRadius={8}
            border={1}
            borderColor="grey.500"
            p={{ xs: 2, md: 3 }}
          >
            <h5>{t('billing:totalArrears')}</h5>
            <h3>{new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(102938.65)}</h3>
          </Box>
        </Grid>

        {/* INVOICES DELIVERED */}
        <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
          <Box
            display={{ xs: 'block', md: 'flex' }}
            borderRadius={8}
            border={1}
            borderColor="grey.500"
            p={{ xs: 2, md: 3 }}
          >
            <div className={classes.deliveredInvoiceRecords}>
              <h5>{t('billing:smsDelivered')}</h5>
              <LinearProgress color="secondary" variant="determinate" value={75} />
              <h4>
                {new Intl.NumberFormat().format(9000)}
                <span>{new Intl.NumberFormat().format(9028)}</span>
              </h4>
            </div>
            <div className={classes.deliveredInvoiceRecords}>
              <h5>{t('billing:emailDelivered')}</h5>
              <LinearProgress color="secondary" variant="determinate" value={75} />
              <h4>
                {new Intl.NumberFormat().format(9000)}
                <span>{new Intl.NumberFormat().format(9028)}</span>
              </h4>
            </div>
            <div className={classes.deliveredInvoiceRecords}>
              <h5>{t('billing:hardCopiesDelivered')}</h5>
              <LinearProgress color="secondary" variant="determinate" value={75} />
              <h4>
                {new Intl.NumberFormat().format(9000)}
                <span>{new Intl.NumberFormat().format(9028)}</span>
              </h4>
            </div>
          </Box>
        </Grid>

        {/* VIEW ALL BILLS */}
        <Grid item xl={3} lg={3} md={3} sm={6} xs={12}>
          <Box
            display="flex"
            borderRadius={8}
            alignItems="center"
            justifyContent="center"
            className={classes.viewAllButton}
          >
            <Link to="./#" onClick={onHandleShowBills}>
              {showBills ? t('common:show') : t('common:view')} {t('common:all')} {new Intl.NumberFormat().format(9028)}{' '}
              {t('common:bills')}
              <ArrowDownIcon className={clsx(classes.arrowIcon, { [classes.hideRecords]: showBills })} />
            </Link>
          </Box>
        </Grid>
      </Grid>
      {showBills && (
        <Box mt={{ sm: 2, md: 4 }} className={classes.resultsLists}>
          <h3>
            Showing {new Intl.NumberFormat().format(1284)} Results for <span>'South East Region'</span>
          </h3>

          <FilterContainer>
            <Filters
              sortedOrder={sortingOrder.ASCENDING}
              handleSearchInputChange={handleSearchInputChange}
              handleFilterFormSubmit={handleFilterFormSubmit}
              handleSortingMenuChange={handleSortingMenuChange}
            />
          </FilterContainer>
          <Box mt={{ sm: 2, md: 4 }}>
            <Table
              columns={columns}
              data={generatedBillsData}
              enableRowSelect
              rowsPerPage={generatedBillsTablePagination?.per_page || 10}
              hoverableRow
              renderPagination={() => (
                <TablePagination
                  paginationData={generatedBillsTablePagination}
                  handleChangePage={handleChangePage}
                  handleChangeRowsPerPage={handleChangeRowsPerPage}
                />
              )}
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default GeneratedBills;
