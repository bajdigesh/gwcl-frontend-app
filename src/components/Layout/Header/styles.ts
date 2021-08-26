import { makeStyles } from '@material-ui/core/styles';
const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);

const useStyles = makeStyles(theme => ({
  gridDisplay: {
    paddingLeft: theme.spacing(4),
    gridTemplateColumns: '1fr 36px',

    '& > form': {
      maxWidth: 240,
      width: '100%',
      justifySelf: 'center',
      [theme.breakpoints.up('sm')]: {
        maxWidth: 500,
      },
    },

    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: '1fr 150px',
    },
  },

  topSearchForm: {
    position: 'relative',
    '& i': {
      position: 'absolute',
      top: '50%',
      left: '16px',
      width: 16,
      height: 16,
      transform: 'translateY(-50%)',
      '& img': {
        maxWidth: '100%',
      },
    },
    '& input': {
      padding: '16px 12px 14px 40px',
      borderRadius: 8,
      background: 'rgba(233, 239, 250, 0.4)',
      width: '100%',
      border: 0,
    },
  },

  userImage: {
    flex: '0 0 36px',
    height: 36,
    borderRadius: '50%',
    overflow: 'hidden',
    margin: 0,
    position: 'relative',
    cursor: 'pointer',
    '& .gwcl-MuiAvatar-root': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      '&:after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        content: 'attr(data-initial)',
        background: randomColor,
        color: theme.palette.primary.contrastText,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: theme.typography.pxToRem(24),
      },
    },
  },

  languageDropdown: {
    marginRight: theme.spacing(2),

    '& .gwcl-MuiButton-startIcon svg': {
      width: 18,
      height: 18,
    },

    '& .gwcl-MuiButton-endIcon svg': {
      width: 12,
      height: 12,
    },
  },

  languageDropdownMenuItem: {
    '& .icon': {
      display: 'inline-flex',
      marginRight: theme.spacing(1),

      '& svg': {
        width: 20,
        height: 20,
      },
    },
  },

  changeLanguage: {
    display: 'block',
    padding: 0,
    margin: '0 !important',

    [theme.breakpoints.up('md')]: {
      display: 'inline-block',
    },

    '& .gwcl-MuiTypography-root': {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        padding: 0,
        width: 24,
      },
    },

    '& svg': {
      flex: '0 0 24px',
      height: 'auto',
      marginRight: theme.spacing(1),
      cursor: 'pointer',
      [theme.breakpoints.up('md')]: {
        marginRight: 0,
      },
    },

    '& > .gwcl-MuiTypography-root span': {
      '& + svg': {
        flex: '0 0 8px',
        marginLeft: theme.spacing(1),
      },
    },

    '& .gwcl-MuiList-root': {
      maxHeight: '0',
      padding: 0,
      transform: 'scaleY(0)',
      transformOrigin: '0 0',
      transition: 'all 0.25s ease',

      [theme.breakpoints.up('md')]: {
        position: 'absolute',
        right: 0,
        background: theme.palette.primary.contrastText,
        border: `1px solid ${theme.palette.grey['500']}`,
        borderRadius: theme.spacing(0.5),
        minWidth: 200,
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
      },
    },

    '& .gwcl-MuiListItem-root': {
      padding: theme.spacing(2, 2, 2, 6),
      borderTop: `1px solid ${theme.palette.grey['500']}`,

      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(2),
        borderTop: 0,
      },
    },

    '&:hover': {
      background: 'transparent',

      '& .gwcl-MuiList-root': {
        transform: 'scaleY(1)',
        height: 'auto',
        maxHeight: theme.spacing(100),
      },
    },
  },

  appLanguages: {
    '& li': {
      padding: theme.spacing(1, 3),

      '& svg': {
        width: 20,
        height: 'auto',
        marginRight: theme.spacing(1),
      },
    },
  },

  userMenus: {
    '& .gwcl-MuiMenu-paper': {
      maxWidth: 240,
      background: theme.palette.primary.contrastText,
      padding: 0,
      border: 0,
      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
    },

    '& .gwcl-MuiList-root': {
      padding: 0,
    },

    '& .gwcl-MuiListItem-root': {
      color: theme.palette.grey['900'],
    },
  },

  userNameInfo: {
    // background: theme.palette.grey['600'],
    padding: theme.spacing(3, 2),
    margin: '0 !important',

    '& figure': {
      marginRight: theme.spacing(1),
    },

    '& span': {
      color: theme.palette.grey['900'],
    },

    '&:hover': {
      background: theme.palette.grey['600'],
    },
  },

  logoutButton: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.grey['500']}`,
    cursor: 'pointer',

    '&.gwcl-MuiListItem-root': {
      color: theme.palette.error.dark,
    },

    '& svg': {
      width: 20,
      height: 'auto',
      marginRight: theme.spacing(1),
      color: theme.palette.error.dark,

      '& path': {
        fill: 'currentColor',
      },
    },

    [theme.breakpoints.up('md')]: {
      // padding: 0,
      border: 0,
    },
  },
}));

export default useStyles;
