import { Grid, MenuItem, Typography } from '@material-ui/core';
import { unwrapResult } from '@reduxjs/toolkit';
import { BackIcon, CardIcon, DeleteIcon, EditIcon, MoreMenuIcon } from 'assets/images';
import { ConfirmationDialog } from 'components/Dialog';
import Drawer from 'components/Drawer';
import CustomizedDropdown from 'components/Dropdown/CustomizedDropdown';
import { TimelineCard, TimelineList, TimelineListSkeleton } from 'components/Timeline';
import Title from 'components/Title';
import { format } from 'date-fns';
import { MONTH_DAY_YEAR_FORMAT, MONTH_DAY_YEAR_TIME_FORMAT, MONTH_YEAR_FORMAT } from 'global/constants';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useAppDispatch } from 'store';
import {
  deletePhoneById,
  getPhoneById,
  getPhoneHistoriesById,
  resetGetPhoneByIdState,
  resetGetPhoneHistoriesByIdState,
  selectDeletePhoneById,
  selectGetPhoneByIdState,
  selectGetPhoneHistoriesByIdState,
} from 'store/device/phones';
import { decrypt } from 'utils';
import { useDrawerToggle, useToggle } from 'utils/hooks';
import AddPhone from '../RightDrawer/AddPhone/AddPhone';
import { phoneInitialData } from '../RightDrawer/AddPhone/schema';
import { formatPhoneFormData } from '../Shared/formatPhoneFormData';
import useStyles from './style';

export interface IProps {}

