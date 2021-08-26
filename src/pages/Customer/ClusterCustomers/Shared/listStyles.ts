import { makeStyles } from '@material-ui/core';

/**
 * This styles is used in region, district, route and service list
 */
const useStyles = makeStyles(theme => ({
  tableFilterContainer: {
    marginTop: theme.spacing(0.5),
    [theme.breakpoints.up('md')]: {
      paddingRight: theme.spacing(2),
    },
  },
  tableContainer: {
    '& > div': {
      marginTop: theme.spacing(1),
      paddingTop: theme.spacing(1),
      overflowY: 'auto',

      [theme.breakpoints.up('md')]: {
        // height: 'calc(100vh - 400px)',
      },

      '& > div': {
        overflow: 'hidden',
      },
    },
  },
  filterDrawerToggleButton: {
    lineHeight: 1.42,
    width: '100%',
    marginTop: theme.spacing(1),
  },
  searchAndSort: {
    '& .gwcl-MuiButton-outlined': {
      display: 'none',
    },
    '& .gwcl-MuiBox-root': {
      marginTop: theme.spacing(1),
    },
  },
}));
export default useStyles;
