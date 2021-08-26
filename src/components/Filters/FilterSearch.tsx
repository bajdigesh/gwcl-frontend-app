import { fade, InputBase, InputBaseProps, makeStyles } from '@material-ui/core';
import { CloseIcon, SearchIcon } from 'assets/images';
import clsx from 'clsx';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface IProps extends InputBaseProps {}

const useStyles = makeStyles(theme => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 1.5),
    height: '100%',
    cursor: 'pointer',
    // pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '0',
    right: '0',
  },
  inputRoot: {
    height: '100%',
    width: '100%',
    color: 'inherit',
    background: theme.palette.common.white,

    [theme.breakpoints.up('md')]: {
      position: 'absolute',
      right: 0,
      width: 'auto',
    },
  },
  inputInput: {
    borderRadius: 4,
    border: `1px solid ${theme.palette.grey['500']}`,
    transition: theme.transitions.create(['opacity', 'width', 'padding']),
    width: '100%',
    padding: theme.spacing(1.875, 5, 1.875, 2),
    [theme.breakpoints.up('md')]: {
      width: '3ch',
      opacity: 0,
      '&.is-visible': {
        opacity: 1,
        width: '20ch',
      },
      '&:focus': {
        borderWidth: '2px',
        borderColor: theme.palette.primary.main,
      },
    },
  },
}));

const FilterSearch: React.FC<IProps> = ({ ...props }) => {
  const classes = useStyles();
  const { t } = useTranslation(['common']);
  const [showInput, setShowInput] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearchClick = () => {
    setShowInput(!showInput);
    if (inputRef?.current && !showInput) {
      inputRef.current!.focus();
    }
  };

  return (
    <div className={classes.search}>
      <InputBase
        placeholder={t('common:search') + '...'}
        classes={{
          root: classes.inputRoot,
          input: clsx(classes.inputInput, showInput && 'is-visible'),
        }}
        inputProps={{ 'aria-label': 'search' }}
        inputRef={inputRef}
        {...props}
      />
      <div className={classes.searchIcon} onClick={handleSearchClick}>
        {showInput ? <CloseIcon /> : <SearchIcon />}
      </div>
    </div>
  );
};

export default FilterSearch;
