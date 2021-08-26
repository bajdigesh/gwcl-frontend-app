import { Box, Typography } from '@material-ui/core';
import Button from 'components/Button';
import { format } from 'date-fns';
import { MONTH_DAY_YEAR_TIME_FORMAT } from 'global/constants';
import { CalibrateClock } from 'pages/Devices/RightDrawer';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ReadClock: React.FC<any> = () => {
  const { t } = useTranslation(['devices']);
  const [showCalibrateClock, setShowCalibrateClock] = useState<boolean>(false);

  const handlCalibrateIpClick = () => {
    setShowCalibrateClock(true);
  };

  if (showCalibrateClock) return <CalibrateClock />;

  return (
    <>
      <Typography variant="h3">{t('devices:readClock')}</Typography>
      <Box mt={3}>
        <Box bgcolor="grey.400" p={3} mt={1} borderRadius={6} border={0}>
          <Typography variant="body1" paragraph>
            {t('devices:clockTime')}:{' '}
            <Box component="span" fontWeight="600">
              {format(new Date(), MONTH_DAY_YEAR_TIME_FORMAT)}
            </Box>
          </Typography>
          <Button variant="outlined" onClick={handlCalibrateIpClick} size="small">
            {t('devices:calibrateClock')}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default ReadClock;
