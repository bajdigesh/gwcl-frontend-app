import { Box, Tooltip, Typography } from '@material-ui/core';
import { unwrapResult } from '@reduxjs/toolkit';
import { DeleteIcon, EditIcon } from 'assets/images';
import Button from 'components/Button';
import { ConfirmationDialog } from 'components/Dialog';
import Drawer from 'components/Drawer';
import { FilterContainer } from 'components/Filters';
import Table, { IndeterminateCheckbox, TablePagination } from 'components/Table';
import { TitleSecondary } from 'components/Title';
import { format } from 'date-fns';
import { MONTH_DAY_YEAR_FORMAT, sortingOrder } from 'global/constants';
import routePath from 'global/routePaths';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  deletePhoneById,
  getPhones,
  resetGetPhonesState,
  selectDeletePhoneById,
  selectGetPhonesState,
} from 'store/device/phones';
import { useAppDispatch } from 'store/store';
import { debounce, encrypt } from 'utils';
import { useDrawerToggle, useToggle } from 'utils/hooks';
import AddPhone from '../RightDrawer/AddPhone/AddPhone';
import { phoneInitialData } from '../RightDrawer/AddPhone/schema';
import { formatPhoneFormData } from '../Shared/formatPhoneFormData';
import { IPhoneSearchQuery } from '../Shared/types';
import Filters from './Filters';

interface IProps {}

