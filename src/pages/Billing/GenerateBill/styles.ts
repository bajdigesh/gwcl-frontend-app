import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  backIcon: {
    margin: `${theme.spacing(1.5)}px ${theme.spacing(2.5)}px 0 0`,
    cursor: 'pointer',
  },
  stepperContent: {
    position: 'relative',
    paddingBottom: 100,
  },
  stepperFooter: {
    width: '100%',
    position: 'fixed',
    left: 0,
    bottom: 0,
    padding: theme.spacing(1.5),
    borderTop: `1px solid ${theme.palette.grey['500']}`,
    boxShadow: '0 0 14px rgba(0,0,0,0.5)',
    background: theme.palette.primary.contrastText,
    '& button': {
      padding: `${theme.spacing(1.5)}px ${theme.spacing(3)}px`,
      '& + button': {
        marginLeft: theme.spacing(2),
      },
    },
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(1.5, 7.5, 1.5, 0),
    },
  },
}));

export default useStyles;
