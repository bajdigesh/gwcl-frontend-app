import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  customInput: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: theme.palette.grey[400],
    border: `1px solid ${theme.palette.grey[500]}`,
    padding: theme.spacing(0.5, 2),
  },
  inputEndAdormentAdjustments: {
    marginRight: '15px',
  },
}));

export default useStyles;
