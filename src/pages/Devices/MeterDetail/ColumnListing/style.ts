import { makeStyles } from '@material-ui/core';

const useStyle = makeStyles(theme => ({
  gridItemBox: {
    '& div': {
      padding: theme.spacing(1.25, 0),
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(2, 0),
      },
      '& label': {
        color: theme.palette.grey['700'],
        marginRight: theme.spacing(1),
        fontWeight: 500,
        '&:after': {
          content: `':'`,
        },
      },
      '& span': {
        fontWeight: 600,
        '& i': {
          fontStyle: 'normal',
          color: theme.palette.primary.main,
        },
      },
    },
  },
}));
export default useStyle;
