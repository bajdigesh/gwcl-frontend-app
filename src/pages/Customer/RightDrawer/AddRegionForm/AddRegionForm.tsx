import { Grid, Paper, Typography } from '@material-ui/core';
import Button from 'components/Button';
import { FormikControl } from 'components/Form';
import { Form, Formik } from 'formik';
import useStyles from 'pages/Customer/RightDrawer/styles';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'store';
import { getRegions } from 'store/common';
import { useToggle } from 'utils/hooks';
import Districts from './Districts';
import { addRegionInitialData } from './schema';
interface IProps {
  formValues?: typeof addRegionInitialData;
  onSuccess?: () => void;
  toggleDrawer?: () => void;
}

const AddRegionForm: React.FC<IProps> = ({ formValues: formData, onSuccess, toggleDrawer }) => {
  const classes = useStyles();
  const { t } = useTranslation(['common', 'customers']);
  const dispatch = useAppDispatch();
  const { open: showDistricts, toggleOpen: toggleDistricts } = useToggle();

  useEffect(() => {
    dispatch(getRegions());
  }, [dispatch]);

  const handleFormSubmit = (values: typeof addRegionInitialData) => {
    const postData = {
      ...values,
    };
    console.log(postData);
  };

  return !showDistricts ? (
    <>
      <Typography variant="h3" className={classes.drawerTitle}>
        {addRegionInitialData?.id ? t('customers:updateRegion') : t('customers:addRegion')}
      </Typography>
      <div className={classes.drawerContent}>
        <Formik
          enableReinitialize
          initialValues={addRegionInitialData}
          onSubmit={values => {
            handleFormSubmit(values);
          }}
        >
          {({ setFieldValue, values }) => (
            <Form autoComplete="off">
              <FormikControl control="input" type="input" label={t('common:regionID')} name="region_id" />
              <FormikControl control="input" type="input" label={t('common:regionName')} name="region_name" />
              <div>
                <Typography gutterBottom variant="body2" color="textSecondary">
                  {t('common:districts')}
                </Typography>
                <Paper variant="outlined" className={classes.customInput}>
                  12 {t('common:selected')}
                  <Button variant="text" size="small" onClick={() => toggleDistricts()}>
                    {t('common:edit')}
                  </Button>
                </Paper>
              </div>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Button fullWidth variant="outlined" color="primary" borderRadius={0}>
                    {t('customers:createDistrict')}
                  </Button>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Button disableElevation fullWidth borderRadius={0} onClick={() => toggleDistricts()}>
                    {t('customers:selectExistingDistricts')}
                  </Button>
                </Grid>
              </Grid>
              <div className={classes.drawerFooter}>
                <Button type="submit" fullWidth size="large" borderRadius={0}>
                  {values.id ? t('customers:updateRegion') : t('customers:addRegion')}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  ) : (
    <Districts toggleOpen={toggleDistricts} />
  );
};

export default AddRegionForm;