const PhonesList: React.FC<IProps> = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation(['common', 'devices']);
  const { status, data } = useSelector(selectGetPhonesState);
  const [phoneData, setPhoneData] = useState(phoneInitialData);
  const { openDrawer, toggleDrawer } = useDrawerToggle();
  const [dialogIds, setDialogIds] = useState<Array<number> | null>(null);
  const { open: openDeleteConfirmationDialog, toggleOpen: toggleDeleteConfirmationDialog } = useToggle();
  const { status: deletePhoneByIdStatus } = useSelector(selectDeletePhoneById);

  const [filterSchema, setFilterSchema] = useState<IPhoneSearchQuery>({
    page: 1,
    page_size: 15,
    assigned_to_user_id: '',
    user_phone_status_id: '',
    search: '',
    orderBy: 'id',
    order: sortingOrder.ASCENDING,
  });

  useEffect(() => {
    const promise = dispatch(getPhones(filterSchema));

    return () => {
      dispatch(resetGetPhonesState());
      promise.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    {
      id: 'selection',
      width: 22,
      Header: ({ getToggleAllRowsSelectedProps }: any) => {
        return <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />;
      },
      Cell: ({ row }: any) => {
        return <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />;
      },
    },
    {
      Header: 'IMEI',
      accessor: 'imei',
      Cell: (data: any) => (
        <Link
          to={routePath.devices.phoneDetail.replace(':id', encrypt(data.row.original?.id))}
          style={{ textDecoration: 'none' }}
        >
          <Typography color="primary" variant="body2">
            {data.row.original.IMEI}
          </Typography>
        </Link>
      ),
    },
    {
      Header: t('devices:assignedTo'),
      accessor: 'assigned_to',
      Cell: (data: any) => (
        <>{`${data.row.original.assigned_to_user.first_name} ${data.row.original.assigned_to_user.last_name || ''}`}</>
      ),
    },
    {
      Header: t('devices:model'),
      accessor: 'model',
      Cell: (data: any) => <>{data.row.original.user_phone_model.name}</>,
    },
    {
      Header: t('devices:status'),
      accessor: 'status',
      Cell: (data: any) => <>{data.row.original.user_phone_status.name}</>,
    },
    {
      Header: t('devices:recievedDate'),
      accessor: 'received_date',
      Cell: (data: any) =>
        data.row.original?.received_date
          ? format(new Date(data.row.original.received_date), MONTH_DAY_YEAR_FORMAT)
          : 'N/A',
    },
    {
      Header: t('devices:retirenmentDate'),
      accessor: 'retirement_date',
      Cell: (data: any) =>
        data.row.original?.retirement_date
          ? format(new Date(data.row.original.retirement_date), MONTH_DAY_YEAR_FORMAT)
          : 'N/A',
    },
    {
      Header: t('devices:monthlyDataAllowance'),
      accessor: 'monthly_date_allowance',
      width: 205,
      Cell: (data: any) => <>{data.row.original.monthly_data_allowance}</>,
    },
    {
      Header: '',
      accessor: 'actions',
      Cell: (data: any) => (
        <Box display="flex" alignItems="center" className="actionButtons">
          <p onClick={() => handleEditPhoneClick(data.row.original)}>
            <Tooltip title={t('devices:editPhone')} arrow>
              <EditIcon />
            </Tooltip>
          </p>

          <p onClick={() => handleDeletePhoneClick(data.row.original?.id)}>
            <Tooltip title={t('devices:deletePhone')} arrow>
              <DeleteIcon />
            </Tooltip>
          </p>
        </Box>
      ),
    },
  ];

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    const updatedFilterSchema = { ...filterSchema, page: ++newPage, page_size: filterSchema?.page_size };
    setFilterSchema(updatedFilterSchema);
    dispatch(getPhones(updatedFilterSchema));
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const pageSize = event.target.value;
    const updatedFilterSchema = { ...filterSchema, page: 1, page_size: +pageSize };
    setFilterSchema(updatedFilterSchema);
    dispatch(getPhones(updatedFilterSchema));
  };

  const handleFilterFormSubmit = (values: any) => {
    const updatedFilterSchema = {
      ...filterSchema,
      assigned_to_user_id: values?.assigned_to_user_id?.value,
      user_phone_status_id: values?.user_phone_status_id?.value,
    };
    setFilterSchema(updatedFilterSchema);
    dispatch(getPhones(updatedFilterSchema));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearchInputChange = useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      const searchValue = e.target.value;
      const updatedFilterSchema = { ...filterSchema, search: searchValue };
      setFilterSchema(updatedFilterSchema);
      dispatch(getPhones(updatedFilterSchema));
    }, 500),
    [filterSchema, dispatch]
  );

  const handleSortingMenuChange = useCallback(
    (data: IAutoCompleteOption) => {
      console.log(data);
      if (data.value === filterSchema.order) return;

      const updatedFilterSchema = { ...filterSchema, order: data.value };
      setFilterSchema(updatedFilterSchema);
      dispatch(getPhones(updatedFilterSchema));
    },
    [filterSchema, dispatch]
  );

  const handleAddPhoneClick = async () => {
    setPhoneData(phoneInitialData);
    toggleDrawer();
  };

  const handlePhoneAddSuccess = () => {
    dispatch(getPhones(filterSchema));
  };

  const handleEditPhoneClick = (rowData: any) => {
    const formData = formatPhoneFormData(rowData);
    setPhoneData(formData);
    toggleDrawer();
  };

  const handleDeletePhoneClick = (id: number) => {
    setDialogIds([id]);
    toggleDeleteConfirmationDialog();
  };

  const handleConfirmDelete = () => {
    dispatch(deletePhoneById({ id: dialogIds![0] }))
      .then(unwrapResult)
      .then(_ => {
        dispatch(getPhones(filterSchema));
        toggleDeleteConfirmationDialog(false);
        setDialogIds(null);
      });
  };

  return (
    <>
      <ConfirmationDialog
        title={t('devices:deletePhone')}
        open={openDeleteConfirmationDialog}
        toggleDialog={toggleDeleteConfirmationDialog}
        loading={deletePhoneByIdStatus === 'loading'}
        handleConfirmationClick={handleConfirmDelete}
      />

      <Drawer open={openDrawer} toggleDrawer={toggleDrawer}>
        <AddPhone formValues={phoneData} onSuccess={handlePhoneAddSuccess} toggleDrawer={toggleDrawer} />
      </Drawer>

      <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom={{ xs: 1, md: 3 }}>
        <TitleSecondary>
          {data?.meta_data?.pagination?.total} {t('devices:phones')}
        </TitleSecondary>

        <Button disableElevation color="primary" variant="contained" onClick={handleAddPhoneClick}>
          {t('devices:addPhone')}
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

      <Table
        columns={columns}
        data={data?.payload || []}
        enableRowSelect
        hoverableRow
        loading={status === 'loading'}
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
export default PhonesList;
