import { Typography } from '@material-ui/core';
import Table from 'components/Table';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useStyles from './style';

const TariffHistory = () => {
  const { t } = useTranslation(['common', 'billing']);
  const classes = useStyles();
  const data = [
    { rates: '0.8000000', effective_date: 'Dec 2, 2020' },
    { rates: '0.8000000', effective_date: 'Dec 2, 2020' },
    { rates: '0.8000000', effective_date: 'Dec 2, 2020' },
    { rates: '0.8000000', effective_date: 'Dec 2, 2020' },
    { rates: '0.8000000', effective_date: 'Dec 2, 2020' },
    { rates: '0.8000000', effective_date: 'Dec 2, 2020' },
    { rates: '0.8000000', effective_date: 'Dec 2, 2020' },
    { rates: '0.8000000', effective_date: 'Dec 2, 2020' },
    { rates: '0.8000000', effective_date: 'Dec 2, 2020' },
    { rates: '0.8000000', effective_date: 'Dec 2, 2020' },
  ];
  const columns = [
    {
      Header: t('common:rate'),
      accessor: 'rates',
      width: 100,
    },
    {
      Header: t('billing:effectiveDate'),
      accessor: 'effective_date',
    },
  ];
  return (
    <>
      <Typography variant="h3">{t('billing:tariffHistory')}</Typography>
      <Typography variant="subtitle2" className={classes.subTitle}>
        {' '}
        {t('billing:serviceCategory')}: {t('common:domestic')}
      </Typography>
      <div className={classes.drawerPaddingFix}>
        <Table columns={columns} data={data} />
      </div>
    </>
  );
};
export default TariffHistory;
