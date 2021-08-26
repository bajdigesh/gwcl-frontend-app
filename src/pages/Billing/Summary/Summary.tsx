import { Box, Grid } from '@material-ui/core';
import { ChevronRight, FlagIcon, SearchIcon } from 'assets/images';
import clsx from 'clsx';
import Chart, { lineChartDefaultOptions } from 'components/Chart';
import { FilterContainer } from 'components/Filters';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Filters from './Filters';
import useStyles from './styles';

const Summary = () => {
  const { t } = useTranslation(['common', 'billing']);
  const classes = useStyles();
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Revenue',
        fill: false,
        backgroundColor: '#0D4CA0',
        borderColor: '#0D4CA0',
        data: [99, 45, 26, 23, 90, 9, 40, 18, 9, 33, 31, 85],
      },
      {
        label: 'Customers',
        fill: false,
        backgroundColor: '#1D9D48',
        borderColor: '#1D9D48',
        data: [72, 86, 43, 85, 67, 89, 49, 40, 63, 33, 84, 96],
      },
      {
        label: 'Water Consumption',
        fill: false,
        backgroundColor: '#C7A676',
        borderColor: '#C7A676',
        data: [12, 85, 14, 88, 48, 86, 79, 63, 26, 95, 22, 25],
      },
      {
        label: 'Arrears',
        fill: false,
        backgroundColor: '#FB6060',
        borderColor: '#FB6060',
        data: [52, 37, 39, 15, 60, 95, 3, 77, 38, 32, 100, 81],
      },
    ],
  };

  const handleSearchInputChange = (e: any) => {
    console.log(e.target.value);
  };
  const handleFilterFormSubmit = (e: any) => {
    console.log(e.target.value);
  };
  const handleSortingMenuChange = (e: any) => {
    console.log(e.target.value);
  };
  return (
    <>
      <Box mb={2}>
        <FilterContainer>
          <Filters
            handleSearchInputChange={handleSearchInputChange}
            handleFilterFormSubmit={handleFilterFormSubmit}
            handleSortingMenuChange={handleSortingMenuChange}
          />
        </FilterContainer>
      </Box>

      <Grid container spacing={2}>
        <Grid item xl={8} lg={8} md={12} sm={12} xs={12}>
          <Box p={{ xs: 2, md: 3 }} borderRadius={8} border={1} borderColor="grey.500">
            <form className={classes.searchForm}>
              <SearchIcon />
              <input type="text" placeholder={t('common:searchPlaceholder')} />
            </form>

            <Box mt={{ xs: 2, md: 4 }} display={{ xs: 'block', md: 'flex' }} justifyContent="space-between">
              <div className={classes.summaryTotal}>
                <h5 className={classes.summaryHeaders}>{t('billing:totalWaterUsage')}</h5>
                <h4 className={classes.summaryFigures}>{new Intl.NumberFormat().format(102938.65)}</h4>
                <p>
                  <label>{t('billing:workingMeter')}</label>
                  <span>{new Intl.NumberFormat().format(100932.65)}</span>
                </p>
                <p>
                  <label>{t('billing:faultyMeter')}</label>
                  <span>{new Intl.NumberFormat().format(1980)}</span>
                </p>
                <p>
                  <label>{t('billing:noMeter')}</label>
                  <span>{new Intl.NumberFormat().format(22)}</span>
                </p>
              </div>

              <div className={classes.summaryTotal}>
                <h5 className={classes.summaryHeaders}>{t('billing:totalBilledCustomers')}</h5>
                <h4 className={classes.summaryFigures}>
                  {new Intl.NumberFormat().format(9293)}
                  <span>{new Intl.NumberFormat().format(9421)}</span>
                </h4>
                <p>
                  <label>{t('billing:workingMeter')}</label>
                  <span>{new Intl.NumberFormat().format(100932.65)}</span>
                </p>
                <p>
                  <label>{t('billing:faultyMeter')}</label>
                  <span>{new Intl.NumberFormat().format(1980)}</span>
                </p>
                <p>
                  <label>{t('billing:noMeter')}</label>
                  <span>{new Intl.NumberFormat().format(22)}</span>
                </p>
              </div>

              <div className={classes.summaryTotal}>
                <h5 className={classes.summaryHeaders}>{t('billing:totalRevenue')}</h5>
                <h4 className={clsx(classes.summaryFigures, classes.amount)}>
                  {new Intl.NumberFormat().format(20000)}
                </h4>
                <p>
                  <label>{t('billing:workingMeter')}</label>
                  <span>{new Intl.NumberFormat().format(100932.65)}</span>
                </p>
                <p>
                  <label>{t('billing:faultyMeter')}</label>
                  <span>{new Intl.NumberFormat().format(1980)}</span>
                </p>
                <p>
                  <label>{t('billing:noMeter')}</label>
                  <span>{new Intl.NumberFormat().format(22)}</span>
                </p>
              </div>
            </Box>
          </Box>
        </Grid>

        <Grid item xl={4} lg={4} md={12} sm={12} xs={12}>
          <Box display="flex" flexDirection="column" justifyContent="space-between" height="100%">
            <Box
              px={{ xs: 2, md: 3.5 }}
              py={{ xs: 2, md: 5.75 }}
              display="flex"
              alignItems="center"
              borderRadius={8}
              className={classes.billingExceptions}
              flex={1}
              mb={2}
            >
              <FlagIcon />
              <h5>47 {t('billing:billingExceptionsFound')}</h5>
              <Link to="/billing/generate-bill">
                {t('common:checkNow')} <ChevronRight />
              </Link>
            </Box>

            <Box display="grid" gridGap={16} gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }}>
              <Box p={{ xs: 3, md: 3.5 }} borderRadius={8} border={1} borderColor="grey.500">
                <h5 className={classes.summaryHeaders}>{t('billing:unbilledCustomers')}</h5>
                <h4 className={classes.summaryFigures}>
                  {new Intl.NumberFormat().format(128)}
                  <span>{new Intl.NumberFormat().format(9421)}</span>
                </h4>
              </Box>
              <Box p={{ xs: 3, md: 3.5 }} borderRadius={8} border={1} borderColor="grey.500">
                <h5 className={classes.summaryHeaders}>{t('common:arrears')}</h5>
                <h4 className={clsx(classes.summaryFigures, classes.amount)}>{new Intl.NumberFormat().format(8384)}</h4>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={2} style={{ marginTop: 8 }}>
        <Grid item xl={10} lg={10} md={12} sm={12} xs={12}>
          <Box border={1} borderColor="grey.500" borderRadius={8} p={{ xs: 2, md: 3 }} className={classes.lineChart}>
            <Chart
              type="line"
              customLegend
              data={chartData}
              width={100}
              height={30}
              options={lineChartDefaultOptions}
            />
          </Box>
        </Grid>

        <Grid item xl={2} lg={2} md={12} sm={12} xs={12}>
          <Box
            border={1}
            borderColor="grey.500"
            borderRadius={8}
            p={{ xs: 2, md: 3 }}
            className={classes.highestRevenueSummary}
          >
            <h4>{t('common:highestRevenue')}</h4>
            <div>
              <h4>
                {t('common:region')}: {t('common:regionName')}
              </h4>
              <p className={classes.amount}>{new Intl.NumberFormat().format(2000)}</p>
              <Link to="./#">{t('common:viewDetails')}</Link>
            </div>
            <div>
              <h4>
                {t('common:district')}: {t('common:districtName')}
              </h4>
              <p className={classes.amount}>{new Intl.NumberFormat().format(2000)}</p>
              <Link to="./#">{t('common:viewDetails')}</Link>
            </div>
            <div>
              <h4>
                {t('common:route')}: {t('common:routeName')}
              </h4>
              <p className={classes.amount}>{new Intl.NumberFormat().format(2000)}</p>
              <Link to="./#">{t('common:viewDetails')}</Link>
            </div>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Summary;
