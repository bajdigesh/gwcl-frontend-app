import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  mapButtons: {
    position: 'absolute',
    top: '13px',
    left: '13px',
    zIndex: 2,
    background: 'white',
    color: theme.palette.grey['900'],
    '& svg': {
      '& path': {
        fill: theme.palette.grey['900'],
      },
    },
  },
}));
export default useStyles;
