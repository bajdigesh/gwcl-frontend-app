import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FallBackLoader } from 'components/Loader';
import React, { Suspense } from 'react';

interface IProps {
  title?: string;
  children: React.ReactNode;
}

const useStyles = makeStyles(theme => ({
  wrapper: {
    '& form': {
      maxHeight: 'calc(100vh - 160px)',
      overflow: 'auto',
      paddingRight: theme.spacing(0.5),
    },
  },
}));

// This layout will act as entry point for fall back loader and setting title and close icon for all right Drawer
const RightDrawer: React.FC<IProps> = ({ title, children }) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Suspense fallback={<FallBackLoader />}>
        {title ? <Typography variant="h3">{title}</Typography> : null}
        {children}
      </Suspense>
    </div>
  );
};

export default RightDrawer;
