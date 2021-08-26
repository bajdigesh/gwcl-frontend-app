import { Box, Typography } from '@material-ui/core';
import Button from 'components/Button';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

const Page404: React.FC<any> = () => {
  const history = useHistory();
  const { t } = useTranslation(['common']);
  return (
    <Box display="flex" alignItems="center" justifyContent="center" height="90vh">
      <Box textAlign="center">
        <Typography variant="h2" gutterBottom>
          {t('common:pageNotFound')}
        </Typography>
        <Box component="summary" mb={2} fontSize={18}>
          {t('common:pageDoesntExist')}
        </Box>
        <Button disableElevation color="primary" onClick={history.goBack}>
          {t('common:gotoPreviousPage')}
        </Button>
      </Box>
    </Box>
  );
};

export default Page404;
