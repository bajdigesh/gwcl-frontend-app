import { Box, Grid, Typography } from '@material-ui/core';
import { VerifiedIcon } from 'assets/images';
import clsx from 'clsx';
import React from 'react';
import { useTranslation } from 'react-i18next';
import sharedUseStyles from 'pages/Devices/MeterDetail/styles';
import useStyles from './style';
interface IProps {
  data: any;
}
const ViewReadings = ({ data }: IProps) => {
  const { t } = useTranslation(['common', 'devices']);
  const classes = useStyles();
  const sharedClasses = sharedUseStyles();
  return (
    <Grid container spacing={3}>
      <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
        <Box display="flex" alignItems="center" className={classes.readingInfoRow}>
          <Typography component="label" variant="subtitle1">
            {t('common:date')}
          </Typography>
          <Typography component="span">Dec 2, 2020 03:40 PM</Typography>
        </Box>
        <Box display="flex" alignItems="center" className={classes.readingInfoRow}>
          <Typography component="label" variant="subtitle1">
            {t('devices:meterStatus')}
          </Typography>
          <Box
            display="inline-flex"
            alignItems="center"
            className={clsx(sharedClasses.meterStatusText, sharedClasses.statusWorking)}
          >
            <VerifiedIcon />
            {t('common:working')}
          </Box>
        </Box>
      </Grid>
      <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
        <Box display="flex" alignItems="center" className={classes.readingInfoRow}>
          <Typography component="label" variant="subtitle1">
            {t('devices:valveStatus')}
          </Typography>
          <Typography component="span">{data?.payload?.valve_status}</Typography>
        </Box>
        <Box display="flex" alignItems="center" className={classes.readingInfoRow}>
          <Typography component="label" variant="subtitle1">
            {t('devices:forwardFlow')}
          </Typography>
          <Typography component="span">{data?.payload?.total_forward_flow}</Typography>
        </Box>
      </Grid>
      <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
        <Box display="flex" alignItems="center" className={classes.readingInfoRow}>
          <Typography component="label" variant="subtitle1">
            {t('devices:reverseFlow')}
          </Typography>
          <Typography component="span">{data?.payload?.total_reverse_flow}</Typography>
        </Box>
        <Box display="flex" alignItems="center" className={classes.readingInfoRow}>
          <Typography component="label" variant="subtitle1">
            {t('devices:instantenousFlow')}
          </Typography>
          <Typography component="span">{data?.payload?.instant_flow}</Typography>
        </Box>
      </Grid>
      <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
        <Box display="flex" alignItems="center" className={classes.readingInfoRow}>
          <Typography component="label" variant="subtitle1">
            {t('devices:tempreture')}
          </Typography>
          <Typography component="span">{data?.payload?.temp}</Typography>
        </Box>
        <Box display="flex" alignItems="center" className={classes.readingInfoRow}>
          <Typography component="label" variant="subtitle1">
            {t('devices:voltage')}
          </Typography>
          <Typography component="span">{data?.payload?.voltage}</Typography>
        </Box>
      </Grid>
    </Grid>
  );
};
export default ViewReadings;
