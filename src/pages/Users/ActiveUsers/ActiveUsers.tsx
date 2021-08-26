import { Box, SvgIcon, Tooltip } from '@material-ui/core';
import { unwrapResult } from '@reduxjs/toolkit';
import { BanIcon, DeleteIcon, EditIcon, ExclamationIcon, MailIcon, PhoneIcon, VerifiedIcon } from 'assets/images';
import Button from 'components/Button';
import { ConfirmationDialog } from 'components/Dialog';
import Drawer from 'components/Drawer';
import { FilterContainer } from 'components/Filters';
import Table, { IndeterminateCheckbox, TableFooter, TablePagination } from 'components/Table';
import { TitleSecondary } from 'components/Title';
import { format } from 'date-fns';
import { MONTH_DAY_YEAR_TIME_FORMAT, sortingOrder, YEAR_MONTH_DAY_HYPHEN_FORMAT } from 'global/constants';
import routePaths from 'global/routePaths';
import UserForm from 'pages/Users/RightDrawer/UserForm';
import { userFormData } from 'pages/Users/RightDrawer/UserForm/schema';
import Filters from 'pages/Users/Shared/Filters';
import { useStyles } from 'pages/Users/Shared/styles';
import { IGetUsersSearchQuery } from 'pages/Users/Shared/types';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useAppDispatch } from 'store';
import {
  deleteMultipleUsers,
  getUsers,
  resetGetUsers,
  selectDeleteMultipleUsers,
  selectGetUsers,
  selectUpdateMultipleUsersActivation,
  updateMultipleUsersActivation,
} from 'store/users';
import { debounce, encrypt } from 'utils';
import { useDrawerToggle, useToggle } from 'utils/hooks';
import { formatUserFormData } from '../Shared/formatUserFormData';

interface IProps {}

