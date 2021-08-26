import { Box, Grid, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React from 'react';
import useStyles from './style';

export const ViewReadings = () => {
  const classes = useStyles();
  return (
    <Grid container spacing={3}>
      <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
        <Box display="flex" alignItems="center" className={classes.readingInfoRow}>
          <Typography component="span">
            {' '}
            <Skeleton width={100} />
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" className={classes.readingInfoRow}>
          <Typography component="span">
            <Skeleton width={100} />
          </Typography>
        </Box>
      </Grid>
      <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
        <Box display="flex" alignItems="center" className={classes.readingInfoRow}>
          <Typography component="span">
            <Skeleton width={100} />
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" className={classes.readingInfoRow}>
          <Typography component="span">
            <Skeleton width={100} />
          </Typography>
        </Box>
      </Grid>
      <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
        <Box display="flex" alignItems="center" className={classes.readingInfoRow}>
          <Typography component="span">
            <Skeleton width={100} />
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" className={classes.readingInfoRow}>
          <Typography component="span">
            <Skeleton width={100} />
          </Typography>
        </Box>
      </Grid>
      <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
        <Box display="flex" alignItems="center" className={classes.readingInfoRow}>
          <Typography component="span">
            <Skeleton width={100} />
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" className={classes.readingInfoRow}>
          <Typography component="span">
            <Skeleton width={100} />
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};
export default ViewReadings;
