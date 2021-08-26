import { makeStyles } from '@material-ui/core';
import { fade } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  innerContainer: {
    position: 'relative',
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(4),
    },
  },
  meterStatusText: {
    background: 'transparent !important',
    '& > svg': {
      marginRight: theme.spacing(1),
      lineHeight: 0,
      width: 16,
      height: 'auto',
    },
  },
  statusWorking: {
    color: theme.palette.success.main,
    background: fade(theme.palette.success.main, 0.19),
  },
  statusReverse: {
    color: theme.palette.error.main,
    background: fade(theme.palette.error.main, 0.19),
  },
  sectionBlock: {
    position: 'relative',
    paddingTop: theme.spacing(3),
    '&:before': {
      content: `''`,
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: 1,
      background: theme.palette.grey['500'],
    },
    '& h4': {
      fontSize: theme.typography.pxToRem(24),
      marginBottom: theme.spacing(2),
    },
  },
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
  meterStatus: {
    padding: theme.spacing(0.625, 1.75),
    borderRadius: 8,
    fontWeight: 500,
    '& > svg': {
      marginRight: theme.spacing(1),
      lineHeight: 0,
    },
  },
}));

export default useStyles;
