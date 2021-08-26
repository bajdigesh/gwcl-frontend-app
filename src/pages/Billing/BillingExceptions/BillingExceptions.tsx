import { Box, Typography } from '@material-ui/core';
import { UploadIconOutlined, VerifiedIconOutlined } from 'assets/images';
import Button from 'components/Button';
import { ControllableDrawer } from 'components/Drawer';
import { FilterContainer } from 'components/Filters';
import Table, { IndeterminateCheckbox } from 'components/Table';
import { sortingOrder } from 'global/constants';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import MeterDetails from '../RightDrawer/MeterDetails';
import ExceptionData from './ExceptionData';
import Filters from './Filters';
import useStyles from './styles';

const BillingExceptions = () => {
  const { t } = useTranslation(['common', 'billing']);
  const classes = useStyles();
  const [billingExceptionData, setBillingExceptionData] = useState<any>([]);

  useEffect(() => {
    const data = ExceptionData.payload;
    const timeOut = setTimeout(() => {
      setBillingExceptionData(data);
    }, 1000);
    return () => {
      clearTimeout(timeOut);
    };
  }, []);

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
          <Typography variant="body2" color="primary" component="p">
            {data.row.original.account_name}
          </Typography>
          <Typography component="span" variant="subtitle2">
            {data.row.original.account_number}
          </Typography>
        </>
      ),
    },
    {
      Header: t('common:meterNumber'),
      accessor: 'meter_number',
      Cell: (data: any) => (
        <Typography variant="body2" color="primary" component="p">
          {data.row.original.meter_number}
        </Typography>
      ),
    },
    {
      Header: t('common:billMonth'),
      accessor: 'exception_title',
      Cell: (data: any) => (
        <>
          <Typography variant="body2" color="inherit" component="p">
            {data.row.original.exception_title}
          </Typography>
          <Typography component="span" variant="subtitle2">
            {data.row.original.exception_detail}
          </Typography>
        </>
      ),
    },
    {
      Header: t('common:nextStep'),
      accessor: 'next_step_title',
      Cell: (data: any) => (
        <>
          <Box display="flex" alignItems="center">
            <Typography variant="body2" color="inherit" component="p">
              {data.row.original.next_step_title}
            </Typography>
            {data.row.original.meter_status === 'changed' && (
              <ControllableDrawer
                toggleElement={handleToggle => (
                  <Button
                    className={classes.viewDetailsBtn}
                    color="primary"
                    disableElevation
                    onClick={handleToggle}
                    variant="text"
                    size="small"
                  >
                    {t('common:viewDetails')}
                  </Button>
                )}
              >
                {() => <MeterDetails />}
              </ControllableDrawer>
            )}
          </Box>
          <Typography component="span" variant="subtitle2">
            {data.row.original.next_step_detail}
          </Typography>
        </>
      ),
    },
    {
      Header: '',
      accessor: 'meter_status',
      Cell: (data: any) => (
        <>
          {data.row.original.meter_status === 'changed' && (
            <Button
              disableElevation
              size="small"
              borderRadius={8}
              variant="outlined"
              startIcon={<VerifiedIconOutlined />}
              className={classes.successButtonOutlined}
            >
              {t('common:accept')}
            </Button>
          )}
          {data.row.original.meter_status === 'not_faulty' && (
            <Button
              disableElevation
              size="small"
              borderRadius={8}
              variant="outlined"
              startIcon={<UploadIconOutlined />}
            >
              {t('common:update')}
            </Button>
          )}
        </>
      ),
    },
  ];

  const [filterSchema, setFilterSchema] = useState<any>({
    page: 1,
    page_size: 15,
    region_id: '',
    district_id: '',
    start_date: '',
    end_date: '',
    search: '',
    orderBy: 'id',
    order: sortingOrder.ASCENDING,
  });

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
      <FilterContainer>
        <Filters
          sortedOrder={filterSchema.order!}
          handleSearchInputChange={handleSearchInputChange}
          handleFilterFormSubmit={handleFilterFormSubmit}
          handleSortingMenuChange={handleSortingMenuChange}
        />
      </FilterContainer>

      <Box mt={2}>
        <Table enableRowSelect columns={columns} data={billingExceptionData} />
      </Box>
    </>
  );
};

export default BillingExceptions;
