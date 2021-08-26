import { fade, makeStyles } from '@material-ui/core/styles';

export type TStyleProps = {
  borderRadius?: number;
  btnPrimaryLight?: boolean;
  btnDanger?: boolean;
};

const useStyles = makeStyles(theme => ({
  button: {
    borderRadius: (props: TStyleProps) => props.borderRadius ?? 4,

    '&.gwcl-MuiButton-containedPrimary.Mui-disabled': {
      backgroundColor: fade(theme.palette.primary.main, 0.3),
      color: fade(theme.palette.common.white, 0.7),
    },
  },
  buttonPrimaryLight: {
    backgroundColor: fade(theme.palette.primary.main, 0.05),
    color: theme.palette.primary.main,
    boxShadow: 'none',

    '&:hover': {
      backgroundColor: fade(theme.palette.primary.main, 0.12),
      boxShadow: 'none',
    },
  },
  buttonDanger: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white,
    boxShadow: 'none',

    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },

    '&.gwcl-MuiButton-containedPrimary.Mui-disabled': {
      backgroundColor: fade(theme.palette.error.main, 0.3),
    },
  },
  buttonLoading: {
    '& .gwcl-MuiCircularProgress-root': {
      position: 'absolute',
    },

    // for hiding text
    '& .button-label': {
      visibility: 'hidden',
    },
  },
}));

export default useStyles;
