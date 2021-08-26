import { Typography } from '@material-ui/core';
import { unwrapResult } from '@reduxjs/toolkit';
import Button from 'components/Button';
import { FormikControl } from 'components/Form';
import toast from 'components/Toast';
import { Form, Formik } from 'formik';
import useStyles from 'pages/Users/RightDrawer/style';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import {
  getDistricts,
  getRegions,
  getRoles,
  getRoutes,
  selectDistrictsOptions,
  selectDistrictsStatus,
  selectRegionsOptions,
  selectRegionsStatus,
  selectRolesOptions,
  selectRolesStatus,
  selectRoutesOptions,
  selectRoutesStatus,
} from 'store/common';
import { saveUser, selectSaveUser } from 'store/users';
import { mapObjectValuesToHtmlElement } from 'utils';
import { userFormData, userFormValidationSchema } from './schema';

interface IProps {
  formValues: typeof userFormData;
  onSuccess?: () => void;
  toggleDrawer: () => void;
}

const UserForm: React.FC<IProps> = ({ formValues: formData, onSuccess, toggleDrawer }) => {
  const classes = useStyles();
  const { t } = useTranslation(['common', 'users']);
  const dispatch = useAppDispatch();
  const rolesOptions = useSelector(selectRolesOptions);
  const rolesStatus = useSelector(selectRolesStatus);
  const regionsOptions = useSelector(selectRegionsOptions);
  const regionsStatus = useSelector(selectRegionsStatus);
  const districtsOptions = useSelector(selectDistrictsOptions);
  const districtsStatus = useSelector(selectDistrictsStatus);
  const routesOptions = useSelector(selectRoutesOptions);
  const routesStatus = useSelector(selectRoutesStatus);
  const { status } = useSelector(selectSaveUser);

  useEffect(() => {
    dispatch(getRoles());
    dispatch(getRegions());
  }, [dispatch]);

  /**
   * in Edit Case if found region_id and district_id call their dependent api
   */
  useEffect(() => {
    if (formData.region_id?.value) {
      dispatch(getDistricts({ region_id: formData.region_id?.value }));
    }
    if (formData.district_id?.value) {
      dispatch(getRoutes({ district_id: formData.district_id?.value }));
    }
  }, [dispatch, formData]);

  /**
   * OnChange Handler
   */
  const handleRegionChange = (selectedOption: any, setFieldValue: Function, values: typeof userFormData) => {
    if (selectedOption) {
      dispatch(getDistricts({ region_id: selectedOption.value }));
    }
    if (selectedOption !== values.region_id) {
      setFieldValue('district_id', null);
      setFieldValue('route_ids', []);
    }
  };

  const handleDistrictChange = (selectedOption: any, setFieldValue: Function, values: typeof userFormData) => {
    if (selectedOption) {
      dispatch(getRoutes({ district_id: selectedOption.value }));
    }
    if (selectedOption !== values.district_id) {
      setFieldValue('route_ids', []);
    }
  };

  const handleFormSubmit = (values: typeof userFormData) => {
    const postData = {
      ...values,
      role_id: values.role_id?.value || null,
      region_id: values.region_id?.value || null,
      district_id: values.district_id?.value || null,
      route_ids: values.route_ids.length ? values.route_ids.map((route: IAutoCompleteOption) => route.value) : [],
    };
    dispatch(saveUser(postData))
      .then(unwrapResult)
      .then(_ => {
        if (onSuccess) {
          onSuccess();
        }
        toggleDrawer();
      })
      .catch(errors => {
        const errorElement: any = mapObjectValuesToHtmlElement(errors, 'Error occured');
        toast.error(errorElement);
      });
  };

  return (
    <>
      <Typography variant="h3" className={classes.drawerTitle}>
        {formData?.id ? t('users:editUser') : t('users:addNewUser')}
      </Typography>
      <div className={classes.drawerContent}>
        <Formik
          enableReinitialize
          initialValues={formData}
          validationSchema={userFormValidationSchema}
          onSubmit={values => {
            handleFormSubmit(values);
          }}
        >
          {({ setFieldValue, values }) => (
            <Form autoComplete="off" noValidate>
              <FormikControl control="input" type="input" label={t('common:firstName')} name="first_name" required />
              <FormikControl control="input" type="input" label={t('common:lastName')} name="last_name" required />
              <FormikControl control="input" type="input" label={t('users:staffId')} name="staff_id" required />
              <FormikControl control="input" type="input" label={t('users:designation')} name="designation" required />
              <FormikControl control="input" type="input" label={t('common:mobile')} name="mobile" required />
              <FormikControl control="input" type="input" label={t('common:email')} name="email" required />
              <FormikControl
                control="autoComplete"
                name="role_id"
                label={t('users:roles')}
                loading={rolesStatus === 'loading'}
                options={rolesOptions}
                textFieldProps={{ required: true }}
              />
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
                onChangeCallBack={(value: any) => {
                  handleDistrictChange(value, setFieldValue, values);
                }}
              />
              <FormikControl
                multiple
                control="autoComplete"
                name="route_ids"
                label={t('common:routes')}
                disabled={!values.district_id}
                loading={routesStatus === 'loading'}
                options={routesOptions}
              />
              <div className={classes.drawerFooter}>
                <Button type="submit" fullWidth size="large" borderRadius={0} loading={status === 'loading'}>
                  {values.id ? t('users:editUser') : t('users:addNewUser')}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default UserForm;
