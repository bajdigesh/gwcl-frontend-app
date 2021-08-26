import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
  dialogContentWrapper: {},
  confirmationDialog: {
    '& .gwcl-MuiDialogContent-root': {
      '& > svg': {
        width: 80,
        height: 80,
        position: 'absolute',
        top: 40,
        left: '50%',
        transform: 'translateX(-50%)',
        color: theme.palette.primary.main,
        '& path:first-of-type': {
          fill: 'currentColor',
        },
      },
      '& p': {
        marginTop: 100,
        textAlign: 'center',
        fontSize: theme.typography.pxToRem(18),
        fontWeight: 600,
      },
    },
    '& .gwcl-MuiDialogActions-root': {
      display: 'block',
    },
    '& button': {
      width: '100%',
      textAlign: 'center',
      '& + button': {
        marginTop: theme.spacing(1),
        marginLeft: '0 !important',
      },
    },
  },
}));
