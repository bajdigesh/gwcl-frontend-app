import { Box, Typography } from '@material-ui/core';
import { TextField } from 'components/Form';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectGetConcentratorByIdState } from 'store/device/concentrators';
import { useTranslation } from 'react-i18next';

const ReadIMEI = () => {
  const { t } = useTranslation(['devices']);
  const { data: concentratorByIdData } = useSelector(selectGetConcentratorByIdState);

  return (
    <Box mt={3}>
      <TextField
        fullWidth
        label={t('devices:concentratorNumber')}
        value={concentratorByIdData?.payload?.concentrator_number}
      />

      {/* Meter Not Found */}
      <Box bgcolor="grey.400" p={3} mt={1} borderRadius={6} border={0}>
        <Typography variant="body1">
          {t('devices:IMEIofConcentratorNumber')}
          {concentratorByIdData?.payload?.concentrator_number}:{' '}
          <Box component="span" color="primary.main" fontWeight="600">
            {concentratorByIdData?.payload?.imei}
          </Box>
        </Typography>
      </Box>
    </Box>
  );
};

export default ReadIMEI;
