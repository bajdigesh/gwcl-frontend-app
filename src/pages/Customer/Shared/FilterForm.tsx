import { Box, makeStyles, Typography, useTheme } from '@material-ui/core';
import { CheckBox } from '@material-ui/icons';
import Button from 'components/Button';
import { FormikControl } from 'components/Form';
import { Form, Formik } from 'formik';
import { filterFormInitialData } from 'pages/Customer/schemas';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'store';
import { useDrawerToggle } from 'utils/hooks';

const useStyles = makeStyles(theme => ({
  filterFormWrapper: {
    flexGrow: 1,
    padding: '5px 20px',
    '& > div:not(.react-datepicker__tab-loop)': {
      marginRight: theme.spacing(1),
      flex: '0 1 175px',
    },
    '& .gwcl-MuiFormControl-root': {
      marginBottom: 0,
    },
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      '& > div': {
        width: '100%',
        marginBottom: theme.spacing(1.5),
      },
    },
  },
  formGroup: {
    margin: '20px 0',
    '& > label': {
      fontSize: '0.75rem',
      color: theme.palette.grey['700'],
      marginBottom: '5px',
      textTransform: 'uppercase',
    },
  },
  filterButton: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  searchAndSort: {
    [theme.breakpoints.down('sm')]: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gridGap: theme.spacing(1.5),
      width: '100%',
    },
  },
  drawerTitle: {
    padding: theme.spacing(0, 3),
  },
  drawerContent: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(2, 3),
    height: `calc(100% - 100px)`,
    overflowY: 'auto',
  },
  optionBoxContainer: {
    display: 'flex',
    marginTop: '5px',
  },
  optionBox: {
    marginRight: theme.spacing(2),
    padding: '13px 16px',
    border: `1px solid ${theme.palette.grey['500']}`,
    borderRadius: 4,
    fontSize: '0.875rem',
    color: theme.palette.grey['900'],
    cursor: 'pointer',
    '& > span': {
      color: theme.palette.grey['700'],
      marginLeft: theme.spacing(1),
      fontWeight: 400,
      '&:last-of-type': {
        marginRight: theme.spacing(1),
        '& + i': {
          width: 8,
        },
      },
    },
    '&:focus-within': {
      '& span': {
        '&:last-of-type': {
          '& + i': {
            transform: 'rotate(180deg)',
          },
        },
      },
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
  checkBox: {
    appearance: 'none',
    border: `1px solid ${theme.palette.grey[600]}`,
    width: 16,
    height: 16,
    borderRadius: 4,
    cursor: 'pointer',
    '& + svg': {
      position: 'absolute',
      top: 1,
      left: 2,
      opacity: 0,
      zIndex: '-1',
      pointerEvents: 'none',
    },
    '&:focus': {
      outline: 'none',
    },
    '&:checked': {
      background: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
      '& + svg': {
        opacity: 1,
        zIndex: 0,
      },
    },
  },
  drawerFooter: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,

    '& .gwcl-MuiButtonBase-root': {
      padding: theme.spacing(2.5),
    },
    '& Button:first-child': {
      width: '30%',
      background: 'rgba(13, 76, 160, 0.1)',
      color: theme.palette.primary.main,
    },
    '& Button:nth-child(2)': {
      width: '70%',
    },
  },
}));

interface IProps {
  handleFilterFormSubmit: (values: any) => void;
}

const FilterForm: React.FC<IProps> = ({ handleFilterFormSubmit }) => {
  const { t } = useTranslation(['common', 'customers']);
  const theme = useTheme();
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [sortBy, setSortBy] = useState('Last Added');
  const [startDate, setStartDate] = useState(new Date());
  const dropDownOptions = [{ option: 'Last Added' }, { option: 'First Added' }];
  const { openDrawer, toggleDrawer } = useDrawerToggle();
  useEffect(() => {}, [dispatch]);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const onClick = (event: any) => {
    setSortBy(event.target.outerText);
    setAnchorEl(null);
  };

  /**
   * OnChange Handler
   */

  const onSeacrhFieldChange = () => {};

  return (
    <>
      <Typography variant={'h3'} className={classes.drawerTitle}>
        {t('common:filters')}{' '}
      </Typography>
      <Box display={{ sm: 'block', md: 'flex' }} flexDirection="column" className={classes.filterFormWrapper}>
        <Formik
          enableReinitialize
          initialValues={filterFormInitialData}
          onSubmit={values => {
            handleFilterFormSubmit(values);
          }}
        >
          {({ setFieldValue, values }) => (
            <Form autoComplete="off">
              <Box className={classes.formGroup}>
                <label>{t('customers:period')}</label>
                <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <FormikControl control="datepicker" name="start_date" label="Select Start Date" />
                  <FormikControl control="datepicker" name="end_date" label="Select End Date" />
                </Box>
              </Box>
              <FormikControl
                control="autoComplete"
                name="service_categories"
                label={t('customers:serviceCategories')}
                options={'Hello'}
                textFieldProps={{ variant: 'outlined' }}
              />
              <Box className={classes.formGroup}>
                <label>{t('common:customerStatus')}</label>
                <Box className={classes.optionBoxContainer}>
                  <Box className={classes.optionBox}>{t('common:active')}</Box>
                  <Box className={classes.optionBox}>{t('common:inactive')}</Box>
                  <Box className={classes.optionBox}>{t('common:disconnected')}</Box>
                </Box>
              </Box>
              <Box className={classes.formGroup}>
                <label>{t('common:meterStatus')}</label>
                <Box className={classes.optionBoxContainer}>
                  <Box className={classes.optionBox}>{t('common:working')}</Box>
                  <Box className={classes.optionBox}>{t('common:faulty')}</Box>
                  <Box className={classes.optionBox}>{t('common:noMeter')}</Box>
                </Box>
              </Box>
              <Box className={classes.formGroup}>
                <label>
                  {' '}
                  <CheckBox style={{ verticalAlign: 'middle', marginRight: '5px' }} />
                  {t('customers:lifelineCustomers')}{' '}
                </label>
              </Box>
              <div className={classes.drawerFooter}>
                <Button type="button" borderRadius={0}>
                  {t('common:resetFilters')}
                </Button>
                <Button type="submit" size="large" borderRadius={0}>
                  {t('common:apply')}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
};
export default FilterForm;
