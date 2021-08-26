import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  barWrapper: {
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16,
    marginBottom: theme.spacing(3),
    '& #legend-container': {
      '& > ul': {
        flexWrap: 'wrap',
      },
    },
  },
  barChart: {
    overflowX: 'auto',
    '& .chart-container': {
      position: 'relative',
      minWidth: '700px',
      height: '300px',

      [theme.breakpoints.down('sm')]: {
        height: 'auto',
        width: 'initial',
      },
    },
  },
}));
export default useStyles;
