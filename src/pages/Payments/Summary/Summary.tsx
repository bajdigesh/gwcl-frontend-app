import { Box, Grid, useMediaQuery, useTheme } from '@material-ui/core';
import { InfoIcon, SearchIcon } from 'assets/images';
import clsx from 'clsx';
import Chart, {
  configureTooltipPosition,
  createTooltipElement,
  stackedBarChartDefaultOption,
  toggleTooltip,
} from 'components/Chart';
import { FilterContainer } from 'components/Filters';
import { FormikControl } from 'components/Form';
import { Form, Formik } from 'formik';
import { CUSTOM_CHART_JS_CLASS, LEGEND_CONTAINER_ID } from 'global/constants';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { formatNumberInDollar } from 'utils';
import { chartFilterInitialData } from '../shared/schema';
import Filters from './Filters';
import useStyles from './styles';

const BarChartOptions = {
  ...stackedBarChartDefaultOption,
  barThickness: 40,
  plugins: {
    legend: {
      display: false,
    },
    htmlLegend: {
      // ID of the container to put the legend in
      containerID: LEGEND_CONTAINER_ID,
    },
    tooltip: {
      callbacks: {
        label: function (context: any) {
          let label = context.dataset.label || '';

          if (label) {
            label += ': ';
          }
          if (context.parsed.y !== null) {
            label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
          }
          return label;
        },
      },
      enabled: false,
      external: function (context: any) {
        const tooltipEl = createTooltipElement('tooltip-bar');
        const tooltipModel = context.tooltip;
        toggleTooltip(tooltipModel, tooltipEl);

        // Set Tooltip Actual Content
        if (tooltipModel.body) {
          const bodyLines = tooltipModel.body.map((bodyItem: any) => bodyItem.lines);
          const paymentsReceieved = formatNumberInDollar(tooltipModel.dataPoints[0].dataset.data[0].paymentsReceived);
          const label = tooltipModel.dataPoints[0].label;
          const tooltipRoot = tooltipEl.querySelector(`.${CUSTOM_CHART_JS_CLASS}`)!;

          let innerHtml = `<div class="tooltip-title"><h6>Payment Received</h6></div><div class="tooltip-body"><div class="tooltip-body__top"><span class="value">${paymentsReceieved}</span><span class="label">for ${label}, 2021</span></div><p class='percentage'>20% higher than previous month</p><div class="tooltip-body__bottom">`;

          bodyLines.forEach(function (body: any, i: any) {
            innerHtml += `<div>${body}</div>`;
          });
          innerHtml += '</div></div>';

          tooltipRoot.innerHTML = innerHtml;
        }

        configureTooltipPosition(context, tooltipEl, 20);
      },
    },
  },
};

