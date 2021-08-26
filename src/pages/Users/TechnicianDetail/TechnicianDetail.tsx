import { Box, FormControlLabel, Grid, IconButton, MenuItem, Radio, RadioGroup, Typography } from '@material-ui/core';
import { unwrapResult } from '@reduxjs/toolkit';
import { BackIcon, CardIcon, DeleteIcon, EditIcon, ExclamationIcon, MoreMenuIcon, VerifiedIcon } from 'assets/images';
import clsx from 'clsx';
import { ConfirmationDialog } from 'components/Dialog';
import Drawer from 'components/Drawer';
import CustomizedDropdown from 'components/Dropdown/CustomizedDropdown';
import { FallBackLoader } from 'components/Loader';
import { TimelineCard, TimelineList } from 'components/Timeline';
import Title from 'components/Title';
import { format } from 'date-fns';
import { MONTH_DAY_YEAR_TIME_FORMAT } from 'global/constants';
import TechnicianForm from 'pages/Users/RightDrawer/TechnicianForm';
import { technicianFormData } from 'pages/Users/Technicians/schema';
import useStyles from 'pages/Users/UserDetail/styles';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useAppDispatch } from 'store';
import {
  deleteTechnicianById,
  getTechnicianById,
  resetTechnicianByIdState,
  selectDeleteTechnicianById,
  selectTechnicianById,
} from 'store/users';
import { decrypt } from 'utils';
import { useDrawerToggle, useToggle } from 'utils/hooks';
import { formatTechnicianFormData } from '../Shared/formatUserFormData';

interface IProps {}

