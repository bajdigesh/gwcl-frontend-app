import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  footerFixedBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,

    '& .gwcl-MuiButtonBase-root': {
      padding: theme.spacing(2.5),
    },
  },

  // Delete All Table
  meterTableWrapper: {
    '& table': {
      '& tr': {
        '& > .gwcl-MuiTableCell-root': {
          '&:last-of-type': {
            flex: '1 !important',
          },
        },
      },
    },
  },

  meterTableWrapperSmall: {
    '&  > div': {
      height: 'calc(100vh - 358px)',
    },
  },

  largeTickIcon: {
    width: '48px',
    height: '48px',
    display: 'inline-flex',
    background: '#34A489',
    alignItems: 'center',
    borderRadius: '50%',
    justifyContent: 'center',
  },

  smallTickIcon: {
    width: '16px',
    height: '16px',
    background: theme.palette.success.main,
    padding: theme.spacing(0.5),
  },

  activeStatus: {
    display: 'flex',
    alignItems: 'center',

    '& svg': {
      width: '16px',
      height: '16px',
      marginRight: theme.spacing(1),
      borderRadius: '50%',
    },

    '&.verified': {
      color: theme.palette.success.main,

      '& svg path': {
        fill: theme.palette.success.main,
      },
    },
    '&.unverified': {
      color: theme.palette.grey[700],
      '& svg': {
        // background: theme.palette.grey[700],
      },
    },
  },
  drawerTitle: {
    padding: theme.spacing(0, 0),
  },
  drawerContent: {
    marginTop: theme.spacing(2),
    paddingRight: theme.spacing(0.5),
    height: `calc(100% - 100px)`,
    overflowY: 'auto',
  },
  drawerFooter: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,

    '& .gwcl-MuiButtonBase-root': {
      padding: theme.spacing(2.5),
    },
  },
  capitalizedText: {
    textTransform: 'uppercase',
  },
}));

export default useStyles;
