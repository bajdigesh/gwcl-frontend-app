import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  pageHeading: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  formTitle: {
    fontSize: '0.75rem',
    fontWeight: 600,
    color: theme.palette.text.secondary,
    textTransform: 'uppercase',
  },
  buttonContainer: {
    width: '330px',
    display: 'flex',
    justifyContent: 'space-around',
  },
  cancelButton: {
    padding: '12px',
    cursor: 'pointer',
    textTransform: 'capitalize',
  },
}));
export default useStyles;
