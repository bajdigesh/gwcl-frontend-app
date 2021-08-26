import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    borderColor: theme.palette.grey[500],
    height: '100%',
    width: '100%',
    '&:hover': {
      borderColor: theme.palette.primary.main,
      borderStyle: 'dashed',
    },

    '& .gwcl-MuiIconButton-root': {
      opacity: 1,
    },
  },
  cardContent: {
    padding: theme.spacing(3),
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  editIcon: {
    opacity: 0,
    position: 'absolute',
    bottom: theme.spacing(1.5),
    right: theme.spacing(1.5),
  },
}));
export default useStyles;
