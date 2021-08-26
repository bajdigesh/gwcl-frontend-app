import { Box, Tooltip, Typography } from '@material-ui/core';
import { unwrapResult } from '@reduxjs/toolkit';
import { DeleteIcon, DownloadIcon, PenIcon, UploadIcon } from 'assets/images';
import { meterTemplate } from 'assets/spreadSheet';
import clsx from 'clsx';
import Button from 'components/Button';
import { FallBackLoader } from 'components/Loader';
import SearchInput from 'components/SearchInput';
import Table, { IndeterminateCheckbox } from 'components/Table';
import useStyles from 'pages/Devices/RightDrawer/styles';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { CellValue } from 'react-table';
import { useAppDispatch } from 'store';
import {
  bulkLinkConcentratorWithMeter,
  selectBulkLinkConcentratorWithMeterState,
  selectGetConcentratorByIdState,
} from 'store/device/concentrators';
import {
  deleteMeterById,
  resetUploadMetersCsvState,
  selectUploadMetersCsvState,
  uploadMetersCsv,
} from 'store/device/meters';
import { blobToFile, mimeType } from 'utils';

const AddMeterBulk = () => {
  const classes = useStyles();
  const { t } = useTranslation(['common', 'devices']);
  const dispatch = useAppDispatch();
  const { data: concentratorByIdData } = useSelector(selectGetConcentratorByIdState);
  const { status: bulkLinkConcentratorWithMeterStatus } = useSelector(selectBulkLinkConcentratorWithMeterState);
  const { status, data } = useSelector(selectUploadMetersCsvState);
  const [file, setFile] = useState<null | File>(null);
  const [uploadedMetersData, setUploadedMetersData] = useState<Array<any>>([]);
  const [filteredMetersData, setFilteredMetersData] = useState<Array<any>>([]);

  const columns = [
    {
      id: 'selection',
      minWidth: 25,
      width: 25,
      Header: ({ getToggleAllRowsSelectedProps }: any) => {
        return (
          <div style={{ marginLeft: '8px' }}>
            <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
          </div>
        );
      },
      Cell: ({ row }: any) => {
        return (
          <div style={{ marginLeft: '8px' }}>
            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
          </div>
        );
      },
    },
    {
      Header: t('devices:meter'),
      Cell: (cellProps: CellValue) => {
        return (
          <div>
            <Typography color="primary" gutterBottom variant="body2">
              {cellProps.row.original?.meter_number}
            </Typography>
            {/* <Box fontWeight="600" component="p">
              {cellProps.row.original?.user_name} |{' '}
              <Box fontWeight="500" component="span">
                {cellProps.row.original?.meter}
              </Box>
            </Box> */}
          </div>
        );
      },
    },
    {
      Header: '',
      accessor: 'actions',
      Cell: (data: CellValue) => {
        return (
          <Box display="flex" justifyContent="flex-end" pr={1} className="actionButtons">
            <Tooltip title={t('devices:deleteMeter')} arrow>
              <DeleteIcon cursor="pointer" onClick={() => handleDeleteIconClick(data.row.original?.id)} />
            </Tooltip>
          </Box>
        );
      },
    },
  ];

  useEffect(() => {
    return () => {
      dispatch(resetUploadMetersCsvState());
    };
  }, [dispatch]);

  // This will mapped uploaded meters data with state uploadedMetersData
  useEffect(() => {
    if (data) {
      const uploadedMeters = data?.payload || [];
      setUploadedMetersData(uploadedMeters);
      setFilteredMetersData(uploadedMeters);
    }
  }, [data]);

  const handleDeleteIconClick = (meterId: string) => {
    dispatch(deleteMeterById(meterId))
      .then(unwrapResult)
      .then(() => {
        const newUploadedMetersData = uploadedMetersData.filter((item: any) => item.id !== meterId);
        const newFilteredMetersData = filteredMetersData.filter((item: any) => item.id !== meterId);
        setUploadedMetersData(newUploadedMetersData);
        setFilteredMetersData(newFilteredMetersData);
      });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files?.length) return;
    let file: File = files[0];
    console.log(file);

    /**  Used for Windows file type bug
     * while uploading csv data when fileType doesnot corresponds to 'text/csv' mimeType, then it will change that type into text/csv
     */
    if (file.type !== 'text/csv') {
      const split_name = file.name.split('.');
      const type = split_name[split_name.length - 1];
      const blob = new Blob([file], { type: mimeType(type) });
      file = blobToFile(blob, file.name);
    }

    const formData = new FormData();
    formData.append('csv_file', file);
    setFile(file);
    dispatch(uploadMetersCsv(formData));
  };

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const newFilteredMetersData = uploadedMetersData.filter((item: any) =>
      item.meter_number.toString().toLowerCase().includes(value)
    );
    setFilteredMetersData(newFilteredMetersData);
  };

  const handleLinkButtonClick = (selectedRows: any) => {
    const ids = selectedRows.map((row: any) => row.original.id);
    const bulkUnlinkData = {
      concentratorId: concentratorByIdData?.payload?.id,
      postData: { meter_ids: ids },
    };
    dispatch(bulkLinkConcentratorWithMeter(bulkUnlinkData))
      .then(unwrapResult)
      .then(_ => {
        dispatch(resetUploadMetersCsvState());
      });
  };

  return (
    <div>
      {status === 'loading' && <FallBackLoader />}
      {status === null && (
        <>
          <Typography variant="body1" paragraph>
            {t('devices:uploadSpreadsheetWithMeterInformation')}
          </Typography>
          <label htmlFor="upload-csv">
            <input
              style={{ display: 'none' }}
              accept=".csv, text/csv, text/*,"
              id="upload-csv"
              name="upload-csv"
              type="file"
              onChange={handleFileChange}
            />
            <Button fullWidth startIcon={<UploadIcon />} borderRadius={6} component="span">
              {t('devices:uploadSpreadsheet')}
            </Button>
          </label>
        </>
      )}
      {status === 'failed' && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          bgcolor="common.white"
          p={2.5}
          mt={1}
          border={1}
          borderRadius={6}
          borderColor="grey.500"
        >
          <div>
            <Typography variant="caption" color="textSecondary" component="p" gutterBottom>
              {t('devices:fileUploaded')}:
            </Typography>
            <Typography variant="body2" color="primary">
              {file?.name}
            </Typography>
          </div>

          <label htmlFor="upload-csv">
            <input
              style={{ display: 'none' }}
              accept=".csv, text/csv, text/*,"
              id="upload-csv"
              name="upload-csv"
              type="file"
              onChange={handleFileChange}
            />
            <Button startIcon={<PenIcon />} size="small" btnPrimaryLight component="span">
              {t('devices:changeFile')}
            </Button>
          </label>
        </Box>
      )}
      {status === 'success' && Array.isArray(data?.payload) && data?.payload.length ? (
        <Box mt={1}>
          <SearchInput placeholderText={t('devices:searchMeters')} onChange={handleSearchInputChange} />
          <Box mt={3} mb={1}>
            <Typography variant="h5" color="textPrimary" gutterBottom>
              {uploadedMetersData.length} {t('devices:metersUploaded')}
            </Typography>
          </Box>
          <Box mt={2} mx={-3} className={clsx(classes.meterTableWrapper, classes.meterTableWrapperSmall)}>
            <Table
              hideTableHead
              hoverableRow
              enableRowSelect
              columns={columns}
              data={filteredMetersData}
              renderTableFooter={selectedRows => (
                <div className={classes.footerFixedBtn}>
                  <Button
                    disableElevation
                    fullWidth
                    borderRadius={0}
                    size="large"
                    onClick={() => handleLinkButtonClick(selectedRows)}
                    loading={bulkLinkConcentratorWithMeterStatus === 'loading'}
                  >
                    {t('devices:linkToConc')} 27364892
                  </Button>
                </div>
              )}
            />
          </Box>
        </Box>
      ) : (
        <Box bgcolor="grey.400" py={3} px={4.5} mt={6} borderRadius={6} border={0} textAlign="center">
          <Typography variant="body1" paragraph align="center">
            {t('devices:useTemplateForMeterInformation')}
          </Typography>
          <Button
            href={meterTemplate}
            startIcon={<DownloadIcon />}
            size="small"
            variant="outlined"
            borderRadius={6}
            component="a"
          >
            {t('devices:downloadSpreadsheet')}
          </Button>
        </Box>
      )}
    </div>
  );
};

export default AddMeterBulk;
