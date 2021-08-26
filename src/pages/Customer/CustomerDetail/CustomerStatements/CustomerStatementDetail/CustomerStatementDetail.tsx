import { Box, makeStyles } from '@material-ui/core';
import { DownloadIcon1 } from 'assets/images';
import { SwitchTabs } from 'components/Tabs';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import AccountStatement from './AccountStatement';

const useStyles = makeStyles(theme => ({
  statementDownloadLink: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
    position: 'absolute',
    right: 0,
    top: 14,
    display: 'flex',
    alignItems: 'center',
    '& svg': {
      marginRight: theme.spacing(1),
    },
  },
}));

const CustomerStatementDetail = () => {
  const classes = useStyles();
  const { t } = useTranslation(['customers']);
  const tabHeaders = useMemo(
    () => [{ title: t('customers:accountStatement') }, { title: t('customers:billingStatement') }],
    [t]
  );
  const tabPanels = [{ component: <AccountStatement /> }];
  return (
    <Box position="relative">
      <SwitchTabs tabHeaders={tabHeaders} tabPanels={tabPanels} />
      <span className={classes.statementDownloadLink}>
        <DownloadIcon1 />
        {t('customers:downloadStatement')}
      </span>
    </Box>
  );
};

export default CustomerStatementDetail;
