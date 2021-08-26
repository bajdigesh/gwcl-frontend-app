import { Box, debounce, SvgIcon, Tooltip } from '@material-ui/core';
import { unwrapResult } from '@reduxjs/toolkit';
import { DeleteIcon, MailIcon, PhoneIcon, RetryIcon } from 'assets/images';
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
  getInactiveUsers,
  resetGetInactiveUsers,
  selectDeleteMultipleUsers,
  selectGetInactiveUsers,
  selectUpdateMultipleUsersActivation,
  updateMultipleUsersActivation,
} from 'store/users';
import { encrypt } from 'utils';
import { useDrawerToggle, useToggle } from 'utils/hooks';

interface IProps {}

const InactiveUsers: React.FC<IProps> = props => {
  const classes = useStyles();
  const { t } = useTranslation(['common', 'users']);
  const dispatch = useAppDispatch();
  const { data: getInactiveUsersData, status } = useSelector(selectGetInactiveUsers);
  const { status: deleteMultipleUsersStatus } = useSelector(selectDeleteMultipleUsers);
  const { status: updateMultipleUsersActivationStatus } = useSelector(selectUpdateMultipleUsersActivation);
  const [dialogIds, setDialogIds] = useState<Array<number> | null>(null);
  const { open: openActivateConfirmationDialog, toggleOpen: toggleActivateConfirmationDialog } = useToggle();
  const { open: openDeleteConfirmationDialog, toggleOpen: toggleDeleteConfirmationDialog } = useToggle();
  const { openDrawer, toggleDrawer } = useDrawerToggle();
  const [filterSchema, setFilterSchema] = useState<IGetUsersSearchQuery>({
    active: 'false',
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
      accessor: 'first_name',
      Cell: (data: any) => (
        <>
          <p>
            <Link
              className={classes.userName}
              to={routePaths.users.userDetails.replace(':id', encrypt(data.row.original.id))}
            >
              {data.row.original?.first_name} {data.row.original?.last_name}
            </Link>
          </p>
          <p className={classes.staffCode}>{data.row.original.staff_id}</p>
        </>
      ),
    },
    {
      Header: t('users:contact'),
      accessor: 'contact',
      Cell: (data: any) => (
        <>
          <Box display="flex" alignItems="center" title={data.row.original.email} className={classes.contactInfo}>
            <MailIcon />
            <span>{data.row.original.email}</span>
          </Box>
          <Box display="flex" alignItems="center" title={data.row.original.mobile} className={classes.contactInfo}>
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
      Cell: (data: any) => <>{format(new Date(data.value), MONTH_DAY_YEAR_TIME_FORMAT)}</>,
    },
    {
      Header: t('users:deactivatedOn'),
      accessor: 'updated_at',
      Cell: (data: any) => <>{format(new Date(data.value), MONTH_DAY_YEAR_TIME_FORMAT)}</>,
    },
    {
      Header: '',
      accessor: 'name',
      Cell: (data: any) => (
        <Box display="flex" alignItems="center" className="actionButtons">
          <p onClick={() => handleActivateIconClick(data.row.original?.id)}>
            <Tooltip title="Activate User" arrow>
              <RetryIcon />
            </Tooltip>
          </p>
          <p onClick={() => handleDeleteIconClick(data.row.original?.id)}>
            <Tooltip title="Delete User" arrow>
              <DeleteIcon />
            </Tooltip>
          </p>
        </Box>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getInactiveUsers(filterSchema));
    return () => {
      dispatch(resetGetInactiveUsers());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  // Add user handler
  const handleAddUser = async () => {
    toggleDrawer();
  };

  const handleUserAddSuccess = () => {
    dispatch(getInactiveUsers(filterSchema));
  };

  // activate user handler
  const handleActivateIconClick = (id: number) => {
    setDialogIds([id]);
    toggleActivateConfirmationDialog();
  };

  const handleActivateButtonClick = (selectedRows: any) => {
    const ids = selectedRows.map((row: any) => row.original.id);
    setDialogIds(ids);
    toggleActivateConfirmationDialog();
  };

  const activateUsers = () => {
    const data = { ids: dialogIds!, value: true };
    dispatch(updateMultipleUsersActivation(data))
      .then(unwrapResult)
      .then(_ => {
        dispatch(getInactiveUsers(filterSchema));
        toggleActivateConfirmationDialog(false);
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
        dispatch(getInactiveUsers(filterSchema));
        toggleDeleteConfirmationDialog(false);
        setDialogIds(null);
      });
  };

  // Pagination Handler
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    const updatedFilterSchema = { ...filterSchema, page: ++newPage, page_size: filterSchema?.page_size };
    setFilterSchema(updatedFilterSchema);
    dispatch(getInactiveUsers(updatedFilterSchema));
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const pageSize = event.target.value;
    const updatedFilterSchema = { ...filterSchema, page: 1, page_size: +pageSize };
    setFilterSchema(updatedFilterSchema);
    dispatch(getInactiveUsers(updatedFilterSchema));
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
      dispatch(getInactiveUsers(updatedFilterSchema));
    },
    [filterSchema, dispatch]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearchInputChange = useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      const searchValue = e.target.value;
      const updatedFilterSchema = { ...filterSchema, search: searchValue };
      setFilterSchema(updatedFilterSchema);
      dispatch(getInactiveUsers(updatedFilterSchema));
    }, 700),
    [dispatch, filterSchema]
  );

  const handleSortingMenuChange = useCallback(
    (data: any) => {
      if (data.value === filterSchema.order) return;

      const updatedFilterSchema = { ...filterSchema, order: data.value };
      setFilterSchema(updatedFilterSchema);
      dispatch(getInactiveUsers(updatedFilterSchema));
    },
    [filterSchema, dispatch]
  );

  return (
    <>
      <Drawer open={openDrawer} toggleDrawer={toggleDrawer}>
        <UserForm formValues={userFormData} onSuccess={handleUserAddSuccess} toggleDrawer={toggleDrawer} />
      </Drawer>

      <ConfirmationDialog
        title={t('users:confirmDeleteUser')}
        open={openDeleteConfirmationDialog}
        toggleDialog={toggleDeleteConfirmationDialog}
        loading={deleteMultipleUsersStatus === 'loading'}
        handleConfirmationClick={deleteUsers}
      />

      <ConfirmationDialog
        title={t('users:confirmActivateUser')}
        open={openActivateConfirmationDialog}
        toggleDialog={toggleActivateConfirmationDialog}
        loading={updateMultipleUsersActivationStatus === 'loading'}
        handleConfirmationClick={activateUsers}
      />

      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        marginBottom={{ xs: 1, md: 3 }}
        className={classes.userTitle}
      >
        <TitleSecondary variant="h4">
          {getInactiveUsersData?.meta_data?.pagination?.total} {t('users:inactiveUsers')}
        </TitleSecondary>
        <Button disableElevation color="primary" variant="contained" onClick={handleAddUser}>
          {t('users:addUser')}
        </Button>
      </Box>

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
          data={getInactiveUsersData?.payload || []}
          loading={status === 'loading'}
          hoverableRow
          enableRowSelect
          rowsPerPage={getInactiveUsersData?.meta_data?.pagination?.per_page || 10}
          renderTableFooter={selectedFlatRows => (
            <TableFooter selectedRows={selectedFlatRows}>
              <Button
                size="large"
                className={classes.deactivateBtn}
                variant="outlined"
                onClick={() => handleActivateButtonClick(selectedFlatRows)}
                startIcon={
                  <SvgIcon viewBox="0 0 16 16">
                    <RetryIcon />
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
              paginationData={getInactiveUsersData?.meta_data?.pagination}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
          )}
        />
      </>
    </>
  );
};

export default InactiveUsers;
