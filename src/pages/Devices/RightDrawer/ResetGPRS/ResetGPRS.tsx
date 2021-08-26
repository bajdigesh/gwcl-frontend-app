import { Box, Typography } from '@material-ui/core';
import { LargeTickIcon } from 'assets/images';
import Button from 'components/Button';
import useStyles from 'pages/Devices/RightDrawer/styles';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import {
  resetGPRS,
  resetResetGPRSState,
  selectGetConcentratorByIdState,
  selectResetGPRS,
} from 'store/device/concentrators';
import { useTranslation } from 'react-i18next';

const ResetGPRS = () => {
  const classes = useStyles();
  const { t } = useTranslation(['common', 'devices']);
  const dispatch = useAppDispatch();
  const { status } = useSelector(selectResetGPRS);
  const { data: concentratorByIdData } = useSelector(selectGetConcentratorByIdState);

  useEffect(() => {
    return () => {
      dispatch(resetResetGPRSState());
    };
  }, [dispatch]);

  const handleResetGPRSClick = () => {
    dispatch(resetGPRS(concentratorByIdData?.payload?.id));
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
              {t('devices:gprsResetSuccess')}
            </Typography>
          </Box>
        ) : (
          <Box bgcolor="grey.400" p={3} mt={1} borderRadius={6} border={0}>
            <Typography variant="body1" style={{ marginTop: '15px' }}>
              {t('devices:doYouWantToReset')}{' '}
              <Box component="span" fontWeight="600">
                GPRS?
              </Box>
            </Typography>
            <Button
              disableElevation
              borderRadius={8}
              style={{ minWidth: '130px', marginTop: '20px' }}
              onClick={handleResetGPRSClick}
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

export default ResetGPRS;
