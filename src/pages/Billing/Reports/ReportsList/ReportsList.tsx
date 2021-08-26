import { Box, Typography } from '@material-ui/core';
import Button from 'components/Button';
import { FilterContainer } from 'components/Filters';
import Table, { IndeterminateCheckbox } from 'components/Table';
import { TitleSecondary } from 'components/Title';
import { sortingOrder } from 'global/constants';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import useStyles from '../styles';
import Filters from './Filters';
import ReportsData from './ReportsData';

const ReportsList = () => {
  const { t } = useTranslation(['common', 'billing']);
  const classes = useStyles();
  const history = useHistory();
  const [reportsData, setReportsData] = useState<any>([]);

  useEffect(() => {
    const data = ReportsData.payload;
    const timeOut = setTimeout(() => {
      setReportsData(data);
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
      Header: t('billing:reportName'),
      accessor: 'report_title',
      Cell: (data: any) => (
        <>
          <Typography variant="body2" color="primary" component="p">
            {data.row.original.report_title}
          </Typography>
          <Typography component="span" variant="subtitle2">
            {data.row.original.report_desc}
          </Typography>
        </>
      ),
    },
    {
      Header: t('billing:period'),
      accessor: 'period',
    },
    {
      Header: t('billing:reportType'),
      accessor: 'report_type',
    },
    {
      Header: t('common:createdBy'),
      accessor: 'created_by',
      Cell: (data: any) => (
        <Typography variant="body2" color="primary" component="p">
          {data.row.original.created_by}
        </Typography>
      ),
    },
    {
      Header: t('common:createdOn'),
      accessor: 'created_on',
    },
  ];

  const [filterSchema, setFilterSchema] = useState<any>({
    page: 1,
    page_size: 15,
    type: '',
    created_by: '',
    start_date: '',
    end_date: '',
    orderBy: 'id',
    order: sortingOrder.ASCENDING,
  });
  const handleSearchInputChange = (e: any) => {
    console.log(e.target.value);
  };
  const handleFilterFormSubmit = (e: any) => {
    console.log(e.target.value);
  };
  const handleSortingMenuChange = () => {};

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between" className={classes.titleContainer}>
        <TitleSecondary>{t('common:reports')}</TitleSecondary>
        <Button
          className={classes.createReportBtn}
          disableElevation
          onClick={() => history.push('/billing/reports/create-report')}
        >
          {t('billing:createNewReport')}
        </Button>
      </Box>

      <FilterContainer>
        <Filters
          sortedOrder={filterSchema.order!}
          handleSearchInputChange={handleSearchInputChange}
          handleFilterFormSubmit={handleFilterFormSubmit}
          handleSortingMenuChange={handleSortingMenuChange}
        />
      </FilterContainer>

      <Table enableRowSelect columns={columns} data={reportsData} />
    </>
  );
};

export default ReportsList;
