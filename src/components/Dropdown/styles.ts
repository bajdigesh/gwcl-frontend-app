import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paperRoot: {
    background: theme.palette.grey[900],
    color: theme.palette.common.white,
    borderRadius: 10,
    boxShadow: 'none',
    paddingBlock: theme.spacing(1),

    '&  .gwcl-MuiList-root': {
      padding: theme.spacing(1),
    },

    '&  .gwcl-MuiListItem-root': {
      fontWeight: theme.typography.fontWeightRegular,

      '&:not(:last-child)': {
        marginBottom: theme.spacing(0.5),
      },
    },
  },
}));

export default useStyles;
