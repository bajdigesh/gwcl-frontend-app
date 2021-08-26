import { Box, Grid, IconButton, MenuItem, Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { unwrapResult } from '@reduxjs/toolkit';
import {
  ArrowDownIcon,
  ArrowRightIcon,
  BackIcon,
  BanIcon,
  CardIcon,
  DeleteIcon,
  EditIcon,
  MoreMenuIcon,
  VerifiedIcon,
} from 'assets/images';
import Button from 'components/Button';
import { ConfirmationDialog } from 'components/Dialog';
import Drawer, { ControllableDrawer } from 'components/Drawer';
import CustomizedDropdown from 'components/Dropdown/CustomizedDropdown';
import { FallBackLoader } from 'components/Loader';
import { TimelineCard, TimelineList, TimelineListSkeleton } from 'components/Timeline';
import Title from 'components/Title';
import { format } from 'date-fns';
import { MONTH_DAY_YEAR_TIME_FORMAT, MONTH_YEAR_FORMAT } from 'global/constants';
import {
  AddConcentrator,
  AddMeter,
  CalibrateClock,
  DeleteAllMeters,
  DeleteMeter,
  DownloadAllMeters,
  ModifyIP,
  ReadAllMeter,
  ReadClock,
  ReadIMEI,
  ReadIP,
  ResetGPRS,
} from 'pages/Devices/RightDrawer';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import {
  deleteConcentratorById,
  getConcentratorById,
  getConcentratorHistoriesById,
  resetGetConcentratorByIdState,
  selectDeleteConcentratorById,
  selectGetConcentratorByIdState,
  selectGetConcentratorHistoriesById,
} from 'store/device/concentrators';
import { useAppDispatch } from 'store/store';
import { decrypt } from 'utils';
import { useDrawerToggle, useToggle } from 'utils/hooks';
import { concentratorInitialData } from '../RightDrawer/AddConcentrator/schema';
import { formatConcentratorFormData } from '../Shared/formatConcentratorFormData';
import { useStyles } from './style';

export interface IProps {}

const ConcentratorDetail: React.FC<IProps> = () => {
  const classes = useStyles();
  const { t } = useTranslation(['common', 'devices']);
  const history = useHistory();
  const { id: concentratorId } = useParams<{ id?: string | undefined }>();
  const { openDrawer, toggleDrawer } = useDrawerToggle();
  const { open: openDeleteConfirmationDialog, toggleOpen: toggleDeleteConfirmationDialog } = useToggle();

  const dispatch = useAppDispatch();
  const { status, data } = useSelector(selectGetConcentratorByIdState);
  const { status: deleteConcentratorByIdStatus } = useSelector(selectDeleteConcentratorById);
  const { status: concentratorHistoriesStatus, data: concentratorHistoriesData } = useSelector(
    selectGetConcentratorHistoriesById
  );

  const [formData, setFormData] = useState(concentratorInitialData);

  const menuList = [
    { title: t('devices:addMeter'), component: AddMeter },
    { title: t('devices:readAllMeters'), component: ReadAllMeter },
    { title: t('devices:deleteMeter'), component: DeleteMeter },
    { title: t('devices:deleteAllMeters'), component: DeleteAllMeters },
    { title: t('devices:downloadAllMeters'), component: DownloadAllMeters },
    { title: t('devices:readIMEI'), component: ReadIMEI },
    { title: t('devices:readIP'), disableDrawerTitle: true, component: ReadIP },
    { title: t('devices:modifyIP'), disableDrawerTitle: true, component: ModifyIP },
    { title: t('devices:resetGPRS'), component: ResetGPRS },
    { title: t('devices:readClock'), disableDrawerTitle: true, component: ReadClock },
    { title: t('devices:calibrateClock'), disableDrawerTitle: true, component: CalibrateClock },
  ];

  useEffect(() => {
    if (concentratorId) {
      dispatch(getConcentratorById(decrypt(concentratorId)))
        .then(unwrapResult)
        .then(() => {
          dispatch(getConcentratorHistoriesById(decrypt(concentratorId)));
        });
    }

    return () => {
      dispatch(resetGetConcentratorByIdState());
    };
  }, [dispatch, concentratorId]);

  const deleteConcentrator = () => {
    dispatch(deleteConcentratorById({ id: +decrypt(concentratorId!) }))
      .then(unwrapResult)
      .then(_ => {
        history.goBack();
      });
  };

  const handleEditConcentrator = () => {
    const formData = formatConcentratorFormData(data.payload);
    setFormData(formData);
    toggleDrawer();
  };

  const handleUserAddSuccess = () => {
    if (concentratorId) {
      dispatch(getConcentratorById(decrypt(concentratorId)))
        .then(unwrapResult)
        .then(() => {
          dispatch(getConcentratorHistoriesById(decrypt(concentratorId)));
        });
    }
  };

  if (status === 'loading' || status === null) return <FallBackLoader height={100} />;

  return (
    <div className={classes.innerContainer}>
      <ConfirmationDialog
        title={t('devices:deleteConcentrator')}
        open={openDeleteConfirmationDialog}
        toggleDialog={toggleDeleteConfirmationDialog}
        loading={deleteConcentratorByIdStatus === 'loading'}
        handleConfirmationClick={deleteConcentrator}
      />
      <Drawer open={openDrawer} toggleDrawer={toggleDrawer}>
        <AddConcentrator formData={formData} onSuccess={handleUserAddSuccess} toggleDrawer={toggleDrawer} />
      </Drawer>
      <Box
        display="flex"
        flexWrap="wrap"
        alignItems="center"
        justifyContent="space-between"
        position="relative"
        className={classes.header}
      >
        <div className={classes.backIcon} onClick={() => history.goBack()}>
          <BackIcon />
        </div>
        <Box display="flex" alignItems="center">
          <Title>
            {t('devices:concentratorNo')} {data?.payload?.concentrator_number}
          </Title>
          <CustomizedDropdown
            open={true}
            renderTriggerElement={handleClick => (
              <IconButton onClick={handleClick} className={classes.moreMenuButton}>
                <MoreMenuIcon />
              </IconButton>
            )}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          >
            {handleClose => (
              <div className={classes.menuList}>
                <MenuItem
                  onClick={() => {
                    handleEditConcentrator();
                    handleClose();
                  }}
                >
                  <EditIcon />
                  {t('common:editInformation')}
                </MenuItem>

                <MenuItem onClick={() => toggleDeleteConfirmationDialog()} className="deleteMenuItem">
                  <DeleteIcon />
                  {t('common:delete')}
                </MenuItem>
              </div>
            )}
          </CustomizedDropdown>
        </Box>
        <Box display="flex" className={classes.headerBtnGroup}>
          <CustomizedDropdown
            open={true}
            renderTriggerElement={handleClick => (
              <Button
                color="inherit"
                aria-haspopup="true"
                onClick={handleClick}
                size="small"
                endIcon={<ArrowDownIcon />}
                btnPrimaryLight
                borderRadius={6}
              >
                {t('common:actions')}
              </Button>
            )}
          >
            {() => {
              return (
                <div>
                  {menuList.map(
                    ({
                      title,
                      component: Component,
                      disableDrawerTitle,
                    }: {
                      title: string;
                      component: any;
                      disableDrawerTitle?: boolean;
                    }) => (
                      <ControllableDrawer
                        key={title}
                        title={disableDrawerTitle ? undefined : title}
                        toggleElement={handleToggle => <MenuItem onClick={handleToggle}>{title}</MenuItem>}
                      >
                        {() => <Component />}
                      </ControllableDrawer>
                    )
                  )}
                </div>
              );
            }}
          </CustomizedDropdown>
          {/* <Button color="inherit" size="small" btnPrimaryLight borderRadius={6}>
            {t('devices:addMeter')}
          </Button>*/}
        </Box>
      </Box>

      <div className={classes.details}>
        <Typography variant="h4">{t('devices:concentratorDetails')}</Typography>
        <Box display="block" overflow="hidden" marginTop={{ xs: 2.75, md: 3.75 }}>
          <Grid container item xl={7} spacing={3}>
            <Grid item xl={6} lg={4} md={6} sm={12} xs={12}>
              <Box display="flex" alignItems="center" className={classes.detailsInfo}>
                <label>{t('devices:concentratorIMEI')}:</label>
                <strong>{data?.payload?.imei}</strong>
              </Box>
            </Grid>

            <Grid item xl={6} lg={4} md={6} sm={12} xs={12}>
              <Box display="flex" alignItems="center" className={classes.detailsInfo}>
                <label>{t('devices:displayStatus')}: </label>
                <strong className={classes.detailsInfoText}>
                  {data?.payload?.is_online ? (
                    <Box color="success.main" display="flex" alignItems="center">
                      <VerifiedIcon />
                      {t('common:working')}
                    </Box>
                  ) : (
                    <Box color="text.secondary" display="flex" alignItems="center">
                      <BanIcon />
                      {t('common:notWorking')}
                    </Box>
                  )}
                </strong>
              </Box>
            </Grid>

            <Grid item xl={6} lg={4} md={6} sm={12} xs={12}>
              <Box display="flex" alignItems="center" className={classes.detailsInfo}>
                <label>{t('common:location')}: </label>
                <strong>{data?.payload?.location || 'N/A'}</strong>
              </Box>
            </Grid>

            <Grid item xl={6} lg={4} md={6} sm={12} xs={12}>
              <Box display="flex" alignItems="center" className={classes.detailsInfo}>
                <label>{t('common:phoneNumber')}</label>
                <strong>{data?.payload?.phone_number}</strong>
              </Box>
            </Grid>

            <Grid item xl={6} lg={4} md={6} sm={12} xs={12}>
              <Box display="flex" alignItems="center" className={classes.detailsInfo}>
                <label>{t('common:installedOn')}:</label>
                <strong>
                  {data?.payload?.installed_timestamp
                    ? format(new Date(data?.payload?.installed_timestamp), MONTH_DAY_YEAR_TIME_FORMAT)
                    : 'N/A'}
                </strong>
              </Box>
            </Grid>
            <Grid item xl={6} lg={4} md={6} sm={12} xs={12}>
              <Box display="flex" alignItems="center" className={classes.detailsInfo}>
                <label>{t('common:installedBy')}:</label>
                <strong>{data?.payload?.installed_by?.first_name || 'N/A'}</strong>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <ControllableDrawer
          toggleElement={toggleDrawer => (
            <Button
              className={classes.detailsBtn}
              variant="outlined"
              color="secondary"
              size="large"
              endIcon={<ArrowRightIcon />}
              onClick={toggleDrawer}
            >
              {data?.payload?.meter_count || 0} {t('devices:metersConnected')}
            </Button>
          )}
          title={t('devices:readAllMeters')}
        >
          {toggleDrawer => {
            return <ReadAllMeter />;
          }}
        </ControllableDrawer>
      </div>
      <Divider />

      <div className={classes.historyTimeline}>
        <Typography variant="h4" className={classes.historyTimelineTitle}>
          {t('devices:concentratorHistory')}
        </Typography>
        <Box display="block" overflow="hidden" marginTop={{ xs: 2.75, md: 3.75 }}>
          {concentratorHistoriesStatus === 'loading' || concentratorHistoriesStatus === null ? (
            <TimelineListSkeleton />
          ) : null}
          {concentratorHistoriesStatus === 'success' && concentratorHistoriesData?.payload
            ? Object.entries(concentratorHistoriesData?.payload).map(([date, values]: any) => {
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
          {concentratorHistoriesStatus === 'success' && !concentratorHistoriesData?.payload ? (
            <div>{t('devices:noHistoryFound')}!!</div>
          ) : null}
          {concentratorHistoriesStatus === 'failed' && <div>{t('devices:unableToLoadPhoneHistory')}</div>}
        </Box>
      </div>
    </div>
  );
};

export default ConcentratorDetail;
