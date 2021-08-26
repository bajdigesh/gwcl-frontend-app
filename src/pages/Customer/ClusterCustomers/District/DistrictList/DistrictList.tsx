import { Box, Hidden, Typography } from '@material-ui/core';
import { DeleteIcon, EditIcon, FilterIcon, ShareIcon } from 'assets/images';
import Button from 'components/Button';
import { ControllableDrawer } from 'components/Drawer';
import Table, { IndeterminateCheckbox } from 'components/Table';
import { sortingOrder } from 'global/constants';
import Filters from 'pages/Customer/ClusterCustomers/Shared/Filters';
import useStyles from 'pages/Customer/ClusterCustomers/Shared/listStyles';
import CustomerData from 'pages/Customer/CustomerData';
import { ClusterCustomerFilterForm } from 'pages/Customer/RightDrawer';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IGetClusterCustomersSearchQuery } from '../../Shared/types';

interface IProps {
  toggleShowDetail?: () => void;
}

const DistrictList = ({ toggleShowDetail }: IProps) => {
  const classes = useStyles();
  const { t } = useTranslation(['common']);
  const [checked, setChecked] = React.useState([0]);
  const [districtList, setDistrictList] = useState<any>([]);
  const [deleteConfirmationDialog, setDeleteConfirmationDialog] = useState(false);
  const [deleteById, setDeleteById] = useState<number | null>(null);
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
      Header: 'District Name',
      accessor: 'district_name',
      Cell: (data: any) => {
        const rowVal = data.row.original;
        return (
          <>
            <Typography
              variant="body2"
              component="div"
              color="primary"
              gutterBottom
              onClick={toggleShowDetail || undefined}
              role="button"
              style={{ cursor: 'pointer' }}
            >
              {data.row.original.district_name}
            </Typography>
            <Typography variant="subtitle2">
              {rowVal.region_name} | {rowVal.num_of_routes} {t('common:routes')}
            </Typography>
          </>
        );
      },
    },
    {
      Header: '',
      accessor: 'name',
      Cell: (data: any) => (
        <Box display="flex" alignItems="center" className="actionButtons">
          <p onClick={() => editDistrict(data.row.original)}>
            <EditIcon />
          </p>
          <p onClick={() => {}}>
            <ShareIcon onClick={() => {}} />
          </p>
          <p onClick={() => openDeleteConfirmationDialog(data.row.original?.id)}>
            <DeleteIcon />
          </p>
        </Box>
      ),
    },
  ];

  useEffect(() => {
    const data = CustomerData.districts;
    setDistrictList(data);
  }, []);

  const handleToggle = (value: any) => {
    const currentIndex = checked.indexOf(value.id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value.id);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const openDeleteConfirmationDialog = (id: number) => {
    setDeleteById(id);
    setDeleteConfirmationDialog(!deleteConfirmationDialog);
  };

  const editDistrict = (val: any) => {};
  //Filter form handler
  const handleFilterFormSubmit = useCallback(() => {}, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearchInputChange = useCallback(() => {}, []);

  const handleSortingMenuChange = useCallback(() => {}, []);

  return (
    <>
      <Box display="flex" flexWrap="wrap" alignItems="center" justifyContent="space-between">
        <Typography variant="h5">
          {districtList.length} {t('common:districts')}{' '}
        </Typography>
        <Hidden smDown>
          <Filters
            sortedOrder={filterSchema.order!}
            handleSearchInputChange={handleSearchInputChange}
            handleFilterFormSubmit={handleFilterFormSubmit}
            handleSortingMenuChange={handleSortingMenuChange}
          />
        </Hidden>

        <Hidden mdUp>
          <ControllableDrawer
            title={t('common:filters')}
            toggleElement={handleToggle => (
              <Button
                disableElevation
                color="inherit"
                variant="contained"
                onClick={handleToggle}
                className={classes.filterDrawerToggleButton}
                startIcon={<FilterIcon />}
              >
                {t('common:filters')}
              </Button>
            )}
          >
            {() => (
              <>
                <ClusterCustomerFilterForm handleFilterFormSubmit={handleFilterFormSubmit} />
                <Box className={classes.searchAndSort}>
                  <Filters
                    sortedOrder={filterSchema.order!}
                    handleSearchInputChange={handleSearchInputChange}
                    handleFilterFormSubmit={handleFilterFormSubmit}
                    handleSortingMenuChange={handleSortingMenuChange}
                  />
                </Box>
              </>
            )}
          </ControllableDrawer>
        </Hidden>
      </Box>
      <div className={classes.tableContainer}>
        <Table columns={columns} data={districtList} hoverableRow enableRowSelect hideTableHead />
      </div>
    </>
  );
};
export default DistrictList;
