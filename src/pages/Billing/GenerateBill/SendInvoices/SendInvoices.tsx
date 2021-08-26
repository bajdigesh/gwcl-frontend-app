import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@material-ui/core';
import { BillingOutlineIcon, EditIcon, RemoveIcon, SearchIcon, VerifiedIcon, WarningIcon } from 'assets/images';
import clsx from 'clsx';
import Button from 'components/Button';
import { ConfirmationDialog } from 'components/Dialog';
import { FilterSearch } from 'components/Filters';
import { FormikControl } from 'components/Form';
import Table, { IndeterminateCheckbox, TablePagination } from 'components/Table';
import Title from 'components/Title';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useToggle from 'utils/hooks/useToggle';
import CustomerData from './CustomerData';
import useStyles from './styles';

const SendInvoices = () => {
  const { t } = useTranslation(['common', 'billing']);
  const classes = useStyles();
  const [value, setValue] = useState('all_customers');
  const [customersIn, setCustomersIn] = useState('region');
  const [customerData, setCustomerData] = useState<any>([]);
  const { open: openConfirmationDialog, toggleOpen: toggleConfirmationDialog } = useToggle();
  const [chipData, setChipData] = useState([
    { key: 0, label: 'Region 1' },
    { key: 0, label: 'Region 2' },
  ]);

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };
  const handleCustomersInChange = (event: any) => {
    setCustomersIn(event.target.value);
  };
  const handleDelete = (chipToDelete: any) => {
    setChipData(chips => chips.filter(chip => chip.key !== chipToDelete.key));
  };

  useEffect(() => {
    const data = CustomerData.payload;
    setCustomerData(data);
  }, []);

  const customerDataPagination = CustomerData.meta_data[0].pagination;
  const handleChangePage = () => {};
  const handleChangeRowsPerPage = () => {};

  const onclick = () => {};
  const handleFormSubmit = (value: any) => {};

  const columns = [
    {
      id: 'selection',
      width: 0,
      Header: ({ getToggleAllRowsSelectedProps }: any) => {
        return <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />;
      },
      Cell: ({ row }: any) => {
        return <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />;
      },
    },
    {
      Header: t('common:account'),
      accessor: 'account_name',
      Cell: (data: any) => (
        <>
          <Box display="flex" alignItems="center">
            <Typography component="p" color="primary" variant="body2">
              {data.row.original.account_name}
            </Typography>
            <BillingOutlineIcon className={clsx('hoverableIcon', classes.hoverableIcon)} />
          </Box>
          <Typography component="span" variant="subtitle2">
            {data.row.original.account_number}
          </Typography>
        </>
      ),
    },
    {
      Header: t('common:billAmount'),
      accessor: 'bill_amount',
      Cell: (data: any) => (
        <span className={classes.amount}>{new Intl.NumberFormat().format(data.row.original.bill_amount)}</span>
      ),
    },
    {
      Header: t('common:meterStatus'),
      accessor: 'is_working',
      Cell: (data: any) =>
        data.row.original.is_working ? (
          <Box className={classes.statusInfo} display="flex" alignItems="center" color="success.main">
            <VerifiedIcon />
            {t('common:working')}
          </Box>
        ) : (
          <Box className={classes.statusInfo} display="flex" alignItems="center" color="error.main">
            <WarningIcon />
            {t('common:faulty')}
          </Box>
        ),
    },
    {
      Header: t('billing:deliveredVia'),
      accessor: 'delivered_via',
      Cell: (data: any) => (
        <Box display="flex" alignItems="center">
          <span>{data.row.original.delivered_via}</span>
          <EditIcon className={clsx('hoverableIcon', classes.hoverableIcon)} />
        </Box>
      ),
    },
  ];

  const meterStatusValue = {
    meter_status: '',
  };

  const sendInvoices = () => {
    toggleConfirmationDialog(false);
  };

  const meterStatusOptions = [{ label: 'Wroking' }, { label: 'Faulty' }];
  return (
    <>
      <Grid container>
        <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
          <FormControl>
            <FormLabel className={classes.header}>{t('billing:sendInvoicesTo')}</FormLabel>
            <RadioGroup
              className={classes.sendInvoiceFormControl}
              aria-label="sendInvoicesTo"
              name="sendInvoicesTo"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
                value="all_customers"
                control={<Radio color="primary" />}
                label={t('billing:allCustomers')}
              />
              <FormControlLabel
                value="meter_status_cusotmers"
                control={<Radio color="primary" />}
                label={t('billing:customersWithMeterStatus')}
              />
              {value === 'meter_status_cusotmers' && (
                <Box display="flex" flexDirection="column" pl={4}>
                  <FormControlLabel
                    control={<Checkbox color="primary" onChange={handleChange} name="working_meter" />}
                    label={t('billing:workingMeter')}
                  />
                  <FormControlLabel
                    control={<Checkbox color="primary" onChange={handleChange} name="faulty_meter" />}
                    label={t('billing:faultyMeter')}
                  />
                  <FormControlLabel
                    control={<Checkbox color="primary" onChange={handleChange} name="no_meter" />}
                    label={t('billing:noMeter')}
                  />
                </Box>
              )}

              <FormControlLabel
                value="customers_in"
                control={<Radio color="primary" />}
                label={t('billing:customersInA')}
              />
              {value === 'customers_in' && (
                <Box pl={4}>
                  <RadioGroup
                    aria-label="customersIn"
                    name="customers_in"
                    value={customersIn}
                    onChange={handleCustomersInChange}
                  >
                    <FormControlLabel value="region" control={<Radio color="primary" />} label="Region" />
                    {customersIn === 'region' && (
                      <Box my={2}>
                        <TextField
                          variant="outlined"
                          id="standard-search"
                          label={t('billing:searchRegion')}
                          type="search"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <SearchIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                        <div>
                          {chipData.map((data, index) => (
                            <Chip deleteIcon={<RemoveIcon />} label={data.label} key={index} onDelete={handleDelete} />
                          ))}
                        </div>
                      </Box>
                    )}
                    <FormControlLabel
                      value="district"
                      control={<Radio color="primary" />}
                      label={t('common:district')}
                    />
                    <FormControlLabel value="route" control={<Radio color="primary" />} label={t('common:route')} />
                  </RadioGroup>
                </Box>
              )}
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xl={8} lg={8} md={8} sm={12} xs={12} className={classes.tableContainer}>
          <Box px={2} mb={2} display="flex" justifyContent="space-between" alignItems="center">
            <Title className={classes.title}>
              {customerDataPagination.total} {t('common:customers')}
            </Title>
            <Box className={classes.buttonsContainer}>
              <Button disableElevation color="secondary" onClick={onclick}>
                Region 1
              </Button>
              <Button disableElevation color="secondary" onClick={onclick}>
                Region 2
              </Button>
            </Box>
          </Box>
          <Box px={2} mb={2} display="flex" justifyContent="space-between" alignItems="center">
            <Formik
              enableReinitialize
              initialValues={meterStatusValue}
              onSubmit={values => {
                handleFormSubmit(values);
              }}
            >
              <Form>
                <div className={classes.filterWrapper}>
                  <FormikControl
                    control="autoComplete"
                    name="meter_status"
                    label={t('common:meterStatus')}
                    options={meterStatusOptions}
                    textFieldProps={{ variant: 'outlined' }}
                  />
                </div>
              </Form>
            </Formik>
            <FilterSearch />
          </Box>

          {customerData && (
            <Box className={classes.customerBillingTable}>
              <Table
                columns={columns}
                data={customerData}
                enableRowSelect
                rowsPerPage={customerDataPagination?.per_page || 10}
                hoverableRow
                renderPagination={() => (
                  <TablePagination
                    paginationData={customerDataPagination}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                  />
                )}
              />
            </Box>
          )}
        </Grid>
      </Grid>

      <ConfirmationDialog
        title="Invoice sent to 6,984 Customers"
        open={false}
        toggleDialog={toggleConfirmationDialog}
        handleConfirmationClick={sendInvoices}
      />
    </>
  );
};

export default SendInvoices;
