import { Box, Popover } from '@material-ui/core';
import { format } from 'date-fns';
import { MONTH_DAY_YEAR_FORMAT } from 'global/constants';
import ViewReadings, { ViewReadingsSkeleton } from 'pages/Devices/MeterDetail/ViewReadings';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import { getMeterInitialFinalReadings, selectGetMeterInitialFinalReadingsState } from 'store/device/meters';
import useStyles from './style';

interface IProps {
  data: any;
  status?: string | null;
  handleClickPopOver: (event: any) => void;
  onClosePopOver: () => void;
  anchorEl: any;
}

const InstallationAndRemovalHistory = ({ data, handleClickPopOver, anchorEl, onClosePopOver }: IProps) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { status: viewReadingStatus, data: viewReadingData } = useSelector(selectGetMeterInitialFinalReadingsState);
  const { t } = useTranslation(['common', 'devices']);

  const viewReading = (data: any, type: string, event: any) => {
    const requestQuery = {
      type,
      start_date: data.installed_on,
      end_date: '2021-07-09',
    };
    dispatch(getMeterInitialFinalReadings({ id: data.meter_id, requestQuery }));
    handleClickPopOver(event);
  };

  return (
    <>
      <h4>{t('devices:installationAndRemovalHistory')}</h4>
      <Box mb={{ sm: 1, lg: 3 }} display="grid" gridGap={16} className={classes.meterHistory}>
        {data?.payload &&
          data?.payload.map((history: any) => (
            <div>
              <p>
                {format(new Date(history?.installed_on), MONTH_DAY_YEAR_FORMAT)} -{' '}
                {history?.removed_on ? format(new Date(history?.installed_on), MONTH_DAY_YEAR_FORMAT) : 'Active'}{' '}
              </p>
              <Box display="flex" component="p" className={classes.viewReadingButtons}>
                <span onClick={e => viewReading(history, 'initial', e)}>{t('devices:viewInitialReading')}</span>
                <span onClick={e => viewReading(history, 'final', e)}>{t('devices:viewFinalReading')}</span>
              </Box>
            </div>
          ))}
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={onClosePopOver}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <Box position="relative" p={{ xs: 2, md: 3 }} className={classes.readingDetailsContainer}>
            <div className={classes.readingDetails}>
              {viewReadingStatus === 'loading' ? <ViewReadingsSkeleton /> : <ViewReadings data={viewReadingData} />}
            </div>
          </Box>
        </Popover>
      </Box>
    </>
  );
};
export default InstallationAndRemovalHistory;
