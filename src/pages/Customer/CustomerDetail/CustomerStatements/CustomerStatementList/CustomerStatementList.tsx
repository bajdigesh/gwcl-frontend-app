import { makeStyles } from '@material-ui/core';
import { ArrowDownIcon } from 'assets/images';
import { FilterContainer } from 'components/Filters';
import Table, { IndeterminateCheckbox, TablePagination } from 'components/Table';
import { format } from 'date-fns';
import { MONTH_DAY_YEAR_FORMAT, sortingOrder } from 'global/constants';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import useStyles from '../../styles';
import CustomerStatementData from './CustomerStatementData';
import Filters from './Filters';

const statementStyles = makeStyles(theme => ({
  statementDetaillink: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    cursor: 'pointer',
    '& > svg': {
      transform: 'translate(4px, -1px) rotate(-90deg)',
      width: 8,
      '& path': {
        fill: theme.palette.grey['900'],
      },
    },
  },
}));

const CustomerStatementList = () => {
  const { t } = useTranslation(['customers']);
  const styles = statementStyles();
  const history = useHistory();
  const classes = useStyles();
  const [data, setData] = useState<any>([]);

  const [filterSchema, setFilterSchema] = useState<any>({
    page: 1,
    start_date: 15,
    end_date: '',
    statement_id: '',
    statement_type: '',
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
      Header: t('customers:statementId'),
      accessor: 'statement_id',
      Cell: (data: any) => (
        <>
          <p>{data.row.original.statement_id}</p>
          <span className={classes.subRecords}>
            {t('customers:generatedOn')}{' '}
            {new Intl.DateTimeFormat('en-US', {
              month: 'long',
              day: '2-digit',
            }).format(new Date(data.row.original.created_at))}
          </span>
        </>
      ),
    },
    {
      Header: t('customers:statementType'),
      accessor: 'statement_type',
    },
    {
      Header: t('customers:statementPeriod'),
      accessor: 'statement_from',
      Cell: (data: any) => (
        <>
          {format(new Date(data.value), MONTH_DAY_YEAR_FORMAT)}
          -&nbsp;
          {format(new Date(data.value), MONTH_DAY_YEAR_FORMAT)}
        </>
      ),
    },
    {
      Header: '',
      accessor: 'created_at',
      Cell: (data: any) => (
        <span
          className={styles.statementDetaillink}
          onClick={() => history.push('/customers/list/1/customer-statements/detail')}
        >
          {t('customers:viewStatement')}
          <ArrowDownIcon />
        </span>
      ),
    },
  ];

  useEffect(() => {
    const data = CustomerStatementData.payload;
    const timeOut = setTimeout(() => {
      setData(data);
    }, 1000);
    return () => clearTimeout(timeOut);
  }, []);

  const statementPagination = CustomerStatementData.meta_data[0].pagination;
  const handleChangePage = () => {};
  const handleChangeRowsPerPage = () => {};

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

      <Table
        columns={columns}
        data={data}
        enableRowSelect
        rowsPerPage={statementPagination?.per_page || 10}
        renderPagination={() => (
          <TablePagination
            paginationData={statementPagination}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        )}
      />
    </>
  );
};

export default CustomerStatementList;
