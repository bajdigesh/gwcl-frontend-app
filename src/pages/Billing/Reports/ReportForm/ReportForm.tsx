import { Box, Grid, Link } from '@material-ui/core';
import { BackIcon } from 'assets/images';
import Button from 'components/Button';
import { ControllableDrawer } from 'components/Drawer';
import { FormikControl } from 'components/Form';
import Title from 'components/Title';
import { Form, Formik } from 'formik';
import MoreFilters from 'pages/Billing/RightDrawer/MoreFilters';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { createReportInitialData } from '../schemas';
import useStyles from './styles';

const ReportForm = () => {
  const { t } = useTranslation(['common', 'billing']);
  const classes = useStyles();
  const history = useHistory();
  const handleFilterFormSubmit = (values: any) => {};
  const reportForOptions = [{}];
  const onClickBack = (e: any) => {
    e.preventDefault();
    history.goBack();
  };
  return (
    <Box>
      <Box display="flex" alignItems="center">
        <Link onClick={onClickBack} href="#" className={classes.backIcon}>
          <BackIcon />
        </Link>
        <Title>{t('billing:createNewReport')}</Title>
      </Box>

      <Grid container spacing={3}>
        <Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
          <Formik
            enableReinitialize
            initialValues={createReportInitialData}
            onSubmit={values => {
              handleFilterFormSubmit(values);
            }}
          >
            {({ setFieldValue, values }) => (
              <Form>
                <div className={classes.reportType}>
                  <h5 className={classes.headers}>{t('billing:reportType')}</h5>
                  <Box display="flex" flexWrap="wrap" mb={3}>
                    <label>
                      <input type="radio" name="reportType" />
                      <span>{t('billing:revenueSummary')}</span>
                    </label>
                    <label>
                      <input type="radio" name="reportType" />
                      <span>{t('billing:billingSummary')}</span>
                    </label>
                  </Box>
                </div>

                <div className={classes.period}>
                  <h5 className={classes.headers}>{t('billing:period')}</h5>
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
                      monthsShown: 1,
                      selectsRange: true,
                      shouldCloseOnSelect: false,
                    }}
                  />
                </div>

                <FormikControl
                  control="autoComplete"
                  name="reportFor"
                  label={t('billing:reportFor')}
                  options={reportForOptions}
                  textFieldProps={{ variant: 'standard' }}
                />

                <FormikControl
                  control="autoComplete"
                  name="region"
                  label={t('common:regions')}
                  options={reportForOptions}
                  textFieldProps={{ variant: 'standard' }}
                />

                <FormikControl
                  control="autoComplete"
                  name="district"
                  label={t('common:districts')}
                  options={reportForOptions}
                  textFieldProps={{ variant: 'standard' }}
                />

                <FormikControl
                  control="autoComplete"
                  name="route"
                  label={t('common:routes')}
                  options={reportForOptions}
                  textFieldProps={{ variant: 'standard' }}
                />

                <FormikControl
                  control="autoComplete"
                  name="groupBy"
                  label={t('common:groupBy')}
                  options={reportForOptions}
                  textFieldProps={{ variant: 'standard' }}
                />

                <ControllableDrawer
                  toggleElement={handleToggle => (
                    <Button disableElevation className={classes.btnMoreFilters} onClick={handleToggle}>
                      {t('common:moreFilters')}
                    </Button>
                  )}
                >
                  {() => <MoreFilters />}
                </ControllableDrawer>

                <Box mt={{ xs: 2, md: 6.75 }} className={classes.buttonsContainer}>
                  <Button disableElevation color="primary" borderRadius={8}>
                    {t('common:generateReport')}
                  </Button>
                  <Button disableElevation color="secondary" variant="outlined" borderRadius={8}>
                    {t('common:cancel')}
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Grid>

        <Grid item xl={4} lg={4} md={6} sm={6} xs={12} className={classes.frequentlyCreated}>
          <h4>{t('billing:frequentlyCreatedReports')}</h4>
          <Box display="grid" gridGap={12}>
            <Button disableElevation color="inherit" variant="outlined" borderRadius={4}>
              {t('billing:revenueSummary')}
            </Button>
            <Button disableElevation color="inherit" variant="outlined" borderRadius={4}>
              {t('billing:revenueSummaryReportByCategory')}
            </Button>
            <Button disableElevation color="inherit" variant="outlined" borderRadius={4}>
              {t('billing:billingSummaryReportRegionalCategoriesNational')}
            </Button>
            <Button disableElevation color="inherit" variant="outlined" borderRadius={4}>
              {t('billing:billingSummaryReportCategoryNational')}
            </Button>
            <Button disableElevation color="inherit" variant="outlined" borderRadius={4}>
              {t('billing:billingSummaryReportDistrictNational')}
            </Button>
            <Button disableElevation color="inherit" variant="outlined" borderRadius={4}>
              {t('billing:billingSummaryReportRegionalNational')}
            </Button>
            <Button disableElevation color="inherit" variant="outlined" borderRadius={4}>
              {t('billing:billingSummaryReportCategoriesRegional')}
            </Button>
            <Button disableElevation color="inherit" variant="outlined" borderRadius={4}>
              {t('billing:billingSummaryReportRoutesDistrict')}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReportForm;
