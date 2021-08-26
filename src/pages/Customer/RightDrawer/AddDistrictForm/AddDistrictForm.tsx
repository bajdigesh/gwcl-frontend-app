import { Grid, Paper, Typography } from '@material-ui/core';
import Button from 'components/Button';
import { FormikControl } from 'components/Form';
import { Form, Formik } from 'formik';
import useStyles from 'pages/Customer/RightDrawer/styles';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import { getRegions, selectRegionsOptions, selectRegionsStatus } from 'store/common';
import { selectSaveUser } from 'store/users';
import { useToggle } from 'utils/hooks';
import Routes from './Routes';
import { addDistrictInitialData } from './schema';
interface IProps {
  formValues?: typeof addDistrictInitialData;
  onSuccess?: () => void;
  toggleDrawer?: () => void;
}

const AddDistrictForm: React.FC<IProps> = ({ formValues: formData, onSuccess, toggleDrawer }) => {
  const classes = useStyles();
  const { t } = useTranslation(['common', 'customers']);
  const dispatch = useAppDispatch();
  const regionsOptions = useSelector(selectRegionsOptions);
  const regionsStatus = useSelector(selectRegionsStatus);
  const { status } = useSelector(selectSaveUser);
  const { open: showRoutes, toggleOpen: toggleRoutes } = useToggle();

  useEffect(() => {
    dispatch(getRegions());
  }, [dispatch]);

  const handleFormSubmit = (values: typeof addDistrictInitialData) => {
    const postData = {
      ...values,
      region_id: values.region_id?.value || null,
    };
    console.log(postData);
  };

  return !showRoutes ? (
    <>
      <Typography variant="h3" className={classes.drawerTitle}>
        {addDistrictInitialData?.id ? t('customers:updateDistrict') : t('customers:addDistrict')}
      </Typography>
      <div className={classes.drawerContent}>
        <Formik
          enableReinitialize
          initialValues={addDistrictInitialData}
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
              />
              <FormikControl control="input" type="input" label={t('common:districtID')} name="district_id" />
              <FormikControl control="input" type="input" label={t('common:districtName')} name="district_name" />
              <div>
                <Typography gutterBottom variant="body2" color="textSecondary">
                  {t('common:routes')}
                </Typography>
                <Paper variant="outlined" className={classes.customInput}>
                  12 {t('common:selected')}
                  <Button variant="text" size="small" onClick={() => toggleRoutes()}>
                    {t('common:edit')}
                  </Button>
                </Paper>
              </div>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Button fullWidth variant="outlined" color="primary" borderRadius={0}>
                    {t('customers:createRoute')}
                  </Button>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Button
                    disableElevation
                    fullWidth
                    borderRadius={0}
                    loading={status === 'loading'}
                    onClick={() => toggleRoutes()}
                  >
                    {t('customers:selectExistingRoutes')}
                  </Button>
                </Grid>
              </Grid>
              <div className={classes.drawerFooter}>
                <Button type="submit" fullWidth size="large" borderRadius={0} loading={status === 'loading'}>
                  {values.id ? t('customers:updateDistrict') : t('customers:addDistrict')}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  ) : (
    <Routes toggleOpen={toggleRoutes} />
  );
};

export default AddDistrictForm;
