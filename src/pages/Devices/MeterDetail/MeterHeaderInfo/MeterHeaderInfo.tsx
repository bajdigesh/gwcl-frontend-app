import { Box, Menu, MenuItem } from '@material-ui/core';
import { BackIcon, DeleteIcon, EditIcon, MoreMenuIcon, VerifiedIcon, WarningIcon } from 'assets/images';
import Button from 'components/Button';
import Title from 'components/Title';
import clsx from 'clsx';
import sharedUseSyles from 'pages/Devices/MeterDetail/styles';
import { IMeterSearchQuery } from 'pages/Devices/Shared/types';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getMeterReadings, selectGetMeterByIdState, selectGetMeterReadingsState } from 'store/device/meters';
import { useAppDispatch } from 'store';
import useStyles from './style';

interface IProps {
  meterId: string;
  back: () => void;
  onMenuHandle: (event: any) => void;
  onMenuClose: () => void;
  anchorElMenu: any;
  handleEditMenu: () => void;
  toggleDeleteConfirmDialog: () => void;
  onValveStatusChange: (type: string) => void;
  scrollTo: any;
}
const MeterHeaderInfo = ({
  meterId,
  back,
  onMenuHandle,
  onMenuClose,
  anchorElMenu,
  handleEditMenu,
  toggleDeleteConfirmDialog,
  onValveStatusChange,
  scrollTo,
}: IProps) => {
  const classes = useStyles();
  const sharedClasses = sharedUseSyles();
  const dispatch = useAppDispatch();
  const { t } = useTranslation(['common', 'devices']);
  const { data } = useSelector(selectGetMeterByIdState);
  const { data: viewReadingData } = useSelector(selectGetMeterReadingsState);
  const [filterSchema, setFilterSchema] = useState<IMeterSearchQuery>({
    page: 1,
    page_size: 3,
  });

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
    scrollTo?.current?.scrollIntoView();
  };
  return (
    <>
      <Box display="flex" alignItems="center" flexWrap="wrap" className={classes.topBarInfo}>
        <span className={classes.backIcon} onClick={back}>
          <BackIcon />
        </span>
        <Title>
          {' '}
          {t('devices:meterNo')} {data?.payload?.meter_number}
        </Title>
        <p className={classes.accountNumber}>
          {t('devices:accNo')}: {data?.payload?.brand?.code}
        </p>
        <p>
          {data?.payload?.status?.is_working ? (
            <Box
              display="flex"
              alignItems="center"
              component="span"
              className={clsx(sharedClasses.meterStatus, sharedClasses.statusWorking)}
            >
              <VerifiedIcon />
              {data?.payload?.status?.name}
            </Box>
          ) : (
            <Box
              display="flex"
              alignItems="center"
              component="span"
              className={clsx(sharedClasses.meterStatus, sharedClasses.statusReverse)}
            >
              <WarningIcon />
              {data?.payload?.status?.name}
            </Box>
          )}
        </p>
        <div className={classes.menuPopover}>
          <Box display="flex" alignItems="center" ml={0.5} onClick={onMenuHandle}>
            <MoreMenuIcon />
          </Box>
          <Menu
            className={classes.dropDownMenus}
            open={Boolean(anchorElMenu)}
            anchorEl={anchorElMenu}
            onClose={onMenuClose}
          >
            <MenuItem onClick={handleEditMenu}>
              <EditIcon />
              {t('common:editInformation')}
            </MenuItem>
            <MenuItem onClick={() => toggleDeleteConfirmDialog()}>
              <DeleteIcon />
              {t('common:delete')}
            </MenuItem>
          </Menu>
        </div>
      </Box>

      <Box display="flex" flexWrap="wrap" mt={1} mb={2}>
        <p className={clsx(classes.meterInfo, classes.infoSummary)}>
          <label>{t('common:region')}</label>
          <span>{data?.payload?.premises?.region?.region_name || 'N/A'}</span>
        </p>
        <p className={clsx(classes.meterInfo, classes.infoSummary)}>
          <label>{t('common:district')}</label>
          <span>{data?.payload?.premises?.district?.district_name || 'N/A'}</span>
        </p>
        <p className={clsx(classes.meterInfo, classes.infoSummary)}>
          <label>{t('common:route')}</label>
          <span>{data?.payload?.premises?.route?.route_name || 'N/A'}</span>
        </p>
        <p className={clsx(classes.meterInfo, classes.infoSummary)}>
          <label>{t('devices:lastReadingDate')}</label>
          {/*        <span>
                  {new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: '2-digit',
                    hour: 'numeric',
                    hour12: true,
                    minute: 'numeric',
                  }).format(new Date(meter.updated_at))}
                </span>*/}
          <span>N/A</span>
        </p>
      </Box>

      <Box display="grid" gridGap={16} mb={{ xs: 2, sm: 2, lg: 3 }} className={classes.meterButtons}>
        {+viewReadingData?.meta_data?.pagination.per_page > 3 ? (
          <Button borderRadius={8} btnPrimaryLight size="small" onClick={() => onViewReadings('hide')}>
            {t('devices:hideReadings')}
          </Button>
        ) : (
          <Button borderRadius={8} btnPrimaryLight size="small" onClick={() => onViewReadings('all')}>
            {t('devices:viewAllReadings')}
          </Button>
        )}
        <Button borderRadius={8} btnPrimaryLight size="small">
          {t('devices:readMeter')}
        </Button>
        <Button borderRadius={8} btnPrimaryLight size="small" onClick={() => onValveStatusChange('close')}>
          {t('devices:closeValve')}
        </Button>
      </Box>
    </>
  );
};
export default MeterHeaderInfo;
