import { Box, Tooltip, Typography } from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { unwrapResult } from '@reduxjs/toolkit';
import { DeleteIcon, EditIcon } from 'assets/images';
import clsx from 'clsx';
import Button from 'components/Button';
import { ConfirmationDialog } from 'components/Dialog';
import Drawer from 'components/Drawer';
import Table, { TablePagination } from 'components/Table';
import { TitleSecondary } from 'components/Title';
import format from 'date-fns/format';
import { MONTH_DAY_YEAR_TIME_FORMAT } from 'global/constants';
import routePaths from 'global/routePaths';
import AddConcentrator from 'pages/Devices/RightDrawer/AddConcentrator';
import { concentratorInitialData } from 'pages/Devices/RightDrawer/AddConcentrator/schema';
import { formatConcentratorFormData } from 'pages/Devices/Shared/formatConcentratorFormData';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CellValue } from 'react-table';
import {
  deleteConcentratorById,
  getConcentrators,
  resetGetConcentratorsState,
  selectDeleteConcentratorById,
  selectGetConcentratorsState,
} from 'store/device/concentrators';
import { useAppDispatch } from 'store/store';
import { encrypt } from 'utils';
import { useDrawerToggle, useToggle } from 'utils/hooks';
import { useStyles } from './style';

interface IProps {}

interface IGetConcentratorSearchQuery {
  page: number;
  page_size: number;
}

const Concentrators: React.FC<IProps> = () => {
  const { t } = useTranslation(['common', 'devices']);
  const classes = useStyles();
  const { openDrawer, toggleDrawer } = useDrawerToggle();
  const { open: openDeleteConfirmationDialog, toggleOpen: toggleDeleteConfirmationDialog } = useToggle();

  const dispatch = useAppDispatch();
  const { status, data } = useSelector(selectGetConcentratorsState);
  const { status: deleteConcentratorByIdStatus } = useSelector(selectDeleteConcentratorById);

  const [formData, setFormData] = useState(concentratorInitialData);
  const [dialogIds, setDialogIds] = useState<Array<number> | null>(null);
  const [searchQuery, setSearchQuery] = useState<IGetConcentratorSearchQuery>({
    page: 1,
    page_size: 10,
  });

  useEffect(() => {
    const promise = dispatch(getConcentrators(searchQuery));

    return () => {
      dispatch(resetGetConcentratorsState());
      promise.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const columns = [
    {
      Header: t('devices:concentratorID'),
      accessor: 'concentrator_number',
      Cell: (cellProps: CellValue) => {
        return (
          <Link
            to={routePaths.devices.concentratorDetail.replace(':id', encrypt(cellProps.row.original?.id))}
            style={{ textDecoration: 'none' }}
          >
            <Typography color="primary" variant="body2">
              {cellProps.value}
            </Typography>
          </Link>
        );
      },
    },
    {
      Header: t('devices:metersLinked'),
      accessor: 'meter_count',
      Cell: (cellProps: CellValue) => {
        return (
          <Typography color="primary" variant="body2">
            {cellProps.value}
          </Typography>
        );
      },
    },
    {
      Header: t('devices:concentratorStatus'),
      accessor: 'is_online',
      Cell: (cellProps: CellValue) => {
        return (
          <div className={clsx(classes.activeStatus, { online: cellProps.value }, { offline: !cellProps.value })}>
            {cellProps.value ? (
              <>
                <FiberManualRecordIcon /> {t('common:online')}
              </>
            ) : (
              <>
                <RadioButtonUncheckedIcon /> {t('common:offline')}
              </>
            )}
          </div>
        );
      },
    },
    {
      Header: t('common:phoneNumber'),
      accessor: 'phone_number',
    },
    {
      Header: t('devices:installationDate'),
      accessor: 'installed_timestamp',
      Cell: (data: CellValue) => {
        return data.value ? format(new Date(data.value), MONTH_DAY_YEAR_TIME_FORMAT) : 'N/A';
      },
    },
    {
      Header: '',
      accessor: 'actions',
      Cell: (data: any) => (
        <Box display="flex" alignItems="center" className="actionButtons">
          <p onClick={() => handleEditUserClick(data.row.original)}>
            <Tooltip title={t('devices:editConcentrator')} arrow>
              <EditIcon />
            </Tooltip>
          </p>
          <p onClick={() => handleDeleteConcentratorClick(data.row.original?.id)}>
            <Tooltip title={t('devices:deleteConcentrator')} arrow>
              <DeleteIcon />
            </Tooltip>
          </p>
        </Box>
      ),
    },
  ];

  const handleUserAddSuccess = () => {
    dispatch(getConcentrators(searchQuery));
  };

  const handleEditUserClick = (rowUser: any) => {
    const formData = formatConcentratorFormData(rowUser);
    setFormData(formData);
    toggleDrawer();
  };

  // delete concentrator handler
  const handleDeleteConcentratorClick = (id: number) => {
    setDialogIds([id]);
    toggleDeleteConfirmationDialog();
  };

  const deleteConcentrator = () => {
    dispatch(deleteConcentratorById({ id: dialogIds![0] }))
      .then(unwrapResult)
      .then(_ => {
        dispatch(getConcentrators(searchQuery));
        toggleDeleteConfirmationDialog(false);
        setDialogIds(null);
      });
  };

  const handleAddConcentratorClick = () => {
    setFormData(concentratorInitialData);
    toggleDrawer();
  };

  // pagination handler
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    const updatedSearchQuery = { ...searchQuery, page: ++newPage, page_size: searchQuery?.page_size };
    setSearchQuery(updatedSearchQuery);
    dispatch(getConcentrators(updatedSearchQuery));
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const pageSize = event.target.value;
    const updatedSearchQuery = { ...searchQuery, page: 1, page_size: +pageSize };
    setSearchQuery(updatedSearchQuery);
    dispatch(getConcentrators(updatedSearchQuery));
  };

  return (
    <div>
      <ConfirmationDialog
        title={t('devices:deleteConcentrator')}
        open={openDeleteConfirmationDialog}
        toggleDialog={toggleDeleteConfirmationDialog}
        loading={deleteConcentratorByIdStatus === 'loading'}
        handleConfirmationClick={deleteConcentrator}
      />

      <Drawer open={openDrawer} toggleDrawer={toggleDrawer}>
        <AddConcentrator formData={formData} onSuccess={handleUserAddSuccess} toggleDrawer={toggleDrawer} />
      </Drawer>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <TitleSecondary>
          {data?.meta_data?.pagination?.total} {t('devices:concentrators')}
        </TitleSecondary>
        <Button disableElevation color="primary" variant="contained" onClick={handleAddConcentratorClick}>
          {t('devices:addConcentrator')}
        </Button>
      </Box>
      <Table
        columns={columns}
        data={data?.payload || []}
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
    </div>
  );
};

export default Concentrators;