const PhoneDetail: React.FC<IProps> = (props: any) => {
  const { t } = useTranslation(['common', 'devices']);
  const classes = useStyles();

  const history = useHistory();
  const dispatch = useAppDispatch();

  const { id: phoneId } = useParams<{ id: string }>();

  const { data: phoneDataById, status: phoneByIdStatus } = useSelector(selectGetPhoneByIdState);
  const { data: phoneHistories, status: phoneHistoriesStatus } = useSelector(selectGetPhoneHistoriesByIdState);

  const [formData, setFormData] = useState<typeof phoneInitialData>(phoneInitialData);
  const { status: deletePhoneByIdStatus } = useSelector(selectDeletePhoneById);

  const { openDrawer, toggleDrawer } = useDrawerToggle();
  const { open: openDeleteConfirmationDialog, toggleOpen: toggleDeleteConfirmationDialog } = useToggle();

  useEffect(() => {
    dispatch(getPhoneById(decrypt(phoneId)))
      .then(unwrapResult)
      .then(() => {
        dispatch(getPhoneHistoriesById(decrypt(phoneId)));
      });

    return () => {
      dispatch(resetGetPhoneByIdState());
      dispatch(resetGetPhoneHistoriesByIdState());
    };
  }, [dispatch, phoneId]);

  const handleConfirmDelete = () => {
    const data = { id: phoneDataById?.payload?.id };

    dispatch(deletePhoneById(data))
      .then(unwrapResult)
      .then(() => {
        history.goBack();
      });
  };

  const handleEditPhone = () => {
    const formData = formatPhoneFormData(phoneDataById.payload);
    setFormData(formData);
    toggleDrawer();
  };

  const handlePhoneEditSuccess = () => {
    dispatch(getPhoneById(decrypt(phoneId)))
      .then(unwrapResult)
      .then(() => {
        dispatch(getPhoneHistoriesById(decrypt(phoneId)));
      });
  };

  return (
    <div className={classes.innerContainer}>
      <Drawer open={openDrawer} toggleDrawer={toggleDrawer}>
        <AddPhone formValues={formData} onSuccess={handlePhoneEditSuccess} toggleDrawer={toggleDrawer} />
      </Drawer>

      <ConfirmationDialog
        title={t('devices:deletePhone')}
        open={openDeleteConfirmationDialog}
        toggleDialog={toggleDeleteConfirmationDialog}
        loading={deletePhoneByIdStatus === 'loading'}
        handleConfirmationClick={handleConfirmDelete}
      />

      <div className={classes.header}>
        <div className={classes.backIcon} onClick={() => history.goBack()}>
          <BackIcon />
        </div>

        <Title>
          {t('devices:phoneNo')} {phoneDataById?.payload?.IMEI}
        </Title>

        <CustomizedDropdown
          open={true}
          renderTriggerElement={handleClick => (
            <span onClick={handleClick} className={classes.moreMenuIcon}>
              <MoreMenuIcon />
            </span>
          )}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
          {handleClose => (
            <div className={classes.menuList}>
              <MenuItem
                onClick={() => {
                  handleEditPhone();
                  handleClose();
                }}
              >
                <EditIcon />
                {t('devices:editPhone')}
              </MenuItem>

              <MenuItem onClick={() => toggleDeleteConfirmationDialog()} className="deleteMenuItem">
                <DeleteIcon />
                {t('devices:deletePhone')}
              </MenuItem>
            </div>
          )}
        </CustomizedDropdown>
      </div>

      <div className={classes.details}>
        <Typography variant="h4" gutterBottom>
          {t('devices:phoneDetails')}
        </Typography>
        <div className={classes.detailsWrapper}>
          <Grid container item xl={7} spacing={3}>
            <Grid item xl={6} lg={4} md={6} sm={12} xs={12}>
              <p className={classes.detailsInfo}>
                <label>IMEI</label>
                <strong>{phoneDataById?.payload?.IMEI}</strong>
              </p>
            </Grid>

            <Grid item xl={6} lg={4} md={6} sm={12} xs={12}>
              <p className={classes.detailsInfo}>
                <label>{t('devices:model')}</label>
                <strong>{phoneDataById?.payload?.user_phone_model?.name}</strong>
              </p>
            </Grid>

            <Grid item xl={6} lg={4} md={6} sm={12} xs={12}>
              <p className={classes.detailsInfo}>
                <label>{t('devices:assignedTo')}</label>
                <strong>{`${phoneDataById?.payload?.assigned_to_user?.first_name} ${phoneDataById?.payload?.assigned_to_user?.last_name}`}</strong>
              </p>
            </Grid>

            <Grid item xl={6} lg={4} md={6} sm={12} xs={12}>
              <p className={classes.detailsInfo}>
                <label>{t('devices:monthlyDataAllowance')}</label>
                <strong>{phoneDataById?.payload?.monthly_data_allowance}</strong>
              </p>
            </Grid>

            <Grid item xl={6} lg={4} md={6} sm={12} xs={12}>
              <p className={classes.detailsInfo}>
                <label>{t('devices:phoneNumber')}</label>
                <strong>-</strong>
              </p>
            </Grid>
            <Grid item xl={6} lg={4} md={6} sm={12} xs={12}>
              <p className={classes.detailsInfo}>
                <label>{t('devices:recievedDate')}</label>
                <strong>
                  {phoneDataById?.payload?.received_date
                    ? format(new Date(phoneDataById?.payload?.received_date), MONTH_DAY_YEAR_FORMAT)
                    : 'N/A'}
                </strong>
              </p>
            </Grid>

            <Grid item xl={6} lg={4} md={6} sm={12} xs={12}>
              <p className={classes.detailsInfo}>
                <label>{t('devices:retirenmentDate')}</label>
                <strong>
                  {phoneDataById?.payload?.retirement_date
                    ? format(new Date(phoneDataById?.payload?.retirement_date), MONTH_DAY_YEAR_FORMAT)
                    : 'N/A'}
                </strong>
              </p>
            </Grid>
          </Grid>
        </div>
      </div>

      {/* <div className={classes.details}>
        <Typography variant="h4" gutterBottom>
          Last Session Details
        </Typography>
        <div className={classes.detailsWrapper}>
          <Grid container item xl={7} spacing={3}>
            <Grid item xl={6} lg={4} md={6} sm={12} xs={12}>
              <p className={classes.detailsInfo}>
                <label>Last seen on</label>
                <strong>-</strong>
              </p>
            </Grid>

            <Grid item xl={6} lg={4} md={6} sm={12} xs={12}>
              <p className={classes.detailsInfo}>
                <label>Session Duration</label>
                <strong>-</strong>
              </p>
            </Grid>

            <Grid item xl={6} lg={4} md={6} sm={12} xs={12}>
              <p className={classes.detailsInfo}>
                <label>Last Active Location</label>
                <strong>-</strong>
              </p>
            </Grid>
          </Grid>
        </div>
      </div> */}

      <div className={classes.historyTimeline}>
        <Typography variant="h4" gutterBottom className={classes.historyTimelineTitle}>
          {t('devices:phoneHistory')}
        </Typography>
        {phoneHistoriesStatus === 'loading' || phoneHistoriesStatus === null ? <TimelineListSkeleton /> : null}
        {phoneHistoriesStatus === 'success' && phoneHistories?.payload
          ? Object.entries(phoneHistories?.payload).map(([date, values]: any) => {
              return (
                <TimelineList title={format(new Date(date), MONTH_YEAR_FORMAT)} key={date}>
                  {values.map((history: any) => {
                    return (
                      <TimelineCard
                        key={history?.created_at}
                        icon={<CardIcon />}
                        cardTitle={history?.message}
                        cardTimeCaption={format(new Date(history?.created_at), MONTH_DAY_YEAR_TIME_FORMAT)}
                      />
                    );
                  })}
                </TimelineList>
              );
            })
          : null}
        {phoneHistoriesStatus === 'success' && !phoneHistories?.payload ? (
          <div>{t('devices:noHistoryFound')}</div>
        ) : null}
        {phoneHistoriesStatus === 'failed' && <div>{t('devices:unableToLoadPhoneHistory')}</div>}
      </div>
    </div>
  );
};

export default PhoneDetail;
