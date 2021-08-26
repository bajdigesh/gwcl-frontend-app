import { Box, Typography } from '@material-ui/core';
import { DeleteIcon, EditIcon, ShareIcon } from 'assets/images';
import Table, { IndeterminateCheckbox } from 'components/Table';
import { sortingOrder } from 'global/constants';
import Filters from 'pages/Customer/ClusterCustomers/Shared/Filters';
import useStyles from 'pages/Customer/ClusterCustomers/Shared/listStyles';
import CustomerData from 'pages/Customer/CustomerData';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IGetClusterCustomersSearchQuery } from '../Shared/types';

const ServicePointList: React.FC<any> = () => {
  const classes = useStyles();
  const { t } = useTranslation(['common', 'customers']);
  const [servicePointList, setServicePointList] = useState<any>([]);
  const [filterSchema, setFilterSchema] = useState<IGetClusterCustomersSearchQuery>({
    page: 1,
    page_size: 15,
    region_id: '',
    district_id: '',
    start_date: '',
    end_date: '',
    search: '',
    service_categories: '',
    customer_status: '',
    meter_status: '',
    lifeline_customers: '',
    orderBy: 'id',
    order: sortingOrder.ASCENDING,
  });
  useEffect(() => {
    const data = CustomerData.servicePoints;
    setServicePointList(data);
  }, []);
  //Filter form handler
  const handleFilterFormSubmit = useCallback(() => {}, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearchInputChange = useCallback(() => {}, []);

  const handleSortingMenuChange = useCallback(() => {}, []);
  const columns = [
    {
      id: 'selection',
      width: '1px',
      Header: ({ getToggleAllRowsSelectedProps }: any) => {
        return <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />;
      },
      Cell: ({ row }: any) => {
        return <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />;
      },
    },
    {
      Header: 'User Name',
      accessor: 'user_name',
      Cell: (data: any) => {
        const rowVal = data.row.original;

        return (
          <div>
            <Typography variant="body2" component="div" color="primary" gutterBottom role="button">
              {data.row.original.user_name}
            </Typography>
            <Typography variant="subtitle2">{rowVal.user_id}</Typography>
          </div>
        );
      },
    },
    {
      Header: 'Payment Date',
      accessor: 'payment_date',
      Cell: (data: any) => (
        <Typography variant="body2" color="textSecondary">
          {t('common:lastPaymentOn')} {data.row.original.payment_date}
        </Typography>
      ),
    },
    {
      Header: '',
      accessor: 'name',
      Cell: (data: any) => (
        <Box display="flex" alignItems="center" className="actionButtons">
          <p>
            <EditIcon />
          </p>
          <p>
            <ShareIcon />
          </p>
          <p>
            <DeleteIcon />
          </p>
        </Box>
      ),
    },
  ];
  return (
    <>
      <Box className={classes.tableFilterContainer}>
        <Typography variant="h5">
          {servicePointList.length} {t('customers:servicePoints')}{' '}
        </Typography>
        <Filters
          sortedOrder={filterSchema.order!}
          handleSearchInputChange={handleSearchInputChange}
          handleFilterFormSubmit={handleFilterFormSubmit}
          handleSortingMenuChange={handleSortingMenuChange}
        />
      </Box>
      <div className={classes.tableContainer}>
        <Table columns={columns} data={servicePointList} hoverableRow enableRowSelect hideTableHead />
      </div>
    </>
  );
};
export default ServicePointList;
