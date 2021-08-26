import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import React from 'react';
import { useStyles } from './styles';

export interface IDialogProps {
  open: boolean;
  onClose: any;
  title?: string;
  children?: any;
  className: string;
  ref?: any;
}

const DialogComponent = ({ title, open, onClose, ref, children, className }: IDialogProps) => {
  const classes = useStyles();
  return (
    <>
      <Dialog className={className} open={open} onClose={onClose} ref={ref}>
        {title && <DialogTitle>{title}</DialogTitle>}
        <DialogContent className={classes.dialogContentWrapper}>{children}</DialogContent>
      </Dialog>
    </>
  );
};

export default DialogComponent;
