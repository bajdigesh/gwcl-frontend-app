import { Box, Tooltip } from '@material-ui/core';
import { unwrapResult } from '@reduxjs/toolkit';
import { DeleteIcon, EditIcon, VerifiedIcon, WarningIcon } from 'assets/images';
import clsx from 'clsx';
import { FilterContainer } from 'components/Filters';
import Table, { IndeterminateCheckbox, TablePagination } from 'components/Table';
import { TitleSecondary } from 'components/Title';
import { ConfirmationDialog } from 'components/Dialog';
import Drawer from 'components/Drawer';
import { sortingOrder } from 'global/constants';
import routePath from 'global/routePaths';
import { IMeterSearchQuery } from 'pages/Devices/Shared/types';
import MeterForm from 'pages/Devices/RightDrawer/MeterForm';
import { meterFormData } from 'pages/Devices/RightDrawer/MeterForm/schema';
import { formatMeterFormData } from 'pages/Devices/Shared/formatMeterFormData';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  deleteMeterById,
  getMeters,
  resetGetMetersState,
  selectDeleteMeterByIdState,
  selectGetMetersState,
} from 'store/device/meters';
import { useAppDispatch } from 'store/store';
import { debounce, encrypt } from 'utils';
import { useDrawerToggle, useToggle } from 'utils/hooks';
import Filters from './Filters';
import useStyles from './styles';

interface IProps {}

