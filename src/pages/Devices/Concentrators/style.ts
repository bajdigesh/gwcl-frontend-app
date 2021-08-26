import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
  activeStatus: {
    display: 'flex',
    alignItems: 'center',

    '&.online': {
      color: theme.palette.success.main,
    },
    '&.offline': {
      color: theme.palette.grey[700],
    },

    '& > .gwcl-MuiSvgIcon-root': {
      marginRight: theme.spacing(0.5),
    },
  },
  filterWrap: {
    display: 'flex',

    '& > *': {
      marginRight: theme.spacing(1.5),
    },
  },
}));
