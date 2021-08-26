import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  logoContainer: {
    lineHeight: 0,
    marginBottom: 50,
  },
  sidebarContent: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2)}px`,
  },
  sideBarMenu: {
    padding: '12px 8px',
    borderRadius: 8,
    color: '#fff',
    cursor: 'pointer',
    opacity: 0.7,
    transition: 'all 0.25s ease-in-out',
    textTransform: 'capitalize',
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    width: '100%',
    '& i': {
      width: 24,
      height: 24,
    },
    '&.active': {
      background: 'rgba(255,255,255,0.1)',
      opacity: '1',
    },
    '&:hover': {
      opacity: '1',
    },
  },
  item: {
    padding: '6px 0px',
  },
}));

export default useStyles;
