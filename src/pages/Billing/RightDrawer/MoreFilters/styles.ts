import { fade, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  moreFilterOptions: {
    marginBottom: theme.spacing(3),
    '& h4': {
      color: theme.palette.grey['700'],
      fontSize: theme.typography.pxToRem(12),
      textTransform: 'uppercase',
      marginBottom: theme.spacing(1),
      fontWeight: 500,
    },
    '& label': {
      position: 'relative',
      padding: theme.spacing(1.25, 2),
      cursor: 'pointer',
      margin: theme.spacing(1, 1, 0, 0),
      '& > input': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        cursor: 'pointer',
        border: `1px solid ${theme.palette.grey['500']}`,
        borderRadius: 4,
        appearance: 'none',
        '& + span': {
          fontWeight: 500,
        },
        '&:checked': {
          backgroundColor: fade(theme.palette.primary.main, 0.1),
          '& + span': {
            color: theme.palette.primary.main,
          },
        },
        '&:focus': {
          outline: 'none',
        },
      },
    },
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: '160px 1fr',
    },
    '& button': {
      '& .gwcl-MuiButton-label': {
        fontWeight: 500,
      },
    },
  },
  resetButton: {
    padding: theme.spacing(1.25, 2),
    color: theme.palette.primary.main,
    backgroundColor: fade(theme.palette.primary.main, 0.1),
    '&:hover': {
      backgroundColor: fade(theme.palette.primary.main, 0.25),
    },
  },
}));

export default useStyles;
