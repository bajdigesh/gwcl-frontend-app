import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  successButtonOutlined: {
    color: theme.palette.success.main,
    borderColor: theme.palette.success.main,
    '&:hover': {
      borderColor: theme.palette.success.main,
    },
  },
  viewDetailsBtn: {
    marginLeft: theme.spacing(0.25),
    '& .gwcl-MuiButton-label': {
      fontWeight: 500,
    },
  },
}));

export default useStyles;
