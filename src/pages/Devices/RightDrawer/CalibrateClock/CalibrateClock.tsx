import { Box, Typography } from '@material-ui/core';
import { LargeTickIcon } from 'assets/images';
import Button from 'components/Button';
import { format } from 'date-fns';
import { MONTH_DAY_YEAR_TIME_FORMAT } from 'global/constants';
import useStyles from 'pages/Devices/RightDrawer/styles';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import {
  resetUpdateConcentratorClockCalibrationState,
  selectGetConcentratorByIdState,
  selectUpdateConcentratorClockCalibration,
  updateConcentratorClockCalibration,
} from 'store/device/concentrators';

const CalibrateClock = () => {
  const classes = useStyles();
  const { t } = useTranslation(['common', 'devices']);
  const dispatch = useAppDispatch();
  const { status } = useSelector(selectUpdateConcentratorClockCalibration);
  const { data: concentratorByIdData } = useSelector(selectGetConcentratorByIdState);

  useEffect(() => {
    return () => {
      dispatch(resetUpdateConcentratorClockCalibrationState());
    };
  }, [dispatch]);

  const handleCalibrateClockClick = () => {
    dispatch(updateConcentratorClockCalibration(concentratorByIdData?.payload?.id));
  };

  return (
    <>
      <Typography variant="h3">{t('devices:calibrateClock')}</Typography>
      <Box mt={3}>
        {status === 'success' ? (
          <Box bgcolor="grey.400" p={3} mt={1} borderRadius={6} border={0} style={{ textAlign: 'center' }}>
            <span className={classes.largeTickIcon}>
              <LargeTickIcon />
            </span>
            <Typography variant="h6" style={{ marginTop: '10px' }}>
              {t('devices:clockCalibrated')}
            </Typography>
            <Typography variant="body1" style={{ marginTop: '10px' }}>
              {t('devices:currentClockTime')}:{' '}
              <Box component="span" fontWeight="600">
                {format(new Date(), MONTH_DAY_YEAR_TIME_FORMAT)}
              </Box>
            </Typography>
          </Box>
        ) : (
          <Box bgcolor="grey.400" p={3} mt={1} borderRadius={6} border={0}>
            <Typography variant="body1">
              {t('devices:currentClockTime')}:{' '}
              <Box component="span" fontWeight="600">
                {format(new Date(), MONTH_DAY_YEAR_TIME_FORMAT)}
              </Box>
            </Typography>
            <Typography variant="body1" style={{ marginTop: '15px' }}>
              {t('devices:calibrateClockTo')}{' '}
              <Box component="span" fontWeight="600">
                {format(new Date(), MONTH_DAY_YEAR_TIME_FORMAT)}?
              </Box>
            </Typography>
            <Button
              disableElevation
              borderRadius={8}
              style={{ minWidth: '130px', marginTop: '20px' }}
              onClick={handleCalibrateClockClick}
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

export default CalibrateClock;
