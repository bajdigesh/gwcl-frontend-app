import { makeStyles } from '@material-ui/core/styles';
import { TickIcon } from 'assets/images';
import React, { MutableRefObject, useEffect, useRef } from 'react';

const useStyles = makeStyles(theme => ({
  checkBoxContainer: {
    position: 'relative',
  },
  checkBox: {
    appearance: 'none',
    border: `1px solid ${theme.palette.grey[600]}`,
    width: 16,
    height: 16,
    borderRadius: 4,
    cursor: 'pointer',
    '& + svg': {
      position: 'absolute',
      top: 3,
      left: 2,
      opacity: 0,
      zIndex: '-1',
      pointerEvents: 'none',
      width: 12,
      height: 'auto',
    },
    '&:focus': {
      outline: 'none',
    },
    '&:checked': {
      background: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
      '& + svg': {
        opacity: 1,
        zIndex: 0,
      },
    },
  },
}));

type TProps = {
  indeterminate: boolean;
};

const useCombinedRefs = (...refs: Array<any>): MutableRefObject<any> => {
  const targetRef = useRef();

  useEffect(() => {
    refs.forEach(ref => {
      if (!ref) return;

      if (typeof ref === 'function') {
        ref(targetRef.current);
      } else {
        ref.current = targetRef.current;
      }
    });
  }, [refs]);

  return targetRef;
};

const IndeterminateCheckbox = React.forwardRef<HTMLInputElement, TProps>(
  ({ indeterminate, ...rest }, ref: React.Ref<HTMLInputElement>) => {
    const defaultRef = React.useRef(null);
    const combinedRef = useCombinedRefs(ref, defaultRef);
    const classes = useStyles();

    useEffect(() => {
      if (combinedRef?.current) {
        combinedRef.current.indeterminate = indeterminate ?? false;
      }
    }, [combinedRef, indeterminate]);

    return (
      <span className={classes.checkBoxContainer}>
        <input className={classes.checkBox} type="checkbox" ref={combinedRef} {...rest} />
        <TickIcon />
      </span>
    );
  }
);

export default IndeterminateCheckbox;
