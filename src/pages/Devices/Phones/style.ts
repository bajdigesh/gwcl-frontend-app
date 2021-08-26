import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  innerContainer: {
    padding: `${theme.spacing(3)}px  ${theme.spacing(3)}px ${theme.spacing(3)}px ${theme.spacing(4.5)}px`,
    position: 'relative',
  },

  // header
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',

    '& .gwcl-MuiTypography-root': {
      marginBottom: 0,
    },
  },
  backIcon: {
    cursor: 'pointer',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-30%)',
    right: 'calc(100% + 15px)',

    '& > svg': {
      width: '24px',
      height: '18px',
    },
  },
  headerBtnGroup: {
    display: 'flex',
    '& > .gwcl-MuiButtonBase-root:last-child': {
      marginLeft: theme.spacing(1.5),
    },

    '& > .gwcl-MuiButtonBase-root': {
      '& .gwcl-MuiButton-iconSizeSmall > *:first-child path': {
        fill: theme.palette.primary.main,
      },
    },
  },

  // details
  details: {
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(4),
  },
  detailsWrapper: {
    marginTop: theme.spacing(3),
  },
  detailsInfo: {
    marginBottom: theme.spacing(2),
    '& > label': {
      marginRight: theme.spacing(1),
      color: theme.palette.grey[700],
    },
    '& > strong': {
      fontWeight: theme.typography.fontWeightMedium,
    },
  },
  detailsInfoSuccess: {
    color: theme.palette.success.main,
    '& span': {
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '16px',
      height: '16px',
      borderRadius: '50%',
      marginRight: theme.spacing(1),
      background: theme.palette.success.main,
    },
  },
  detailsBtn: {
    borderRadius: 10,
    color: theme.palette.primary.main,
    marginTop: theme.spacing(2),

    '& .gwcl-MuiButton-iconSizeLarge > *:first-child ': {
      width: '0.6rem',
      height: '0.7rem',
    },
  },

  // timeline
  historyTimeline: {
    marginTop: 24,
  },
  historyTimelineTitle: {
    marginBottom: theme.spacing(3),
  },
  filterWrap: {
    display: 'flex',

    '& > *': {
      marginRight: theme.spacing(1.5),
    },
  },
}));

export default useStyles;