const Meters: React.FC<IProps> = () => {
  const classes = useStyles();
  const { t } = useTranslation(['common', 'devices']);
  const dispatch = useAppDispatch();
  const { status, data } = useSelector(selectGetMetersState);
  const [formData, setFormData] = useState<typeof meterFormData>(meterFormData);
  const { status: deleteMeterStatus } = useSelector(selectDeleteMeterByIdState);
  const { openDrawer, toggleDrawer } = useDrawerToggle();
  const { open: openDeleteMeterConfirmationDialog, toggleOpen: toggleDeleteMeterConfirmDialog } = useToggle();
  const [dialogIds, setDialogIds] = useState<Array<string> | null>(null);
  const [filterSchema, setFilterSchema] = useState<IMeterSearchQuery>({
    page: 1,
    page_size: 10,
    region_id: '',
    district_id: '',
    search: '',
    orderBy: 'meter_number',
    order: sortingOrder.ASCENDING,
  });

  useEffect(() => {
    const promise = dispatch(getMeters(filterSchema));
    return () => {
      dispatch(resetGetMetersState());
      promise.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

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
      Header: t('devices:meterNumber'),
      accessor: 'meter_number',
      Cell: (data: any) => (
        <>
          <Link
            className={classes.meterNumber}
            to={routePath.devices.meterDetail.replace(':id', encrypt(data.row.original.id))}
          >
            {data.row.original.meter_number}
          </Link>
        </>
      ),
    },
    {
      Header: t('common:account'),
      accessor: 'account',
      Cell: (data: any) => (
        <>
          <p className={classes.accountName}>{data?.row.original.customer ? data.row.original.customer : 'N/A'}</p>
          <span className={classes.accountNumber}>
            {data?.row.original.customer_id ? data.row.original.customer_id : 'N/A'}
          </span>
        </>
      ),
    },
    {
      Header: t('common:meterStatus'),
      accessor: 'status',
      Cell: (data: any) => (
        <>
          {data?.row.original.status?.is_working ? (
            <p className={clsx(classes.meterStatus, classes.statusActive)}>
              <VerifiedIcon />
              <span>{data?.row.original.status?.name}</span>
            </p>
          ) : (
            <p className={clsx(classes.meterStatus, classes.statusInActive)}>
              <WarningIcon />
              <span>{data?.row.original.status?.name}</span>
            </p>
          )}
        </>
      ),
    },
    {
      Header: t('common:meterType'),
      accessor: 'type',
      Cell: (data: any) => (
        <>
          <p>{data?.row.original.type?.name}</p>
          <p className={classes.concentratorNumber}>
            {data?.row.original.concentrator ? `Conc: ${data.row.original.concentrator.concentrator_number}` : 'N/A'}
          </p>
        </>
      ),
    },
    {
      Header: t('common:location'),
      accessor: 'location',
      Cell: (data: any) => (
        <>
          {data?.row.original.premises?.address_1}, {data?.row.original.premises?.address_2 || 'N/A'}
        </>
      ),
    },
    {
      Header: t('devices:lastReading'),
      accessor: 'state',
      Cell: (data: any) => (
        <>
          {data?.row.original.reading_date ? (
            <>
              <p className={classes.cost}>{data?.row.original.meter_charge}</p>
              <span className={classes.readingDate}>on Jul 24, 2020</span>
            </>
          ) : (
            'N/A'
          )}
        </>
      ),
    },
    {
      Header: '',
      accessor: 'first_name',
      Cell: (data: any) => (
        <Box display="flex" alignItems="center" className="actionButtons">
          <p onClick={() => handleEditMeterClick(data.row.original)}>
            <Tooltip title={t('devices:editMeter')} arrow>
              <EditIcon />
            </Tooltip>
          </p>
          <p onClick={() => handleDeleteMeterClick(data.row.original?.id)}>
            <Tooltip title={t('devices:deleteMeter')} arrow>
              <DeleteIcon />
            </Tooltip>
          </p>
        </Box>
      ),
    },
  ];

  //Filter form handler
  const handleFilterFormSubmit = (values: any) => {
    const updatedFilterSchema = {
      ...filterSchema,
      region_id: values.region_id?.value,
      district_id: values.district_id?.value,
      route_id: values.route_id?.value,
    };
    setFilterSchema(updatedFilterSchema);
    dispatch(getMeters(updatedFilterSchema));
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    const updatedFilterSchema = { ...filterSchema, page: ++newPage, page_size: filterSchema?.page_size };
    setFilterSchema(updatedFilterSchema);
    dispatch(getMeters(updatedFilterSchema));
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const pageSize = event.target.value;
    const updatedFilterSchema = { ...filterSchema, page: 1, page_size: +pageSize };
    setFilterSchema(updatedFilterSchema);
    dispatch(getMeters(updatedFilterSchema));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearchInputChange = useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      const searchValue = e.target.value;
      const updatedFilterSchema = { ...filterSchema, search: searchValue };
      setFilterSchema(updatedFilterSchema);
      dispatch(getMeters(updatedFilterSchema));
    }, 500),
    [filterSchema, dispatch]
  );

  const handleSortingMenuChange = useCallback(
    (data: IAutoCompleteOption) => {
      console.log(data);
      if (data.value === filterSchema.order) return;

      const updatedFilterSchema = { ...filterSchema, order: data.value };
      setFilterSchema(updatedFilterSchema);
      dispatch(getMeters(updatedFilterSchema));
    },
    [filterSchema, dispatch]
  );
  const handleEditMeterClick = (rowMeter: any) => {
    const formData = formatMeterFormData(rowMeter);
    setFormData(formData);
    toggleDrawer();
  };
  const handleDeleteMeterClick = (id: number) => {
    setDialogIds([id.toString()]);
    toggleDeleteMeterConfirmDialog();
  };
  const handleMeterSaveSuccess = () => {};
  const onDeleteMeter = () => {
    dispatch(deleteMeterById(dialogIds![0]))
      .then(unwrapResult)
      .then(_ => {
        dispatch(getMeters(filterSchema));
        toggleDeleteMeterConfirmDialog(false);
        setDialogIds(null);
      });
  };

  return (
    <>
      <Drawer open={openDrawer} toggleDrawer={toggleDrawer}>
        <MeterForm formValues={formData} onSuccess={handleMeterSaveSuccess} toggleDrawer={toggleDrawer} />
      </Drawer>
      <ConfirmationDialog
        title={t('devices:confirmDeleteMeter')}
        open={openDeleteMeterConfirmationDialog}
        toggleDialog={toggleDeleteMeterConfirmDialog}
        loading={deleteMeterStatus === 'loading'}
        handleConfirmationClick={onDeleteMeter}
      />

      <TitleSecondary>
        {data?.meta_data?.pagination?.total} {t('devices:meters')}
      </TitleSecondary>
      <FilterContainer>
        <Filters
          sortedOrder={filterSchema.order!}
          handleSearchInputChange={handleSearchInputChange}
          handleFilterFormSubmit={handleFilterFormSubmit}
          handleSortingMenuChange={handleSortingMenuChange}
        />
      </FilterContainer>
      <Table
        hoverableRow
        enableRowSelect
        columns={columns}
        loading={status === 'loading'}
        data={data?.payload || []}
        rowsPerPage={data?.meta_data?.pagination?.per_page || 10}
        renderPagination={() => (
          <TablePagination
            paginationData={data?.meta_data?.pagination}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        )}
      />
    </>
  );
};
export default Meters;
