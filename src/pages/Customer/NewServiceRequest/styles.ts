import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  displayFlex: {
    display: 'flex',
    alignItems: 'center',
    '& i': {
      lineHeight: 0,
    },
  },
  applicantName: {
    color: theme.palette.primary.main,
    fontWeight: 500,
    marginRight: theme.spacing(1),
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.primary.dark,
    },
  },
  appliedOn: {
    color: theme.palette.grey['700'],
    fontSize: 12,
    fontWeight: 500,
    marginTop: 1,
  },
  avatar: {
    width: '24px',
    height: '24px',
    verticalAlign: 'middle',
    marginRight: '5px',
  },
  infoIcon: {
    lineHeight: 0,
    cursor: 'pointer',
  },
  infoTitle: {
    fontSize: '1rem',
    opacity: 0.9,
    marginBottom: '10px',
  },
  infoContent: {
    fontSize: '0.875rem',
    opacity: 0.9,
    fontWeight: 400,
    lineHeight: '30px',
    letterSpacing: '0.01rem',
    '& > span': {
      marginRight: '5px',
      verticalAlign: 'middle',
    },
  },
  infoBox: {
    padding: '5px 15px',
  },
  componentTitle: {
    fontWeight: 800,
    marginBottom: theme.spacing(1),
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      position: 'absolute',
      top: '-65px',
      left: '18px',
      marginBottom: 0,
    },
  },
  componentContainer: {
    textAlign: 'left',
    position: 'relative',
  },
}));
export default useStyles;
