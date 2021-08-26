import { Box, Card, CardContent, Grid } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import React from 'react';
import useStyles from './styles';

const WaterRateCard: React.FC<{}> = () => {
  const classes = useStyles();
  return (
    <Grid container spacing={3}>
      {Array.from(new Array(9)).map((_, index) => (
        <Grid key={index} item xs={12} md={6} xl={4}>
          <Card className={classes.root} variant="outlined">
            <CardContent className={classes.cardContent}>
              <Box display="flex" justifyContent="space-between" mb={2}>
                <Skeleton variant="text" width="30%" />
                <Skeleton variant="text" width="30%" />
              </Box>

              <Grid container spacing={2} justify="space-between">
                {Array.from(new Array(2)).map((_, index) => (
                  <Grid item xs={6} key={index}>
                    <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center">
                      <Skeleton variant="text" width="60%" component="span" />
                      <Skeleton variant="text" width="30%" component="span" />
                      <Skeleton variant="text" width="30%" component="span" />
                      <Skeleton variant="text" width="30%" component="span" />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
export default WaterRateCard;
