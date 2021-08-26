import Mbutton, { ButtonProps } from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import clsx from 'clsx';
import React from 'react';
import useStyles, { TStyleProps } from './styles';

export type TButtonProps = ButtonProps &
  TStyleProps & { children: React.ReactNode; loading?: boolean; component?: React.ElementType };

/* While loading is true circular progress icon will appear with disabled button */
const Button: React.FC<TButtonProps> = ({
  variant = 'contained',
  color = 'primary',
  children,
  borderRadius,
  className,
  loading,
  disabled,
  btnPrimaryLight,
  btnDanger,
  ...props
}) => {
  const classes = useStyles({ borderRadius });
  return (
    <Mbutton
      {...props}
      variant={variant}
      color={color}
      className={clsx(
        classes.button,
        loading && classes.buttonLoading,
        btnPrimaryLight && classes.buttonPrimaryLight,
        btnDanger && classes.buttonDanger,
        className
      )}
      disabled={loading ? true : disabled}
    >
      {loading ? <CircularProgress color="primary" size={30} /> : ''}
      <span className="button-label">{children}</span>
    </Mbutton>
  );
};

export default Button;
