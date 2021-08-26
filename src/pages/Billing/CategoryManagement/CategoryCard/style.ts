import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    borderColor: theme.palette.grey[500],
    position: 'relative',

    '&:hover': {
      borderColor: theme.palette.primary.main,
      borderStyle: 'dashed',

      '& .gwcl-MuiIconButton-root': {
        opacity: '1',
      },
    },
  },
  cardContent: {
    padding: theme.spacing(3),
  },
  editIcon: {
    opacity: 0,
    position: 'absolute',
    bottom: theme.spacing(1),
    right: theme.spacing(1),
  },
  title: {
    textTransform: 'capitalize',
  },
  info: {
    display: 'flex',
    alignItems: 'center',
    marginBlock: theme.spacing(1.5),
    paddingBottom: theme.spacing(2),
    borderBottom: `1px dashed ${theme.palette.grey[500]}`,
  },
  infoItem: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '12px',
    fontWeight: 'normal',
    color: theme.palette.grey[700],
    '&:not(:last-child)': {
      marginRight: theme.spacing(3),
    },

    '& > .icon': {
      marginRight: theme.spacing(1),
    },
  },
  linkedWith: {
    '& h6.gwcl-MuiTypography-root': {
      textTransform: 'uppercase',
    },
  },
}));

export default useStyles;
