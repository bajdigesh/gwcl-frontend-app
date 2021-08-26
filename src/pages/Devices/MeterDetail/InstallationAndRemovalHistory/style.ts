import { makeStyles } from '@material-ui/core';
import { fade } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  meterHistory: {
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    '& > div': {
      padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
      border: `1px solid ${theme.palette.grey['500']}`,
      borderRadius: 8,
      '& > p': {
        '&:first-of-type': {
          marginBottom: theme.spacing(2),
        },
        '&:last-of-type': {
          justifyContent: 'space-between',
          color: theme.palette.primary.main,
        },
      },
    },
  },
  viewReadingButtons: {
    cursor: 'pointer',
  },
  readingDetailsContainer: {
    width: '990px',
    padding: 0,
    borderRadius: '8px',
    borderTop: `1px solid ${theme.palette.grey['500']}`,
    [theme.breakpoints.down('md')]: {
      width: '756px',
    },
    [theme.breakpoints.down('sm')]: {
      width: '600px',
    },
  },
  readingDetails: {
    padding: '24px',
    background: theme.palette.secondary.light,
  },
}));
export default useStyles;