const Summary = () => {
  const { t } = useTranslation(['common', 'payment']);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();
  const handleSearchInputChange = (e: any) => {
    console.log(console.log(e));
  };
  const handleFilterFormSubmit = (e: any) => {
    e.preventDefault();
  };

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

  const data = {
    labels: ['MAR', 'APR', 'JUN', 'JUL', 'AUG', 'SEP'],
    datasets: [
      {
        label: 'Cashier',
        data: [
          { x: 'MAR', y: 4500000, year: 2021, paymentsReceived: 23928, growthPerMonth: 20 },
          { x: 'APR', y: 4500000, year: 2021, paymentsReceived: 23928, growthPerMonth: 20 },
          { x: 'JUN', y: 4500000, year: 2021, paymentsReceived: 23928, growthPerMonth: 20 },
          { x: 'JUL', y: 4500000, year: 2021, paymentsReceived: 23928, growthPerMonth: 20 },
          { x: 'AUG', y: 4500000, year: 2021, paymentsReceived: 23928, growthPerMonth: 20 },
          { x: 'SEP', y: 4500000, year: 2021, paymentsReceived: 23928, growthPerMonth: 20 },
        ],
        backgroundColor: '#F8B06D',
        stack: 'Stack 0',
      },
      {
        label: '3rd Party Vendor',
        data: [
          { x: 'MAR', y: 870000, year: 2021, paymentsReceived: 23928, growthPerMonth: 20 },
          { x: 'APR', y: 400000, year: 2021, paymentsReceived: 23928, growthPerMonth: 20 },
          { x: 'JUN', y: 40000, year: 2021, paymentsReceived: 23928, growthPerMonth: 20 },
          { x: 'JUL', y: 4540000, year: 2021, paymentsReceived: 23928, growthPerMonth: 20 },
          { x: 'AUG', y: 9090000, year: 2021, paymentsReceived: 23928, growthPerMonth: 20 },
          { x: 'SEP', y: 4540000, year: 2021, paymentsReceived: 23928, growthPerMonth: 20 },
        ],
        backgroundColor: '#887CAA',
        stack: 'Stack 0',
      },
      {
        label: 'Online',
        data: [
          { x: 'MAR', y: 1230000, year: 2021, paymentsReceived: 23928, growthPerMonth: 20 },
          { x: 'APR', y: 5500000, year: 2021, paymentsReceived: 23928, growthPerMonth: 20 },
          { x: 'JUN', y: 400000, year: 2021, paymentsReceived: 23928, growthPerMonth: 20 },
          { x: 'JUL', y: 9000000, year: 2021, paymentsReceived: 23928, growthPerMonth: 20 },
          { x: 'AUG', y: 7800000, year: 2021, paymentsReceived: 23928, growthPerMonth: 20 },
          { x: 'SEP', y: 500000, year: 2021, paymentsReceived: 23928, growthPerMonth: 20 },
        ],
        backgroundColor: '#8CC5C9',
        stack: 'Stack 0',
      },
      {
        label: 'Arrears',
        data: [
          { x: 'MAR', y: 780000, year: 2021, paymentsReceived: 23928, growthPerMonth: 20 },
          { x: 'APR', y: 3089000, year: 2021, paymentsReceived: 23928, growthPerMonth: 20 },
          { x: 'JUN', y: 40000, year: 2021, paymentsReceived: 23928, growthPerMonth: 20 },
          { x: 'JUL', y: 200000, year: 2021, paymentsReceived: 23928, growthPerMonth: 20 },
          { x: 'AUG', y: 900000, year: 2021, paymentsReceived: 23928, growthPerMonth: 20 },
          { x: 'SEP', y: 5400000, year: 2021, paymentsReceived: 23928, growthPerMonth: 20 },
        ],
        backgroundColor: '#FB6060',
        stack: 'Stack 1',
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

  const handleFormSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <>
      <FilterContainer>
        <Filters handleSearchInputChange={handleSearchInputChange} handleFilterFormSubmit={handleFilterFormSubmit} />
      </FilterContainer>

      <Grid container spacing={3}>
        <Grid item xl={9} lg={9} md={9} sm={12} xs={12}>
          <Box borderRadius={8} border={1} borderColor="grey.500" p={{ xs: 2, md: 3 }} marginTop={{ xs: 2, md: 3 }}>
            <form className={classes.searchForm}>
              <SearchIcon />
              <input type="text" placeholder={t('payment:searchPlaceholder')} />
            </form>

            <Box
              className={classes.paymentSummary}
              display={{ xs: 'block', md: 'grid' }}
              gridGap={{ xs: 16, md: 24 }}
              gridTemplateColumns="repeat(auto-fit, minmax(120px, 1fr))"
              marginTop={{ xs: 2, md: 4 }}
            >
              <div className={classes.chart}>
                <Chart type="pie" data={chartData} options={pieChartOptions} width={100} height={100} />
              </div>

              <Box display="flex" flexDirection="column" className={classes.paymentsReceived}>
                <p>{t('payment:paymentReceived')}</p>
                <h2 className={classes.amount}>{new Intl.NumberFormat().format(6102935)}</h2>
                <Box display="flex" flexWrap="wrap" className={clsx(classes.paymentsIndex, classes.cashier)}>
                  <label>{t('payment:cashier')}</label>
                  <span className={classes.amount}>{new Intl.NumberFormat().format(4500000)}</span>
                </Box>
                <Box display="flex" flexWrap="wrap" className={clsx(classes.paymentsIndex, classes.vendor)}>
                  <label>{t('payment:vendor')}</label>
                  <span className={classes.amount}>{new Intl.NumberFormat().format(1280000)}</span>
                </Box>
                <Box display="flex" flexWrap="wrap" className={clsx(classes.paymentsIndex, classes.online)}>
                  <label>{t('payment:online')}</label>
                  <span className={classes.amount}>{new Intl.NumberFormat().format(322935)}</span>
                </Box>
              </Box>

              <Box display="flex" flexDirection="column" marginTop={{ xs: 2, md: 0 }} className={classes.totalArrears}>
                <p>{t('payment:totalArrears')}</p>
                <h2 className={classes.amount}>{new Intl.NumberFormat().format(20000)}</h2>
                <Box display="flex" alignItems="center">
                  {t('payment:collectionRatio')} <InfoIcon />
                </Box>
                <h2>0.92</h2>
              </Box>

              <Box
                display="flex"
                flexDirection="column"
                marginTop={{ xs: 2, md: 0 }}
                className={classes.totalBilledAmount}
              >
                <p>{t('payment:totalBilledAmount')}</p>
                <h2 className={classes.amount}>{new Intl.NumberFormat().format(642000)}</h2>
                <Box display="flex" alignItems="center">
                  {t('payment:adjustedCollectionRatio')} <InfoIcon />
                </Box>
                <h2>0.92</h2>
              </Box>
            </Box>
          </Box>

          <Box
            borderRadius={8}
            border={1}
            borderColor="grey.500"
            p={{ xs: 2, md: 3 }}
            marginTop={{ xs: 2, md: 3 }}
            position="relative"
          >
            <Formik
              enableReinitialize
              initialValues={chartFilterInitialData}
              onSubmit={values => {
                handleFormSubmit(values);
              }}
            >
              {({ setFieldValue, values }) => (
                <Form>
                  <Box display="flex" justifyContent="flex-end" className={classes.filterChart}>
                    <FormikControl
                      control="datepicker"
                      name="startDate"
                      label={t('common:addedBetween')}
                      startdate={values.startDate}
                      enddate={values.endDate}
                      datePickerProps={{
                        startDate: values.startDate,
                        endDate: values.endDate,
                        onChange: (dates: any) => {
                          if (dates) {
                            setFieldValue('startDate', dates[0]);
                            setFieldValue('endDate', dates[1]);
                          } else {
                            setFieldValue('startDate', null);
                            setFieldValue('endDate', null);
                          }
                        },
                        monthsShown: matches ? 1 : 2,
                        selectsRange: true,
                        shouldCloseOnSelect: false,
                      }}
                    />
                  </Box>
                </Form>
              )}
            </Formik>
            <div className={classes.barChart}>
              <Chart customLegend type="bar" data={data} options={BarChartOptions} />
            </div>
          </Box>
        </Grid>

        <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
          <Box
            className={classes.highestRecords}
            borderRadius={8}
            border={1}
            borderColor="grey.500"
            p={{ xs: 2, md: 3 }}
            marginTop={{ xs: 2, md: 3 }}
          >
            <h4>{t('payment:highestPayments')}</h4>
            <Box display="grid" gridGap={8}>
              <p>
                <label>{t('common:region')}</label>
                <span>Region Name</span>
              </p>
              <span className={classes.amount}>{new Intl.NumberFormat().format(2000)}</span>
              <Link to="./#">{t('common:viewDetails')}</Link>
            </Box>

            <Box display="grid" gridGap={8}>
              <p>
                <label>{t('common:district')}</label>
                <span>District Name</span>
              </p>
              <span className={classes.amount}>{new Intl.NumberFormat().format(2000)}</span>
              <Link to="./#">{t('common:viewDetails')}</Link>
            </Box>

            <Box display="grid" gridGap={8}>
              <p>
                <label>{t('common:route')}</label>
                <span>Route Name</span>
              </p>
              <span className={classes.amount}>{new Intl.NumberFormat().format(2000)}</span>
              <Link to="./#">{t('common:viewDetails')}</Link>
            </Box>
          </Box>

          <Box
            className={classes.highestRecords}
            borderRadius={8}
            border={1}
            borderColor="grey.500"
            p={{ xs: 2, md: 3 }}
            marginTop={{ xs: 2, md: 3 }}
          >
            <h4>{t('payment:highestArrears')}</h4>
            <Box display="grid" gridGap={8}>
              <p>
                <label>{t('common:region')}</label>
                <span>Region Name</span>
              </p>
              <span className={classes.amount}>{new Intl.NumberFormat().format(2000)}</span>
              <Link to="./#">{t('common:viewDetails')}</Link>
            </Box>

            <Box display="grid" gridGap={8}>
              <p>
                <label>{t('common:district')}</label>
                <span>District Name</span>
              </p>
              <span className={classes.amount}>{new Intl.NumberFormat().format(2000)}</span>
              <Link to="./#">{t('common:viewDetails')}</Link>
            </Box>

            <Box display="grid" gridGap={8}>
              <p>
                <label>{t('common:route')}</label>
                <span>Route Name</span>
              </p>
              <span className={classes.amount}>{new Intl.NumberFormat().format(2000)}</span>
              <Link to="./#">{t('common:viewDetails')}</Link>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Summary;
