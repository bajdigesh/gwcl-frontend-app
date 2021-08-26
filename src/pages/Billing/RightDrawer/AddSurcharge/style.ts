import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  endAdorementButton: {
    color: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.main}`,
    padding: '5px 10px',
    borderRadius: '4px',
    fontSize: '0.875rem',
    margin: '0 10px 12px 0',
  },

  capitalizedText: {
    textTransform: 'uppercase',
  },
}));
export default useStyles;