const TechnicianDetail: React.FC<IProps> = () => {
  const history = useHistory();
  const { t } = useTranslation(['common', 'users']);
  const dispatch = useAppDispatch();
  const { data: technicianByIdData, status: technicianByIdStatus } = useSelector(selectTechnicianById);
  const { status: deleteTechnicianByIdStatus } = useSelector(selectDeleteTechnicianById);
  const { id: technicianId } = useParams<{ id: string }>();
  const classes = useStyles();
  const { openDrawer, toggleDrawer } = useDrawerToggle();
  const { open: openDeleteConfirmationDialog, toggleOpen: toggleDeleteConfirmationDialog } = useToggle();
  const [formData, setFormData] = useState<typeof technicianFormData>(technicianFormData);
  const [activityLogType, setActivityLogType] = React.useState('');

  const handleChange = (e: any) => {
    setActivityLogType(e.target.value);
  };

  useEffect(() => {
    dispatch(getTechnicianById({ id: decrypt(technicianId) }));

    return () => {
      dispatch(resetTechnicianByIdState());
    };
  }, [dispatch, technicianId]);

  const handleEditUser = () => {
    toggleDrawer();
    const techicianFormData = formatTechnicianFormData(technicianByIdData?.payload);
    setFormData(techicianFormData);
  };

  const deleteTechnician = () => {
    const data = { id: technicianByIdData?.payload?.id };
    dispatch(deleteTechnicianById(data))
      .then(unwrapResult)
      .then(() => {
        history.goBack();
      });
  };

  const handleUserEditSuccess = () => {
    dispatch(getTechnicianById({ id: decrypt(technicianId) }));
  };

  if (technicianByIdStatus === 'loading' || technicianByIdStatus === null) return <FallBackLoader height={100} />;

  return (
    <div className={classes.innerContainer}>
      <Drawer open={openDrawer} toggleDrawer={toggleDrawer}>
        <TechnicianForm formValues={formData} onSuccess={handleUserEditSuccess} toggleDrawer={toggleDrawer} />
      </Drawer>

      <ConfirmationDialog
        title={t('users:confirmDeleteTechnician')}
        open={openDeleteConfirmationDialog}
        toggleDialog={toggleDeleteConfirmationDialog}
        loading={deleteTechnicianByIdStatus === 'loading'}
        handleConfirmationClick={deleteTechnician}
      />

      <>
        <Box
          display="grid"
          gridGap={20}
          gridTemplateColumns="repeat(auto-fit, minmax(1rem, max-content))"
          alignItems="center"
          position="relative"
          className={classes.userInfoTopBar}
        >
          <IconButton className={classes.backIcon} onClick={history.goBack}>
            <BackIcon />
          </IconButton>

          <Title>{`${technicianByIdData?.payload?.first_name || ''} ${
            technicianByIdData?.payload?.last_name || ''
          }`}</Title>

          <Box
            component="p"
            display="flex"
            alignItems="center"
            className={clsx(classes.userStatus, {
              [classes.statusActive]: technicianByIdData?.payload?.active,
            })}
          >
            {technicianByIdData?.payload?.active ? (
              <>
                <VerifiedIcon />
                {t('common:active')}
              </>
            ) : (
              <>
                <ExclamationIcon />
                {t('common:inactive')}
              </>
            )}
          </Box>

          <CustomizedDropdown
            open={true}
            renderTriggerElement={handleClick => (
              <IconButton onClick={handleClick} className={classes.moreMenuIcon}>
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
                    handleEditUser();
                    handleClose();
                  }}
                >
                  <EditIcon />
                  {t('users:editInformation')}
                </MenuItem>

                <MenuItem onClick={() => toggleDeleteConfirmationDialog()} className="deleteMenuItem">
                  <DeleteIcon />
                  {t('users:delete')}
                </MenuItem>
              </div>
            )}
          </CustomizedDropdown>
        </Box>
        <p className={clsx(classes.userInfo, classes.userAddedDate)}>
          <label>{t('common:addedOn')}</label>
          <span>
            {technicianByIdData?.payload?.created_at
              ? format(new Date(technicianByIdData?.payload?.created_at), MONTH_DAY_YEAR_TIME_FORMAT)
              : '-'}
          </span>
        </p>
      </>

      <Box display="block" marginTop={3} paddingTop={4} position="relative" className={classes.userBasicInfo}>
        <Grid container spacing={3}>
          <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
            <p className={classes.userInfo}>
              <label>{t('common:email')}</label>
              <span>{technicianByIdData?.payload?.email || '-'}</span>
            </p>
          </Grid>

          <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
            <p className={classes.userInfo}>
              <label>{t('common:phone')}</label>
              <span>{technicianByIdData?.payload?.mobile || '-'}</span>
            </p>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
            <p className={classes.userInfo}>
              <label>{t('users:technicianId')}</label>
              <span>{technicianByIdData?.payload?.technician_id || '-'}</span>
            </p>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
            <p className={classes.userInfo}>
              <label>{t('common:lastActivityOn')}</label>
              <span>
                {technicianByIdData?.payload?.updated_at
                  ? format(new Date(technicianByIdData?.payload?.updated_at), MONTH_DAY_YEAR_TIME_FORMAT)
                  : '-'}
              </span>
            </p>
          </Grid>
        </Grid>
      </Box>

      <Box mt={3} pt={3} className={classes.activityLogs} display="none">
        <Box mb={3}>
          <Typography variant="h4" gutterBottom>
            {t('common:activityLog')}
          </Typography>
        </Box>
        <div className={classes.tabsGroup}>
          <RadioGroup
            aria-label="activity log"
            name="activityLogType"
            value={activityLogType}
            onChange={handleChange}
            row
            className={classes.radioButton}
          >
            <FormControlLabel value="customerInformation" control={<Radio />} label={t('users:customerInformation')} />
            <FormControlLabel value="meterInformation" control={<Radio />} label={t('users:meterInformation')} />
            <FormControlLabel value="adjustedBillAmount" control={<Radio />} label={t('users:adjustedBillAmount')} />
            <FormControlLabel value="others" control={<Radio />} label={t('users:others')} />
          </RadioGroup>

          {/* <Button disableElevation color="inherit">
            {t('users:customerInformation')}
          </Button>

          <Button disableElevation color="inherit">
            {t('users:meterInformation')}
          </Button>

          <Button disableElevation color="inherit">
            {t('users:adjustedBillAmount')}
          </Button>

          <Button disableElevation color="inherit">
            {t('users:others')}
          </Button> */}
        </div>

        <TimelineList title="September 2020">
          <TimelineCard
            icon={<CardIcon />}
            cardTitle={
              <>
                {t('users:markTheMeter')}{' '}
                <Typography component="span" variant="body2" color="primary">
                  #283746
                </Typography>{' '}
                {t('users:asFaulty')}.
              </>
            }
            cardTimeCaption="Sep 19, 2020 03:29 PM"
          />
          <TimelineCard
            icon={<CardIcon />}
            cardTitle={
              <>
                {t('users:markTheMeter')}{' '}
                <Typography component="span" variant="body2" color="primary">
                  #283746
                </Typography>{' '}
                {t('users:asFaulty')}.
              </>
            }
            cardTimeCaption="Sep 19, 2020 03:29 PM"
          />
        </TimelineList>
      </Box>
    </div>
  );
};

export default TechnicianDetail;