const ActiveUsers: React.FC<IProps> = () => {
  const classes = useStyles();
  const { t } = useTranslation(['common', 'users']);
  const dispatch = useAppDispatch();
  const { data: getUsersData, status } = useSelector(selectGetUsers);
  const { status: deleteMultipleUsersStatus } = useSelector(selectDeleteMultipleUsers);
  const { status: updateMultipleUsersActivationStatus } = useSelector(selectUpdateMultipleUsersActivation);
  const { openDrawer, toggleDrawer } = useDrawerToggle();
  const { open: openDeactivateConfirmationDialog, toggleOpen: toggleDeactivateConfirmationDialog } = useToggle();
  const { open: openDeleteConfirmationDialog, toggleOpen: toggleDeleteConfirmationDialog } = useToggle();
  const [userData, setUserData] = useState(userFormData);
  const [dialogIds, setDialogIds] = useState<Array<number> | null>(null);
  const [filterSchema, setFilterSchema] = useState<IGetUsersSearchQuery>({
    technicians: 'false',
    page: 1,
    page_size: 10,
    region_id: '',
    district_id: '',
    start_date: '',
    end_date: '',
    search: '',
    orderBy: 'id',
    order: sortingOrder.ASCENDING,
  });

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
      Header: t('users:name'),
      accessor: 'name',
      Cell: (data: any) => (
        <>
          <Box display="flex" alignItems="center" component="p">
            <Link
              className={classes.userName}
              to={routePaths.users.userDetails.replace(':id', encrypt(data.row.original.id))}
            >
              {data.row.original.first_name} {data.row.original.last_name}
            </Link>
            {data.row.original.verified ? (
              <VerifiedIcon className={classes.statusIcon} />
            ) : (
              <ExclamationIcon className={classes.statusIcon} />
            )}
          </Box>
          <p className={classes.staffCode}>{data.row.original.staff_id}</p>
        </>
      ),
    },
    {
      Header: t('users:contact'),
      accessor: 'contact',
      Cell: (data: any) => (
        <>
          <Box
            display="flex"
            alignItems="center"
            component="p"
            title={data.row.original.email}
            className={classes.contactInfo}
          >
            <MailIcon />
            <span>{data.row.original.email}</span>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            component="p"
            title={data.row.original.mobile}
            className={classes.contactInfo}
          >
            <PhoneIcon />
            <span>{data.row.original.mobile}</span>
          </Box>
        </>
      ),
    },
    {
      Header: t('users:role'),
      accessor: 'role',
      Cell: (data: any) => <>{data.row.original.role.name}</>,
    },
    {
      Header: t('users:level'),
      accessor: 'level',
    },
    {
      Header: t('common:addedOn'),
      accessor: 'created_at',
      Cell: (data: any) => {
        return <>{format(new Date(data.value), MONTH_DAY_YEAR_TIME_FORMAT)}</>;
      },
    },
    {
      Header: '',
      accessor: 'actions',
      Cell: (data: any) => (
        <Box display="flex" alignItems="center" className="actionButtons">
          <p onClick={() => handleEditUserClick(data.row.original)}>
            <Tooltip title={t('users:editUser')} arrow>
              <EditIcon />
            </Tooltip>
          </p>
          <p onClick={() => handleDeactiveIconClick(data.row.original?.id)}>
            <Tooltip title={t('users:deactivateUser')} arrow>
              <BanIcon />
            </Tooltip>
          </p>

          <p onClick={() => handleDeleteIconClick(data.row.original?.id)}>
            <Tooltip title={t('users:deleteUser')} arrow>
              <DeleteIcon />
            </Tooltip>
          </p>
        </Box>
      ),
    },
  ];

  useEffect(() => {
    const promise = dispatch(getUsers(filterSchema));

    return () => {
      dispatch(resetGetUsers());
      promise.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  // Users Dialog handler
  const handleAddUserClick = async () => {
    setUserData(userFormData);
    toggleDrawer();
  };

  const handleEditUserClick = (rowUser: any) => {
    const formData = formatUserFormData(rowUser);
    setUserData(formData);
    toggleDrawer();
  };

  const handleUserAddSuccess = () => {
    dispatch(getUsers(filterSchema));
  };

  // deactivate user handler
  const handleDeactiveIconClick = (id: number) => {
    setDialogIds([id]);
    toggleDeactivateConfirmationDialog();
  };

  const handleDeactivateButtonClick = (selectedRows: any) => {
    const ids = selectedRows.map((row: any) => row.original.id);
    setDialogIds(ids);
    toggleDeactivateConfirmationDialog();
  };

  const deactivateUsers = () => {
    const data = { ids: dialogIds!, value: false };
    dispatch(updateMultipleUsersActivation(data))
      .then(unwrapResult)
      .then(_ => {
        dispatch(getUsers(filterSchema));
        toggleDeactivateConfirmationDialog(false);
        setDialogIds(null);
      });
  };

  // delete user handler
  const handleDeleteIconClick = (id: number) => {
    setDialogIds([id]);
    toggleDeleteConfirmationDialog();
  };

  const handleDeleteButtonClick = (selectedRows: any) => {
    const ids = selectedRows.map((row: any) => row.original.id);
    setDialogIds(ids);
    toggleDeleteConfirmationDialog();
  };

  const deleteUsers = () => {
    const data = { ids: dialogIds! };
    dispatch(deleteMultipleUsers(data))
      .then(unwrapResult)
      .then(_ => {
        dispatch(getUsers(filterSchema));
        toggleDeleteConfirmationDialog(false);
        setDialogIds(null);
      });
  };

  // Pagination handler
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    const updatedFilterSchema = { ...filterSchema, page: ++newPage, page_size: filterSchema?.page_size };
    setFilterSchema(updatedFilterSchema);
    dispatch(getUsers(updatedFilterSchema));
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const pageSize = event.target.value;
    const updatedFilterSchema = { ...filterSchema, page: 1, page_size: +pageSize };
    setFilterSchema(updatedFilterSchema);
    dispatch(getUsers(updatedFilterSchema));
  };

  //Filter form handler
  const handleFilterFormSubmit = useCallback(
    (values: any) => {
      const updatedFilterSchema = {
        ...filterSchema,
        region_id: values.region_id?.value,
        district_id: values.district_id?.value,
        start_date: values.start_date ? format(new Date(values.start_date), YEAR_MONTH_DAY_HYPHEN_FORMAT) : '',
        end_date: values.end_date ? format(new Date(values.end_date), YEAR_MONTH_DAY_HYPHEN_FORMAT) : '',
      };
      setFilterSchema(updatedFilterSchema);
      dispatch(getUsers(updatedFilterSchema));
    },
    [filterSchema, dispatch]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearchInputChange = useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      const searchValue = e.target.value;
      const updatedFilterSchema = { ...filterSchema, search: searchValue };
      setFilterSchema(updatedFilterSchema);
      dispatch(getUsers(updatedFilterSchema));
    }, 500),
    [filterSchema, dispatch]
  );

  const handleSortingMenuChange = useCallback(
    (data: IAutoCompleteOption) => {
      console.log(data);
      if (data.value === filterSchema.order) return;

      const updatedFilterSchema = { ...filterSchema, order: data.value };
      setFilterSchema(updatedFilterSchema);
      dispatch(getUsers(updatedFilterSchema));
    },
    [filterSchema, dispatch]
  );

  return (
    <>
      <Drawer open={openDrawer} toggleDrawer={toggleDrawer}>
        <UserForm formValues={userData} onSuccess={handleUserAddSuccess} toggleDrawer={toggleDrawer} />
      </Drawer>

      <ConfirmationDialog
        title={t('users:confirmDeleteUser')}
        open={openDeleteConfirmationDialog}
        toggleDialog={toggleDeleteConfirmationDialog}
        loading={deleteMultipleUsersStatus === 'loading'}
        handleConfirmationClick={deleteUsers}
      />

      <ConfirmationDialog
        title={t('users:confirmDeactivateUser')}
        open={openDeactivateConfirmationDialog}
        toggleDialog={toggleDeactivateConfirmationDialog}
        loading={updateMultipleUsersActivationStatus === 'loading'}
        handleConfirmationClick={deactivateUsers}
      />

      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        marginBottom={{ xs: 1, md: 3 }}
        className={classes.userTitle}
      >
        <TitleSecondary>
          {getUsersData?.meta_data?.pagination?.total} {t('users:activeUsers')}
        </TitleSecondary>
        <Button disableElevation color="primary" variant="contained" onClick={handleAddUserClick}>
          {t('users:addUser')}
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
        data={getUsersData?.payload || []}
        loading={status === 'loading'}
        hoverableRow
        enableRowSelect
        rowsPerPage={getUsersData?.meta_data?.pagination?.per_page || 10}
        renderTableFooter={selectedFlatRows => (
          <TableFooter selectedRows={selectedFlatRows}>
            <Button
              size="large"
              className={classes.deactivateBtn}
              variant="outlined"
              onClick={() => handleDeactivateButtonClick(selectedFlatRows)}
              startIcon={
                <SvgIcon viewBox="0 0 16 16">
                  <BanIcon />
                </SvgIcon>
              }
            >
              {t('users:deactivate')}
            </Button>
            <Button
              size="large"
              className={classes.deleteBtn}
              variant="outlined"
              onClick={() => handleDeleteButtonClick(selectedFlatRows)}
              startIcon={
                <SvgIcon viewBox="0 0 16 16">
                  <DeleteIcon />
                </SvgIcon>
              }
            >
              {t('users:delete')}
            </Button>
          </TableFooter>
        )}
        renderPagination={() => (
          <TablePagination
            paginationData={getUsersData?.meta_data?.pagination}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        )}
      />
    </>
  );
};
export default ActiveUsers;
