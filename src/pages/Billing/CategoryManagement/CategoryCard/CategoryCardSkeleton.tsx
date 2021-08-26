import { Box, Card, CardContent, Grid, Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import React from 'react';
import useStyles from './style';

const CategoryCard: React.FC<any> = () => {
  const classes = useStyles();
  return (
    <Grid container spacing={3}>
      {Array.from(new Array(9)).map((_, index) => (
        <Grid key={index} item xs={12} lg={6} xl={4}>
          <Card className={classes.root} variant="outlined">
            <CardContent className={classes.cardContent}>
              <Typography variant="h6" className={classes.title}>
                <Skeleton variant="text" width="30%" />
              </Typography>
              <div className={classes.info}>
                <span className={classes.infoItem}>
                  <Skeleton variant="circle" width={15} height={15} className="icon" />{' '}
                  <Skeleton variant="text" width={50} />
                </span>
                <span className={classes.infoItem}>
                  <Skeleton variant="circle" width={15} height={15} className="icon" />{' '}
                  <Skeleton variant="text" width={50} />
                </span>
              </div>
              <Box className={classes.linkedWith}>
                <Skeleton variant="rect" height={50} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CategoryCard;
