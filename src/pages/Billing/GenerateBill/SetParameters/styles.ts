import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
  waterRatesForm: {
    '& .gwcl-MuiBox-root': {
      [theme.breakpoints.down('md')]: {
        gridTemplateColumns: 'repeat(auto-fit, minmax(min-content, 130px))',
      },
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: 600,
    marginBottom: theme.spacing(2.5),
  },
  subHeading: {
    fontWeight: 600,
  },
  sectionLabel: {
    fontWeight: theme.typography.fontWeightMedium,
  },
  subChargesInfo: {
    '& h3': {
      marginBottom: 0,
    },
    '& .gwcl-MuiTextField-root': {
      maxWidth: theme.spacing(50),
    },
  },
}));

export default useStyles;
