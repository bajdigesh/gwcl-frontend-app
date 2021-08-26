import { Box, Typography } from '@material-ui/core';
import { GraphIcon } from 'assets/images';
import Button from 'components/Button';
import Chart, { stackedBarChartDefaultOption } from 'components/Chart';
import { FormikControl } from 'components/Form';
import { Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import useStyles from './style';

const BarChart = () => {
  const classes = useStyles();
  const { t } = useTranslation(['common', 'payment']);
  const data = {
    labels: ['MAR', 'APR', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
    datasets: [
      {
        label: 'Government',
        data: [12, 19, 3, 5, 2, 3, 5, 6, 1],
        backgroundColor: '#F8B06D',
        stack: 'Stack 0',
      },
      {
        label: 'Domestic',
        data: [2, 3, 20, 5, 1, 4, 3, 8, 10],
        backgroundColor: '#8C7EB5',
        stack: 'Stack 0',
      },
      {
        label: 'Commercial',
        data: [4, 8, 4, 1, 12, 20, 3, 11, 1],
        backgroundColor: '#4D6BA5',
        stack: 'Stack 0',
      },
      {
        label: 'Industrial',
        data: [3, 10, 13, 15, 12, 20, 9, 5, 9],
        backgroundColor: '#5EC1CE',
        stack: 'Stack 0',
      },
      {
        label: 'Others',
        data: [6, 5, 30, 10, 11, 2, 9, 10, 19],
        backgroundColor: '#95DCAD',
        stack: 'Stack 0',
      },
    ],
  };
  const options = {
    ...stackedBarChartDefaultOption,
    barThickness: 24,
  };

  return (
    <Box className={classes.barWrapper}>
      <Box display={{ xs: 'block', md: 'flex' }} justifyContent="space-between" alignItems="center" mb={2}>
        <Box display={{ xs: 'block', md: 'flex' }} alignItems="flex-end">
          <div>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {t('payment:totalDebt')}
            </Typography>
            <Box fontSize={20}>$6,102,935</Box>
          </div>
          <Box color="error.main" marginLeft={{ xs: 0, md: 3 }} pb={0.5}>
            20% {t('common:higherThanPrevMonth')}
          </Box>
        </Box>
        <Box display={{ xs: 'block', md: 'flex' }} alignItems="flex-start">
          <Box marginRight={{ xs: 0, md: 3 }}>
            <Formik
              enableReinitialize
              initialValues={{ startDate: null, endDate: null }}
              onSubmit={values => {
                console.log(values);
              }}
            >
              {({ setFieldValue, values }) => (
                <Form>
                  <Box display="flex" justifyContent="flex-end">
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
                        monthsShown: 2,
                        selectsRange: true,
                        shouldCloseOnSelect: false,
                        popperPlacement: 'bottom-end',
                      }}
                    />
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
          <Button variant="text" startIcon={<GraphIcon />}>
            {t('common:viewTrend')}
          </Button>
        </Box>
      </Box>
      <div className={classes.barChart}>
        <Chart customLegend type="bar" data={data} options={options} />
      </div>
    </Box>
  );
};

export default BarChart;
