import { Box, SvgIcon, Tooltip } from '@material-ui/core';
import { unwrapResult } from '@reduxjs/toolkit';
import { DeleteIcon, EditIcon, ExclamationIcon, MailIcon, PhoneIcon, VerifiedIcon } from 'assets/images';
import Button from 'components/Button';
import { ConfirmationDialog } from 'components/Dialog';
import Drawer from 'components/Drawer';
import { FilterContainer } from 'components/Filters';
import Table, { IndeterminateCheckbox, TableFooter, TablePagination } from 'components/Table';
import { TitleSecondary } from 'components/Title';
import { format } from 'date-fns';
import { MONTH_DAY_YEAR_FORMAT, sortingOrder, YEAR_MONTH_DAY_HYPHEN_FORMAT } from 'global/constants';
import routePaths from 'global/routePaths';
import TechnicianForm from 'pages/Users/RightDrawer/TechnicianForm';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useAppDispatch } from 'store';
import {
  deleteTechnicianById,
  getTechnicians,
  resetGetTechnicians,
  selectDeleteTechnicianById,
  selectGetTechnicians,
} from 'store/users';
import { debounce, encrypt } from 'utils';
import { useDrawerToggle, useToggle } from 'utils/hooks';
import { formatTechnicianFormData } from '../Shared/formatUserFormData';
import { useStyles } from '../Shared/styles';
import { IGetUsersSearchQuery } from '../Shared/types';
import Filters from './Filters';
import { technicianFormData } from './schema';

