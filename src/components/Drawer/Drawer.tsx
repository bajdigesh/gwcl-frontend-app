import { Drawer as MuiDrawer, DrawerProps, IconButton, Typography } from '@material-ui/core';
import { CloseIcon } from 'assets/images';
import { FallBackLoader } from 'components/Loader';
import React, { memo, Suspense } from 'react';
import useStyles from './styles';

interface IProps {
  toggleDrawer: (event: React.KeyboardEvent | React.MouseEvent) => void;
  open: boolean;
  drawerProps?: DrawerProps;
  title?: string;
  children?: React.ReactNode;
}

const Drawer: React.FC<IProps> = ({ open, toggleDrawer, drawerProps, children, title }) => {
  const classes = useStyles();

  return (
    <MuiDrawer open={open} onClose={toggleDrawer} anchor="right" {...drawerProps}>
      <div className={classes.drawerWrapper} role="presentation">
        <Suspense fallback={<FallBackLoader />}>
          {title ? <Typography variant="h3">{title}</Typography> : null}
          <IconButton className={classes.closeIcon} onClick={toggleDrawer}>
            <CloseIcon />
          </IconButton>
          {children}
        </Suspense>
      </div>
    </MuiDrawer>
  );
};

export default memo(Drawer);
