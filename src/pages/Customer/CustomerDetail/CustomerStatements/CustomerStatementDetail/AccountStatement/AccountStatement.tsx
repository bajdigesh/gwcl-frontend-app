import { Box, Grid, makeStyles } from '@material-ui/core';
import { ArrowDownIcon, GraphIcon } from 'assets/images';
import Chart, { lineChartDefaultOptions } from 'components/Chart';
import { FilterContainer } from 'components/Filters';
import Table from 'components/Table';
import { format } from 'date-fns';
import { MONTH_DAY_YEAR_FORMAT, sortingOrder } from 'global/constants';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import AccountStatementData from './AccountStatementData';
import Filters from './Filters';

const useStatementStyles = makeStyles(theme => ({
  statementInfo: {
    border: `1px solid ${theme.palette.grey['500']}`,
    borderRadius: theme.spacing(1),
    marginBottom: theme.spacing(2),
    '& .gwcl-MuiGrid-item': {
      position: 'relative',
      '&:not': {
        '&(:first-of-type)': {
          '&:after': {
            position: 'absolute',
            top: 16,
            left: 0,
            width: 1,
            height: 'calc(100% - 32px)',
            content: `''`,
            background: theme.palette.grey['500'],
          },
        },
      },
    },
    '& h5': {
      color: theme.palette.grey['700'],
      fontWeight: 500,
    },
    '& h3': {
      margin: `${theme.spacing(1)}px 0`,
      color: theme.palette.grey['900'],
      fontSize: theme.typography.pxToRem(20),
      fontWeight: 500,
    },
    '& span': {
      color: theme.palette.grey['900'],
      fontSize: theme.typography.pxToRem(12),
      '& svg': {
        marginRight: 4,
        '& path': {
          fill: 'currentColor',
        },
      },
    },
  },
  positiveReturn: {
    color: `${theme.palette.success.main} !important`,
    '& svg': {
      transform: 'rotate(180deg)',
    },
  },
  negativeReturn: {
    color: `${theme.palette.error.main} !important`,
  },
  amount: {
    '&:before': {
      content: `'$'`,
    },
  },
  trendGrpahToggle: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    '& > svg': {
      marginRight: theme.spacing(1),
    },
  },
  lineChart: {
    overflowX: 'auto',
    '& .chart-container': {
      position: 'relative',
      minWidth: '750px',
      height: 'auto',
    },
  },
}));

const AccountStatement = () => {
  const { t } = useTranslation(['common', 'customers']);
  const styles = useStatementStyles();
  const [statementData, setStatementData] = useState<any>([]);
  const [viewTrend, setViewTrend] = useState(false);

  const [filterSchema, setFilterSchema] = useState<any>({
    page: 1,
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
  const handleSortingMenuChange = (e: any) => {
    console.log(e.target.value);
  };

  useEffect(() => {
    const data = AccountStatementData.payload;
    const dataTimeOut = setTimeout(() => {
      setStatementData(data);
    }, 1000);
    return () => clearTimeout(dataTimeOut);
  }, []);

  const columns = [
    {
      Header: t('customers:date'),
      accessor: 'date',
      Cell: (data: any) => <>{format(new Date(data.value), MONTH_DAY_YEAR_FORMAT)}</>,
    },
    {
      Header: t('customers:type'),
      accessor: 'type',
    },
    {
      Header: t('customers:transaction'),
      accessor: 'transaction',
    },
    {
      Header: t('customers:reference'),
      accessor: 'reference',
    },
    {
      Header: t('customers:debit'),
      accessor: 'debit',
      Cell: (data: any) => <span className={styles.amount}>{data.row.original.debit}</span>,
    },
    {
      Header: t('customers:credit'),
      accessor: 'credit',
      Cell: (data: any) => (
        <>{data.row.original.credit && <span className={styles.amount}>{data.row.original.credit}</span>}</>
      ),
    },
    {
      Header: t('customers:balance'),
      accessor: 'balance',
      Cell: (data: any) => <span className={styles.amount}>{data.row.original.balance}</span>,
    },
  ];

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Debit',
        fill: false,
        backgroundColor: '#EBA900',
        borderColor: '#EBA900',
        data: [65, 59, 80, 81, 56, 55, 40, 60, 55, 30, 78, ,],
      },
      {
        label: 'Credit',
        fill: false,
        backgroundColor: '#34A489',
        borderColor: '#34A489',
        data: [10, 20, 60, 95, 64, 78, 90, 70, 40, 70, 89, 25],
      },

      {
        label: 'Total Balance',
        fill: false,
        backgroundColor: '#0D4CA0',
        borderColor: '#0D4CA0',
        data: [60, 90, 10, 20, 70, 40, 70, 89, 95, 64, 78, 10],
      },
    ],
  };

  return (
    <>
      <Box p={3} mt={2}>
        <Grid container spacing={6} className={styles.statementInfo}>
          <Grid item xl="auto" lg="auto" md="auto" sm={6} xs={12}>
            <h5>{t('customers:totalBalanceDue')}</h5>
            <h3>$22,935</h3>
            <span>on Dec 22, 2020</span>
          </Grid>
          <Grid item xl="auto" lg="auto" md="auto" sm={6} xs={12}>
            <h5>{t('customers:debitTotal')}</h5>
            <h3>$22,935</h3>
            <span className={styles.positiveReturn}>
              <ArrowDownIcon />
              20% {t('common:higherThanPrevMonth')}
            </span>
          </Grid>
          <Grid item xl={8} lg={8} md={8} sm={12} xs={12}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <div>
                <h5>{t('customers:creditTotal')}</h5>
                <h3>$22,935</h3>
                <span className={styles.negativeReturn}>
                  <ArrowDownIcon />
                  20% {t('common:lowerThanPrevMonth')}
                </span>
              </div>
              <Link to="#" onClick={() => setViewTrend(!viewTrend)} className={styles.trendGrpahToggle}>
                <GraphIcon />
                {viewTrend ? t('common:hideTrend') : t('common:viewTrend')}
              </Link>
            </Box>
          </Grid>
          {viewTrend && (
            <Grid item xl={12} lg={12} sm={12} xs={12}>
              <div className={styles.lineChart}>
                <Chart type="line" data={chartData} width={100} height={20} options={lineChartDefaultOptions} />
              </div>
            </Grid>
          )}
        </Grid>
      </Box>

      <FilterContainer>
        <Filters
          sortedOrder={filterSchema.order!}
          handleSearchInputChange={handleSearchInputChange}
          handleFilterFormSubmit={handleFilterFormSubmit}
          handleSortingMenuChange={handleSortingMenuChange}
        />
      </FilterContainer>

      <Table columns={columns} data={statementData} />
    </>
  );
};

export default AccountStatement;