const Technicians = () => {
  const classes = useStyles();
  const { t } = useTranslation(['common', 'users']);
  const dispatch = useAppDispatch();
  const { data: getTechniciansData, status } = useSelector(selectGetTechnicians);
  const { openDrawer, toggleDrawer } = useDrawerToggle();
  const [dialogIds, setDialogIds] = useState<Array<number> | null>(null);
  const { open: openDeleteConfirmationDialog, toggleOpen: toggleDeleteConfirmationDialog } = useToggle();
  const [technicianData, setTechnicianData] = useState(technicianFormData);
  const { status: deleteTechnicianStatus } = useSelector(selectDeleteTechnicianById);

  const [filterSchema, setFilterSchema] = useState<IGetUsersSearchQuery>({
    page: 1,
    page_size: 10,
    start_date: '',
    end_date: '',
    search: '',
    orderBy: 'id',
    order: sortingOrder.ASCENDING,
  });

  useEffect(() => {
    const promise = dispatch(getTechnicians(filterSchema));

    return () => {
      dispatch(resetGetTechnicians());
      promise.abort();
    };
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
      Header: t('users:name'),
      accessor: 'first_name',
      Cell: (data: any) => (
        <>
          <Box display="flex" alignItems="center" component="p">
            <Link
              className={classes.userName}
              to={routePaths.users.technicianDetails.replace(':id', encrypt(data.row.original.id))}
            >
              <span>
                {data.row.original.first_name} {data.row.original.last_name}
              </span>
            </Link>
            {data.row.original.verified ? (
              <VerifiedIcon className={classes.statusIcon} />
            ) : (
              <ExclamationIcon className={classes.statusIcon} />
            )}
          </Box>
          <p className={classes.staffCode}>{data.row.original.technician_id}</p>
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
          <Box display="flex" alignItems="center" className={classes.contactInfo}>
            <PhoneIcon />
            <span>{data.row.original.mobile}</span>
          </Box>
        </>
      ),
    },
    {
      Header: t('common:lastActivityOn'),
      accessor: 'updated_at',
      Cell: (data: any) => <>{format(new Date(data.value), MONTH_DAY_YEAR_FORMAT)}</>,
    },
    {
      Header: t('common:addedOn'),
      accessor: 'created_at',
      Cell: (data: any) => <>{format(new Date(data.value), MONTH_DAY_YEAR_FORMAT)}</>,
    },
    {
      Header: '',
      accessor: 'actions',
      Cell: (data: any) => (
        <Box display="flex" alignItems="center" className="actionButtons">
          <p onClick={() => handleEditTechnicianClick(data.row.original)}>
            <Tooltip title={t('users:editTechnician')} arrow>
              <EditIcon />
            </Tooltip>
          </p>

          <p onClick={() => handleDeleteIconClick(data.row.original?.id)}>
            <Tooltip title={t('users:delete')} arrow>
              <DeleteIcon />
            </Tooltip>
          </p>
        </Box>
      ),
    },
  ];

  const handleAddTechnician = async () => {
    toggleDrawer();
  };

  const handleDeleteButtonClick = (selectedRows: any) => {
    const ids = selectedRows.map((row: any) => row.original.id);
    setDialogIds(ids);
    toggleDeleteConfirmationDialog();
  };

  // Pagination Handler
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    const updatedFilterSchema = { ...filterSchema, page: ++newPage, page_size: filterSchema?.page_size };
    setFilterSchema(updatedFilterSchema);
    dispatch(getTechnicians(updatedFilterSchema));
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const pageSize = event.target.value;
    const updatedFilterSchema = { ...filterSchema, page: 1, page_size: +pageSize };
    setFilterSchema(updatedFilterSchema);
    dispatch(getTechnicians(updatedFilterSchema));
  };

  //Filter form handler
  const handleFilterFormSubmit = useCallback(
    (values: any) => {
      const updatedFilterSchema = {
        ...filterSchema,
        start_date: values.start_date ? format(new Date(values.start_date), YEAR_MONTH_DAY_HYPHEN_FORMAT) : '',
        end_date: values.end_date ? format(new Date(values.end_date), YEAR_MONTH_DAY_HYPHEN_FORMAT) : '',
      };
      setFilterSchema(updatedFilterSchema);
      dispatch(getTechnicians(updatedFilterSchema));
    },
    [filterSchema, dispatch]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearchInputChange = useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      const searchValue = e.target.value;
      const updatedFilterSchema = { ...filterSchema, search: searchValue };
      setFilterSchema(updatedFilterSchema);
      dispatch(getTechnicians(updatedFilterSchema));
    }, 500),
    [filterSchema, dispatch]
  );

  const handleSortingMenuChange = useCallback(
    (data: IAutoCompleteOption) => {
      console.log(data);
      if (data.value === filterSchema.order) return;

      const updatedFilterSchema = { ...filterSchema, order: data.value };
      setFilterSchema(updatedFilterSchema);
      dispatch(getTechnicians(updatedFilterSchema));
    },
    [filterSchema, dispatch]
  );

  const handleTechnicianAddSuccess = () => {
    dispatch(getTechnicians(filterSchema));
  };

  const handleEditTechnicianClick = (rowUser: any) => {
    const formData = formatTechnicianFormData(rowUser);
    setTechnicianData(formData);
    toggleDrawer();
  };

  const handleDeleteIconClick = (id: number) => {
    setDialogIds([id]);
    toggleDeleteConfirmationDialog();
  };

  const deleteTechnician = () => {
    dispatch(deleteTechnicianById({ id: dialogIds![0] }))
      .then(unwrapResult)
      .then(() => {
        dispatch(getTechnicians(filterSchema));
        toggleDeleteConfirmationDialog(false);
        setDialogIds(null);
      });
  };

  return (
    <>
      <Drawer open={openDrawer} toggleDrawer={toggleDrawer}>
        <TechnicianForm
          formValues={technicianData}
          onSuccess={handleTechnicianAddSuccess}
          toggleDrawer={toggleDrawer}
        />
      </Drawer>

      <ConfirmationDialog
        title={t('users:confirmDeleteTechnician')}
        open={openDeleteConfirmationDialog}
        toggleDialog={toggleDeleteConfirmationDialog}
        loading={deleteTechnicianStatus === 'loading'}
        handleConfirmationClick={deleteTechnician}
      />

      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        marginBottom={{ xs: 1, md: 3 }}
        className={classes.userTitle}
      >
        <TitleSecondary>
          {' '}
          {getTechniciansData?.meta_data?.pagination?.total} {t('users:technicians')}
        </TitleSecondary>
        <Button disableElevation color="primary" variant="contained" onClick={handleAddTechnician}>
          {t('users:addTechnician')}
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
        data={getTechniciansData?.payload || []}
        loading={status === 'loading'}
        hoverableRow
        enableRowSelect
        rowsPerPage={getTechniciansData?.meta_data?.pagination?.per_page || 10}
        renderPagination={() => (
          <TablePagination
            paginationData={getTechniciansData?.meta_data?.pagination}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        )}
        renderTableFooter={selectedFlatRows => (
          <TableFooter selectedRows={selectedFlatRows}>
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
      />
    </>
  );
};
export default Technicians;
