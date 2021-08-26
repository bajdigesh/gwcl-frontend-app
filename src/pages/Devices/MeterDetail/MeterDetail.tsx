import { unwrapResult } from '@reduxjs/toolkit';
import { FallBackLoader } from 'components/Loader';
import ConfirmationDialog from 'components/Dialog/ConfirmationDialog';
import Drawer from 'components/Drawer';
import MeterForm from 'pages/Devices/RightDrawer/MeterForm';
import { meterFormData } from 'pages/Devices/RightDrawer/MeterForm/schema';
import { formatMeterFormData } from 'pages/Devices/Shared/formatMeterFormData';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import {
  getMeterById,
  resetGetMeterByIdState,
  resetChangeValveStatusByMeterNumberState,
  resetDeleteMeterByIdState,
  resetGetMeterInstallationHistoryState,
  selectGetMeterByIdState,
  selectDeleteMeterByIdState,
  deleteMeterById,
  selectGetMeterInstallationHistoryState,
  getMeterInstallationHistory,
} from 'store/device/meters';
import { useAppDispatch } from 'store/store';
import { changeValveStatusByMeterNumber } from 'store/device/meters/api';
import { decrypt } from 'utils';
import { useDrawerToggle, useToggle } from 'utils/hooks';

import InstallationAndRemovalHistory from './InstallationAndRemovalHistory';
import LastReadings from './LastReadings';
import MeterHeaderInfo from './MeterHeaderInfo';
import MeterHistory from './MeterHistory';
import MeterListInfo from './MeterListInfo';
import useStyles from './styles';
export interface IProps {
  match: any;
}

const MeterDetail = (props: any) => {
  const history = useHistory();
  const { t } = useTranslation(['common', 'devices']);
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { openDrawer, toggleDrawer } = useDrawerToggle();
  const lastReadingRef = useRef(null);
  const { status, data } = useSelector(selectGetMeterByIdState);
  const { status: deleteMeterStatus } = useSelector(selectDeleteMeterByIdState);
  const { status: installationStatus, data: installationData } = useSelector(selectGetMeterInstallationHistoryState);

  const { open: openDeleteMeterConfirmationDialog, toggleOpen: toggleDeleteMeterConfirmDialog } = useToggle();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElPopOver, setAnchorElPopOver] = useState(null);
  const [formData, setFormData] = useState<typeof meterFormData>(meterFormData);
  const classes = useStyles();

  useEffect(() => {
    let promise: any;
    let promiseForInstallations: any;
    if (id) {
      promise = dispatch(getMeterById(decrypt(id)));
      promiseForInstallations = dispatch(getMeterInstallationHistory(decrypt(id)));
    }
    return () => {
      dispatch(resetGetMeterByIdState());
      dispatch(resetChangeValveStatusByMeterNumberState());
      dispatch(resetDeleteMeterByIdState);
      dispatch(resetGetMeterInstallationHistoryState);
      promise.abort();
      promiseForInstallations.abort();
    };
  }, [dispatch, id]);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const onClose = () => {
    setAnchorEl(null);
  };

  const handleClickPopOver = (event: any) => {
    setAnchorElPopOver(event.currentTarget);
  };

  const onClosePopOver = () => {
    setAnchorElPopOver(null);
  };
  const onChangeValveStatus = (type: string) => {
    dispatch(changeValveStatusByMeterNumber({ meterNumber: decrypt(id), type }));
  };
  const onDeleteMeter = () => {
    dispatch(deleteMeterById(decrypt(id)))
      .then(unwrapResult)
      .then(_ => {
        toggleDeleteMeterConfirmDialog();
        history.goBack();
      });
  };
  const handleMeterSaveSuccess = () => {
    dispatch(getMeterById(decrypt(id)));
  };
  const handleEditMeter = () => {
    toggleDrawer();
    const formData = formatMeterFormData(data.payload);
    setFormData(formData);
  };

  if (status === 'loading' || status === null) return <FallBackLoader height={50} />;

  return (
    <div className={classes.innerContainer}>
      <Drawer open={openDrawer} toggleDrawer={toggleDrawer}>
        <MeterForm formValues={formData} onSuccess={handleMeterSaveSuccess} toggleDrawer={toggleDrawer} />
      </Drawer>
      <ConfirmationDialog
        title={t('devices:confirmDeleteMeter')}
        open={openDeleteMeterConfirmationDialog}
        toggleDialog={toggleDeleteMeterConfirmDialog}
        loading={deleteMeterStatus === 'loading'}
        handleConfirmationClick={onDeleteMeter}
      />
      <>
        <MeterHeaderInfo
          meterId={decrypt(id)}
          back={history.goBack}
          onMenuHandle={handleClick}
          onMenuClose={onClose}
          anchorElMenu={anchorEl}
          handleEditMenu={handleEditMeter}
          toggleDeleteConfirmDialog={toggleDeleteMeterConfirmDialog}
          onValveStatusChange={onChangeValveStatus}
          scrollTo={lastReadingRef}
        />

        <MeterListInfo />

        <div className={classes.sectionBlock} ref={lastReadingRef}>
          <LastReadings meterId={decrypt(id)} />
        </div>

        <div className={classes.sectionBlock}>
          <InstallationAndRemovalHistory
            data={installationData}
            status={installationStatus}
            handleClickPopOver={handleClickPopOver}
            onClosePopOver={onClosePopOver}
            anchorEl={anchorElPopOver}
          />
        </div>

        <div className={classes.sectionBlock}>
          <MeterHistory />
        </div>
      </>
    </div>
  );
};

export default MeterDetail;
