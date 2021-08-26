import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    borderColor: theme.palette.grey[500],
    cursor: 'pointer',
    maxWidth: '500px',
    '&:hover': {
      borderColor: theme.palette.primary.main,
      borderStyle: 'dashed',
    },
    '&:hover .hoverActions > p': {
      display: 'block',
    },
  },
  cardContent: {
    padding: theme.spacing(3),
    position: 'relative',
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  subTitleContainer: {},
  title: {},
  subTitle: {
    fontSize: '12px',
    fontWeight: 500,
    color: theme.palette.grey[700],
  },
  linked: {
    color: theme.palette.primary.main,
  },
  infoTitle: {
    fontSize: '12px',
    fontWeight: 500,
    color: theme.palette.grey[700],
    textTransform: 'uppercase',
    width: '100%',
  },
  info: {
    margin: '12px 0 0 15px',
  },
  infoItem: {
    display: 'flex',
    alignItems: 'left',
    flexDirection: 'column',
    fontSize: '12px',
    fontWeight: 500,
    color: theme.palette.grey[700],
    '&:not(:last-child)': {
      marginRight: theme.spacing(3),
    },

    '& > svg': {
      marginRight: theme.spacing(1),
    },
  },
  infoDataContainer: {},
  infoData: {},
  subData: {
    fontSize: '12px',
    fontWeight: 500,
  },
  actionBtns: {
    marginTop: '20px',
  },
  hoverActionBtns: {
    '& p': {
      display: 'none',
      position: 'absolute',
      right: '25px',
      bottom: '25px',
    },
  },
}));
export default useStyles;
