import { Box } from '@material-ui/core';
import { VerifiedIcon, WarningIcon } from 'assets/images';
import Table, { TablePagination } from 'components/Table';
import clsx from 'clsx';
import { format } from 'date-fns';
import { MONTH_DAY_YEAR_TIME_FORMAT } from 'global/constants';
import sharedUseStyles from 'pages/Devices/MeterDetail/styles';
import { IMeterSearchQuery } from 'pages/Devices/Shared/types';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import { getMeterReadings, selectGetMeterReadingsState, resetGetMeterReadingsState } from 'store/device/meters';
import useStyles from './style';

interface IProps {
  meterId: string;
}
const LastReadings = ({ meterId }: IProps) => {
  const sharedClasses = sharedUseStyles();
  const classes = useStyles();
  const { t } = useTranslation(['common', 'devices']);
  const dispatch = useAppDispatch();
  const { status, data } = useSelector(selectGetMeterReadingsState);
  const [filterSchema, setFilterSchema] = useState<IMeterSearchQuery>({
    page: 1,
    page_size: 3,
  });

  const columns = [
    {
      Header: t('common:time'),
      accessor: 'time',
      Cell: (data: any) => <>{format(new Date('2021-03-12T15:52:06.000000Z'), MONTH_DAY_YEAR_TIME_FORMAT)}</>,
    },
    {
      Header: t('common:meterStatus'),
      accessor: 'meter_status',
      Cell: (data: any) => (
        <>
          {data?.row.original.meter_status === 'NORMAL_FLOW' ? (
            <Box
              display="inline-flex"
              alignItems="center"
              className={clsx(sharedClasses.meterStatusText, sharedClasses.statusWorking)}
            >
              <VerifiedIcon />
              {t('common:working')}
            </Box>
          ) : (
            <Box
              display="flex"
              alignItems="center"
              className={clsx(sharedClasses.meterStatusText, sharedClasses.statusReverse)}
            >
              <WarningIcon />
              {t('common:reverse')}
            </Box>
          )}
        </>
      ),
    },
    {
      Header: t('devices:valveStatus'),
      accessor: 'valve_status',
    },
    {
      Header: t('devices:forwardFlow'),
      accessor: 'total_forward_flow',
    },
    {
      Header: t('devices:reverseFlow'),
      accessor: 'total_reverse_flow',
    },
    {
      Header: t('devices:instantenousFlow'),
      accessor: 'instant_flow',
    },
    {
      Header: t('devices:tempreture'),
      accessor: 'temp',
    },
    {
      Header: t('devices:voltage'),
      accessor: 'voltage',
    },
  ];

  useEffect(() => {
    let promise = dispatch(getMeterReadings({ id: meterId, requestQuery: filterSchema }));
    return () => {
      dispatch(resetGetMeterReadingsState());
      promise.abort();
    };
  }, [dispatch]);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    const updatedFilterSchema = { ...filterSchema, page: ++newPage, page_size: +data?.meta_data?.pagination.per_page };
    setFilterSchema(updatedFilterSchema);
    dispatch(getMeterReadings({ id: meterId, requestQuery: updatedFilterSchema }));
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const pageSize = event.target.value;
    const updatedFilterSchema = { ...filterSchema, page: 1, page_size: +pageSize };
    setFilterSchema(updatedFilterSchema);
    dispatch(getMeterReadings({ id: meterId, requestQuery: updatedFilterSchema }));
  };
  const onViewReadings = (type: string) => {
    let updatedSchema = { ...filterSchema };
    if (type === 'all') {
      updatedSchema = { ...updatedSchema, page_size: 10 };
    }
    if (type === 'hide') {
      updatedSchema = { ...updatedSchema, page: 1, page_size: 3 };
    }
    setFilterSchema(updatedSchema);
    dispatch(getMeterReadings({ id: meterId, requestQuery: updatedSchema }));
  };

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <h4>{t('devices:latestReadings')}</h4>
        {+data?.meta_data?.pagination.per_page > 3 ? (
          <span onClick={() => onViewReadings('hide')} className={classes.viewReadingButtons}>
            {t('devices:hideReadings')}
          </span>
        ) : (
          <span onClick={() => onViewReadings('all')} className={classes.viewReadingButtons}>
            {t('devices:viewAllReadings')}
          </span>
        )}
      </Box>

      {data && (
        <Box mb={{ sm: 1, lg: 3 }}>
          <Table
            columns={columns}
            loading={status === 'loading'}
            data={data?.payload || []}
            renderPagination={() =>
              +data?.meta_data?.pagination.per_page > 3 ? (
                <TablePagination
                  paginationData={data?.meta_data?.pagination}
                  handleChangePage={handleChangePage}
                  handleChangeRowsPerPage={handleChangeRowsPerPage}
                />
              ) : null
            }
          />
        </Box>
      )}
    </>
  );
};
export default LastReadings;
