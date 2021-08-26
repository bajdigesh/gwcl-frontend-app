import { Box, Typography } from '@material-ui/core';
import { unwrapResult } from '@reduxjs/toolkit';
import { LargeTickIcon } from 'assets/images';
import Button from 'components/Button';
import useStyles from 'pages/Devices/RightDrawer/styles';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import {
  downloadConcentratorMeters,
  resetDownloadConcentratorMetersState,
  selectDownloadConcentratorMeters,
  selectGetConcentratorByIdState,
} from 'store/device/concentrators';
import { useTranslation } from 'react-i18next';

function saveFile(blob: any, filename: string) {
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(blob, filename);
  } else {
    const a = document.createElement('a');
    document.body.appendChild(a);
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = filename;
    a.click();
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }, 0);
  }
}

const DownloadAllMeters = () => {
  const classes = useStyles();
  const { t } = useTranslation(['common', 'devices']);
  const dispatch = useAppDispatch();
  const { status } = useSelector(selectDownloadConcentratorMeters);
  const { data: concentratorByIdData } = useSelector(selectGetConcentratorByIdState);

  useEffect(() => {
    return () => {
      dispatch(resetDownloadConcentratorMetersState());
    };
  }, [dispatch]);

  const handleDownloadMetersButtonClick = () => {
    dispatch(downloadConcentratorMeters(concentratorByIdData?.payload?.id))
      .then(unwrapResult)
      .then(res => {
        var blob = new Blob([res], { type: 'text/csv ' });
        saveFile(blob, 'meters.csv');
      });
  };

  return (
    <>
      <Box mt={3}>
        {status === 'success' ? (
          <Box bgcolor="grey.400" p={3} mt={1} borderRadius={6} border={0} style={{ textAlign: 'center' }}>
            <span className={classes.largeTickIcon}>
              <LargeTickIcon />
            </span>
            <Typography variant="h6" style={{ marginTop: '10px' }}>
              {t('devices:fileDownloadSuccess')}
            </Typography>
          </Box>
        ) : (
          <Box bgcolor="grey.400" p={3} mt={1} borderRadius={6} border={0}>
            <Typography variant="body1" style={{ marginTop: '15px' }}>
              {t('devices:downloadAllMetersConfirmation')}{' '}
              <Box component="span" fontWeight="600">
                {concentratorByIdData?.payload?.concentrator_number}
              </Box>
            </Typography>
            <Button
              disableElevation
              borderRadius={8}
              style={{ minWidth: '130px', marginTop: '20px' }}
              onClick={handleDownloadMetersButtonClick}
              loading={status === 'loading'}
            >
              {t('common:yes')}
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
};

export default DownloadAllMeters;
