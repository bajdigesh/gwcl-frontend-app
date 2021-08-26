import { Drawer as MuiDrawer, DrawerProps, IconButton, Typography } from '@material-ui/core';
import { CloseIcon } from 'assets/images';
import { FallBackLoader } from 'components/Loader';
import React, { memo, Suspense } from 'react';
import { useDrawerToggle } from 'utils/hooks';
import useStyles from './styles';

interface IProps {
  toggleElement: (toggleDrawer: () => void) => React.ReactNode;
  drawerProps?: DrawerProps;
  title?: string;
  children: (toggleDrawer: () => void) => React.ReactNode;
}

const ControllableDrawer: React.FC<IProps> = ({ toggleElement, drawerProps, children, title }) => {
  const classes = useStyles();
  const { openDrawer, toggleDrawer } = useDrawerToggle();

  return (
    <>
      {toggleElement(toggleDrawer)}
      <MuiDrawer open={openDrawer} onClose={toggleDrawer} anchor="right" {...drawerProps}>
        <div className={classes.drawerWrapper} role="presentation">
          <Suspense fallback={<FallBackLoader />}>
            {title ? <Typography variant="h3">{title}</Typography> : null}
            <IconButton className={classes.closeIcon} onClick={toggleDrawer}>
              <CloseIcon />
            </IconButton>
            {children(toggleDrawer)}
          </Suspense>
        </div>
      </MuiDrawer>
    </>
  );
};

export default memo(ControllableDrawer);
