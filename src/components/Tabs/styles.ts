import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  tabPanels: {
    [theme.breakpoints.down('sm')]: {
      position: 'relative',
    },
  },
  switchTabs: {
    display: 'inline-flex',
    marginBottom: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(3),
      borderRadius: 50,
      background: theme.palette.grey[400],
    },
    '& .gwcl-MuiTabs-flexContainer': {
      border: 0,
      maxWidth: 'calc(100vw - 40px)',
      overflow: 'auto',
    },
  },
  switchTab: {
    background: theme.palette.grey[400],
    border: `1px solid transparent`,
    padding: theme.spacing(0.75, 1.5),
    fontWeight: theme.typography.fontWeightMedium,
    borderRadius: theme.spacing(1),
    margin: theme.spacing(0, 1, 1, 0),
    '&:not(:first-of-type)': {
      marginLeft: 0,
    },
    '&.Mui-selected': {
      borderColor: theme.palette.grey[500],
      color: `${theme.palette.grey[700]} !important`,
      fontWeight: theme.typography.fontWeightMedium,
      background: theme.palette.common.white,
    },
    [theme.breakpoints.up('sm')]: {
      background: 'transparent',
      margin: 0,
      padding: theme.spacing(1.875, 3),
      borderRadius: 50,
    },
  },
}));

export default useStyles;
