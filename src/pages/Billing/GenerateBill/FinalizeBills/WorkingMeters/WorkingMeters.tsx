import { Box, Link, Typography } from '@material-ui/core';
import { BackIcon, BillingOutlineIcon, DownloadIcon1, VerifiedIcon, WarningIcon } from 'assets/images';
import clsx from 'clsx';
import { FilterContainer } from 'components/Filters';
import Table, { IndeterminateCheckbox, TablePagination } from 'components/Table';
import Title from 'components/Title';
import { sortingOrder } from 'global/constants';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import Filters from './Filters';
import useStyles from './styles';
import WorkingMetersData from './WorkingMetersData';

const WorkingMeters = () => {
  const { t } = useTranslation(['common', 'billing']);
  const classes = useStyles();
  const history = useHistory();
  const [workingMetersData, setWorkingMetersData] = useState<any>([]);

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
    console.log(e.target);
  };

  useEffect(() => {
    const data = WorkingMetersData.payload;
    setWorkingMetersData(data);
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
          <Typography color="primary" component="p" variant="body2">
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
        <Typography color="primary" component="p" variant="body2">
          {data.row.original.meter_number}
        </Typography>
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
      Header: '',
      accessor: 'account_number',
      Cell: (data: any) => (
        <Box className={clsx('actionButtons', classes.actionButtons)} display="flex" alignItems="center">
          <Link href="#" color="primary">
            <BillingOutlineIcon />
          </Link>
          <Link href="#" color="primary">
            <DownloadIcon1 />
          </Link>
        </Box>
      ),
    },
  ];

  const workingMetersPagination = WorkingMetersData.meta_data[0].pagination;
  const handleChangePage = (e: any) => {
    console.log(e.target.value);
  };
  const handleChangeRowsPerPage = (e: any) => {
    console.log(e.target.value);
  };
  const goBack = (e: any) => {
    e.preventDefault();
    history.goBack();
  };
  return (
    <>
      <Box position="relative" display="flex" alignItems="center">
        <Link className={classes.backIcon} href="#" onClick={goBack}>
          <BackIcon />
        </Link>
        <Title>{t('billing:allWorkingMeters')}</Title>
      </Box>

      <FilterContainer>
        <Filters
          sortedOrder={filterSchema.order!}
          handleSearchInputChange={handleSearchInputChange}
          handleFilterFormSubmit={handleFilterFormSubmit}
          handleSortingMenuChange={handleSortingMenuChange}
        />
      </FilterContainer>

      {workingMetersData && (
        <Table
          columns={columns}
          data={workingMetersData}
          enableRowSelect
          rowsPerPage={workingMetersPagination?.per_page || 10}
          hoverableRow
          renderPagination={() => (
            <TablePagination
              paginationData={workingMetersPagination}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
          )}
        />
      )}
    </>
  );
};

export default WorkingMeters;
