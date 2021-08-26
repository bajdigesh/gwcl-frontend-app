import { Grid, Paper, Typography } from '@material-ui/core';
import Button from 'components/Button';
import { FormikControl } from 'components/Form';
import { Form, Formik } from 'formik';
import useStyles from 'pages/Customer/RightDrawer/styles';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import {
  getDistricts,
  getRegions,
  getRoutes,
  selectDistrictsOptions,
  selectDistrictsStatus,
  selectRegionsOptions,
  selectRegionsStatus,
} from 'store/common';
import { selectSaveUser } from 'store/users';
import { useToggle } from 'utils/hooks';
import { addRouteInitialData } from './schema';
import ServicePoint from './ServicePoint';

interface IProps {
  formValues?: typeof addRouteInitialData;
  onSuccess?: () => void;
  toggleDrawer?: () => void;
}

const AddRouteForm: React.FC<IProps> = ({ formValues: formData, onSuccess, toggleDrawer }) => {
  const classes = useStyles();
  const { t } = useTranslation(['common', 'customers']);
  const dispatch = useAppDispatch();
  const regionsOptions = useSelector(selectRegionsOptions);
  const regionsStatus = useSelector(selectRegionsStatus);
  const districtsOptions = useSelector(selectDistrictsOptions);
  const districtsStatus = useSelector(selectDistrictsStatus);
  const { status } = useSelector(selectSaveUser);
  const { open: showServicePoint, toggleOpen: toggleServicePoint } = useToggle();

  useEffect(() => {
    dispatch(getRegions());
  }, [dispatch]);

  /**
   * in Edit Case if found region_id and district_id call their dependent api
   */
  useEffect(() => {
    if (formData?.region_id?.value) {
      dispatch(getDistricts({ region_id: formData.region_id?.value }));
    }
    if (formData?.district_id?.value) {
      dispatch(getRoutes({ district_id: formData.district_id?.value }));
    }
  }, [dispatch, formData]);

  /**
   * OnChange Handler
   */
  const handleRegionChange = (selectedOption: any, setFieldValue: Function, values: typeof addRouteInitialData) => {
    if (selectedOption) {
      dispatch(getDistricts({ region_id: selectedOption.value }));
    }
    if (selectedOption !== values.region_id) {
      setFieldValue('district_id', null);
      setFieldValue('route_ids', []);
    }
  };

  const handleFormSubmit = (values: typeof addRouteInitialData) => {
    const postData = {
      ...values,
      region_id: values.region_id?.value || null,
      district_id: values.district_id?.value || null,
    };
    console.log(postData);
  };

  return !showServicePoint ? (
    <>
      <Typography variant="h3" className={classes.drawerTitle}>
        {addRouteInitialData?.id ? t('customers:updateRoute') : t('customers:addRoute')}
      </Typography>
      <div className={classes.drawerContent}>
        <Formik
          enableReinitialize
          initialValues={addRouteInitialData}
          onSubmit={values => {
            handleFormSubmit(values);
          }}
        >
          {({ setFieldValue, values }) => (
            <Form autoComplete="off">
              <FormikControl
                control="autoComplete"
                name="region_id"
                label={t('common:regions')}
                loading={regionsStatus === 'loading'}
                options={regionsOptions}
                onChangeCallBack={(value: any) => {
                  handleRegionChange(value, setFieldValue, values);
                }}
              />
              <FormikControl
                control="autoComplete"
                name="district_id"
                label={t('common:districts')}
                loading={districtsStatus === 'loading'}
                options={districtsOptions}
                disabled={!values.region_id}
              />
              <FormikControl control="input" type="input" label={t('common:routeID')} name="route_id" />
              <FormikControl control="input" type="input" label={t('common:routeName')} name="route_name" />
              <div>
                <Typography gutterBottom variant="body2" color="textSecondary">
                  {t('customers:servicePoints')}
                </Typography>
                <Paper variant="outlined" className={classes.customInput}>
                  12 {t('common:selected')}
                  <Button variant="text" size="small" onClick={() => toggleServicePoint()}>
                    {t('common:edit')}
                  </Button>
                </Paper>
              </div>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="primary"
                    borderRadius={0}
                    onClick={() => toggleServicePoint()}
                  >
                    {t('customers:selectExistingSPs')}
                  </Button>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Button disableElevation fullWidth borderRadius={0} loading={status === 'loading'}>
                    {t('customers:createNewSPs')}
                  </Button>
                </Grid>
              </Grid>
              <div className={classes.drawerFooter}>
                <Button type="submit" fullWidth size="large" borderRadius={0} loading={status === 'loading'}>
                  {values.id ? t('customers:updateRoute') : t('customers:addRoute')}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  ) : (
    <ServicePoint toggleOpen={toggleServicePoint} />
  );
};

export default AddRouteForm;
