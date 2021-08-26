import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  meterDetails: {
    display: 'block',
    paddingTop: theme.spacing(2.25),
    position: 'relative',
    '&:before': {
      content: `''`,
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: 1,
      background: theme.palette.grey['500'],
    },
    [theme.breakpoints.up('sm')]: {
      '&:before': {
        width: `calc(100% + 48px + ${theme.spacing(4)}px)`,
        left: '-56px',
      },
    },
    [theme.breakpoints.down('sm')]: {
      '& .gwcl-MuiGrid-item': {
        padding: theme.spacing(0, 1),
      },
    },
  },
}));
export default useStyles;
