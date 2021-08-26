import { Box, Hidden, Typography } from '@material-ui/core';
import { DeleteIcon, EditIcon, FilterIcon, ShareIcon } from 'assets/images';
import Button from 'components/Button';
import { ControllableDrawer } from 'components/Drawer';
import Table, { IndeterminateCheckbox } from 'components/Table';
import { sortingOrder } from 'global/constants';
import Filters from 'pages/Customer/ClusterCustomers/Shared/Filters';
import useStyles from 'pages/Customer/ClusterCustomers/Shared/listStyles';
import { IGetClusterCustomersSearchQuery } from 'pages/Customer/ClusterCustomers/Shared/types';
import CustomerData from 'pages/Customer/CustomerData';
import { ClusterCustomerFilterForm } from 'pages/Customer/RightDrawer';
import RightDrawer from 'pages/Payments/RightDrawer';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
interface IProps {
  toggleShowDetail?: () => void;
}

const RegionList: React.FC<IProps> = ({ toggleShowDetail }) => {
  const { t } = useTranslation(['common']);
  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);
  const [regionList, setRegionList] = useState<any>([]);
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
      Header: 'Region Name',
      accessor: 'region_name',
      Cell: (data: any) => {
        const rowVal = data.row.original;
        return (
          <>
            <Typography
              variant="body2"
              component="div"
              color="primary"
              gutterBottom
              onClick={toggleShowDetail}
              role="button"
              style={{ cursor: 'pointer' }}
            >
              {data.row.original.region_name}
            </Typography>
            <Typography variant="subtitle2">
              {rowVal.num_of_districts} {t('common:districts')} | {rowVal.num_of_routes} {t('common:routes')}
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
          <p onClick={() => editRegion(data.row.original)}>
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
    const data = CustomerData.regions;
    setRegionList(data);
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

  const editRegion = (val: any) => {};

  //Filter form handler
  const handleFilterFormSubmit = useCallback(() => {}, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearchInputChange = useCallback(() => {}, []);

  const handleSortingMenuChange = useCallback(() => {}, []);

  return (
    <>
      <Box display="flex" flexWrap="wrap" alignItems="center" justifyContent="space-between">
        <Typography variant="h5">
          {regionList.length} {t('common:regions')}{' '}
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
              <RightDrawer>
                <Box margin={{ xs: -3, md: 0 }}>
                  <ClusterCustomerFilterForm handleFilterFormSubmit={handleFilterFormSubmit} />
                  <Box className={classes.searchAndSort}>
                    <Filters
                      sortedOrder={filterSchema.order!}
                      handleSearchInputChange={handleSearchInputChange}
                      handleFilterFormSubmit={handleFilterFormSubmit}
                      handleSortingMenuChange={handleSortingMenuChange}
                    />
                  </Box>
                </Box>
              </RightDrawer>
            )}
          </ControllableDrawer>
        </Hidden>
      </Box>
      <div className={classes.tableContainer}>
        <Table columns={columns} data={regionList} hoverableRow enableRowSelect hideTableHead />
      </div>
    </>
  );
};
export default RegionList;
