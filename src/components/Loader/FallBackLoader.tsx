import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';

export type TFallBackLoader = {
  height?: number;
};

const useStyles = makeStyles((theme: Theme) => ({
  loaderWrapper: {
    display: 'flex',
    background: theme.palette.common.white,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: (props: TFallBackLoader) => (props.height ? `${props.height}vh` : '100%'),
  },
}));

const FallbackLoader: React.FC<TFallBackLoader> = ({ height }) => {
  const classes = useStyles({ height });
  return (
    <div className={classes.loaderWrapper}>
      <CircularProgress />
    </div>
  );
};

export default FallbackLoader;
