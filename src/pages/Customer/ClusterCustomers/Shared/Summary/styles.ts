import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  wrapper: {
    padding: theme.spacing(2, 3, 2, 3),
    marginBottom: theme.spacing(3),
    borderBottom: `1px solid ${theme.palette.grey[500]}`,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  value: {
    fontSize: 20,
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    marginBottom: theme.spacing(1),
  },
  label: {},
}));

export default useStyles;
