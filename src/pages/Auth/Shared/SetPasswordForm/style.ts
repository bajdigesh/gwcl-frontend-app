import { makeStyles } from '@material-ui/core/styles';
import { TPasswordStrength } from '../type';

const useStyles = makeStyles(theme => ({
  link: {
    color: theme.palette.primary.main,
    fontSize: theme.typography.pxToRem(12),
    marginTop: theme.spacing(0.75),
    textDecoration: 'none',
    fontWeight: theme.typography.fontWeightMedium,
  },
  avatar: {
    width: theme.spacing(2),
    height: 'auto',
  },
  divider: {
    marginTop: theme.spacing(4.5),
    marginBottom: theme.spacing(3.75),
    backgroundColor: theme.palette.grey['500'],
  },
  signUp: {
    fontWeight: theme.typography.fontWeightMedium,
  },
  indicatorLabel: {
    fontWeight: theme.typography.fontWeightMedium,
    textTransform: 'capitalize',
    verticalAlign: 'bottom',
    display: (props: { passwordStrength: TPasswordStrength }) => (props.passwordStrength ? 'inline-block' : 'none'),
    color: (props: { passwordStrength: TPasswordStrength }) => {
      if (props.passwordStrength === 'weak') return theme.palette.error.main;
      else if (props.passwordStrength === 'medium') return theme.palette.warning.main;
      else if (props.passwordStrength === 'strong') return theme.palette.success.main;
      else return theme.palette.grey[500];
    },
  },
  indicator: {
    height: theme.spacing(0.5),
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: `${theme.spacing(0.5)}px ${theme.spacing(3)}px 0 0`,
    '& > span': {
      width: theme.spacing(6),
      height: '100%',
      borderRadius: theme.spacing(0.75),
      '&:not(:last-child)': {
        marginRight: theme.spacing(0.5),
      },
    },
  },
  weak: {
    backgroundColor: (props: { passwordStrength: TPasswordStrength }) => {
      if (props.passwordStrength === 'weak') return theme.palette.error.main;
      else if (props.passwordStrength === 'medium') return theme.palette.warning.main;
      else if (props.passwordStrength === 'strong') return theme.palette.success.main;
      else return theme.palette.grey[500];
    },
  },
  medium: {
    backgroundColor: (props: { passwordStrength: TPasswordStrength }) => {
      if (props.passwordStrength === 'medium') return theme.palette.warning.main;
      else if (props.passwordStrength === 'strong') return theme.palette.success.main;
      else return theme.palette.grey[500];
    },
  },
  strong: {
    backgroundColor: (props: { passwordStrength: TPasswordStrength }) => {
      if (props.passwordStrength === 'strong') return theme.palette.success.main;
      else return theme.palette.grey[500];
    },
  },
  submitBtn: {
    '&.gwcl-disabled': {
      backgroundColor: 'rgba(13, 76, 160, 0.3)',
      color: 'rgba(255, 255, 255, 0.7)',
    },
  },
}));

export default useStyles;
