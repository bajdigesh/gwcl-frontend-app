import { Box } from '@material-ui/core';
import { ArrowDownIcon } from 'assets/images';
import Button from 'components/Button';
import CustomizedDropdown from 'components/Dropdown/CustomizedDropdown';
import { FilterContainer } from 'components/Filters';
import Table, { IndeterminateCheckbox, TablePagination } from 'components/Table';
import { sortingOrder } from 'global/constants';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import BillsData from './BillsData';
import Filters from './Filters';
import useStyles from './styles';

const FinalizeBills = () => {
  const { t } = useTranslation(['common', 'billing']);
  const classes = useStyles();

  const [finalizeBillsData, setFinalizeBillsData] = useState<any>([]);

  const [filterSchema, setFilterSchema] = useState<any>({
    page: 1,
    page_size: 15,
    search: '',
    orderBy: 'id',
    order: sortingOrder.ASCENDING,
  });

  useEffect(() => {
    const data = BillsData.payload;
    const timeOut = setTimeout(() => {
      setFinalizeBillsData(data);
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
      Header: t('common:region'),
      accessor: 'region',
      Cell: (data: any) => (
        <>
          <p className={classes.primaryText}>{data.row.original.region}</p>
          <span className={classes.subText}>
            {data.row.original.service_points}
            {t('billing:servicePoints')}
          </span>
        </>
      ),
    },
    {
      Header: t('common:district'),
      accessor: 'district',
      Cell: (data: any) => (
        <>
          <p className={classes.primaryText}>{data.row.original.district}</p>
          <span className={classes.subText}>
            {data.row.original.service_points}
            {t('billing:servicePoints')}
          </span>
        </>
      ),
    },
    {
      Header: t('common:route'),
      accessor: 'route',
      Cell: (data: any) => (
        <>
          <p className={classes.primaryText}>{data.row.original.route}</p>
          <span className={classes.subText}>
            {data.row.original.service_points}
            {t('billing:servicePoints')}
          </span>
        </>
      ),
    },
    {
      Header: t('billing:billed'),
      accessor: 'billed',
    },
    {
      Header: t('billing:workingMeter'),
      accessor: 'working_meters',
    },
    ,
    {
      Header: t('billing:faultyMeter'),
      accessor: 'faulty_meters',
    },
    ,
    {
      Header: t('billing:noMeter'),
      accessor: 'no_meters',
    },
    ,
    {
      Header: t('common:exceptions'),
      accessor: 'exceptions',
    },
    ,
    {
      Header: t('billing:unBilled'),
      accessor: 'unbilled',
    },
    {
      Header: '',
      accessor: 'service_points',
      Cell: (data: any) => (
        <div className="actionButtons">
          <CustomizedDropdown
            open={true}
            renderTriggerElement={handleClick => (
              <Button
                disableElevation
                color="primary"
                variant="text"
                onClick={handleClick}
                endIcon={<ArrowDownIcon className={classes.arrowIcon} />}
              >
                {t('common:check')}
              </Button>
            )}
          >
            {handleClose => (
              <Box display="grid" className={classes.dropDownOptions}>
                <Link to="./#">{t('billing:randomBills')}</Link>
                <Link to="./#">{t('billing:allBilled')}</Link>
                <Link to="/billing/working-meters">{t('billing:allWorkingMeters')}</Link>
                <Link to="./#">{t('billing:allFaultyMeters')}</Link>
                <Link to="./#">{t('billing:noMeters')}</Link>
                <Link to="./#">{t('common:exceptions')}</Link>
                <Link to="./#">{t('billing:unBilled')}</Link>
              </Box>
            )}
          </CustomizedDropdown>
        </div>
      ),
    },
  ];

  const filterBillsTablePagination = BillsData.meta_data[0].pagination;
  const handleChangePage = () => {};
  const handleChangeRowsPerPage = () => {};

  const handleSearchInputChange = (e: any) => {
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
          handleSortingMenuChange={handleSortingMenuChange}
        />
      </FilterContainer>

      <Table
        columns={columns}
        data={finalizeBillsData}
        enableRowSelect
        rowsPerPage={filterBillsTablePagination?.per_page || 10}
        hoverableRow
        renderPagination={() => (
          <TablePagination
            paginationData={filterBillsTablePagination}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        )}
      />
    </>
  );
};

export default FinalizeBills;
