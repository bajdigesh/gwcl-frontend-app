import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  customInput: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: theme.palette.grey[400],
    border: `1px solid ${theme.palette.grey[500]}`,
    padding: theme.spacing(0.5, 2),
    marginBottom: theme.spacing(2),
  },
  uppercase: {
    textTransform: 'uppercase',
  },
  capitalizedText: {
    textTransform: 'uppercase',
    fontWeight: 600,
  },
}));

export default useStyles;
