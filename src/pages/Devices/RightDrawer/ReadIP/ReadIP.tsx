import { Box, Typography } from '@material-ui/core';
import Button from 'components/Button';
import { TextField } from 'components/Form';
import { ModifyIP } from 'pages/Devices/RightDrawer';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectGetConcentratorByIdState } from 'store/device/concentrators';

const ReadIP = () => {
  const { t } = useTranslation(['common', 'devices']);
  const { data: concentratorByIdData } = useSelector(selectGetConcentratorByIdState);
  const [showModifyIp, setShowModifyIp] = useState<boolean>(false);

  const handleModifyIpClick = () => {
    setShowModifyIp(true);
  };

  if (showModifyIp) return <ModifyIP />;

  return (
    <>
      <Typography variant="h3">Read IP</Typography>
      <Box mt={3}>
        <TextField
          fullWidth
          label={t('devices:concentratorNumber')}
          value={concentratorByIdData?.payload?.concentrator_number}
        />

        <Box bgcolor="grey.400" p={3} mt={1} borderRadius={6} border={0}>
          <Typography variant="body1">
            {t('devices:IPOfConc')} 273648201:{' '}
            <Box component="span" color="primary.main" fontWeight="600">
              {concentratorByIdData?.payload?.ip_address || '_____'}
            </Box>
          </Typography>
          <Button style={{ marginTop: '15px' }} variant="outlined" size="small" onClick={handleModifyIpClick}>
            {t('devices:modifyIP')}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default ReadIP;
