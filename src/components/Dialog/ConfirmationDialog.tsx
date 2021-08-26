import { Dialog, DialogActions, DialogContent, DialogProps, Typography } from '@material-ui/core';
import { LargeTickIcon } from 'assets/images';
import Button from 'components/Button';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useStyles } from './styles';
interface IProps extends DialogProps {
  open: boolean;
  toggleDialog: (status?: boolean) => void;
  title: string;
  handleConfirmationClick: () => void;
  loading?: boolean;
}

const ConfirmationDialog: React.FC<IProps> = ({
  toggleDialog,
  title,
  handleConfirmationClick,
  loading,
  open,
  ...props
}) => {
  const classes = useStyles();
  const { t } = useTranslation(['common']);
  return (
    <Dialog className={classes.confirmationDialog} open={open} onClose={() => toggleDialog(false)} {...props}>
      <DialogContent>
        <LargeTickIcon />
        <Typography>{title}</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          disableElevation
          color="primary"
          borderRadius={4}
          loading={loading}
          onClick={handleConfirmationClick}
          size="small"
          variant="outlined"
        >
          {t('common:confirm')}
        </Button>
        <Button
          disableElevation
          color="primary"
          variant="text"
          borderRadius={4}
          onClick={() => toggleDialog(false)}
          size="small"
        >
          {t('common:cancel')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
