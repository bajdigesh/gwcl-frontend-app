import { Typography } from '@material-ui/core';
import Table from 'components/Table';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import {
  getServiceRatesHistoriesByServiceAgreementId,
  selectGetServiceRatesHistoriesByServiceAgreeementId,
} from 'store/billing/serviceRates';
import useStyles from './style';

interface IWaterRateHistoryProps {
  serviceAgreementId: string;
}

const WaterRateHistory: React.FC<IWaterRateHistoryProps> = ({ serviceAgreementId }) => {
  const { t } = useTranslation(['common', 'billing']);
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { data, status } = useSelector(selectGetServiceRatesHistoriesByServiceAgreeementId);

  useEffect(() => {
    console.log(serviceAgreementId);
    dispatch(getServiceRatesHistoriesByServiceAgreementId({ serviceAgreementId: serviceAgreementId, searchQuery: {} }));
  }, [dispatch, serviceAgreementId]);

  const columns = [
    {
      Header: t('common:rate'),
      accessor: 'rate',
      width: 100,
    },
    {
      Header: t('billing:effectiveDate'),
      accessor: 'effective_from',
    },
  ];

  console.log(data);

  return (
    <>
      <Typography variant="h3">{t('billing:tariffHistory')}</Typography>
      <Typography variant="subtitle2" className={classes.subTitle}>
        {t('billing:serviceCategory')}: {t('common:domestic')}
      </Typography>
      <div className={classes.drawerPaddingFix}>
        <Table columns={columns} data={data?.payload || []} loading={status === 'loading'} />
      </div>
    </>
  );
};
export default WaterRateHistory;
