import { Box, makeStyles, Menu, MenuItem } from '@material-ui/core';
import { ArrowDownIcon, DirectionIcon } from 'assets/images';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
  sortByInput: {
    marginLeft: theme.spacing(1),
    padding: theme.spacing(1.5, 2),
    border: `1px solid ${theme.palette.grey['500']}`,
    borderRadius: 4,
    cursor: 'pointer',
    '& > span': {
      color: theme.palette.grey['700'],
      marginLeft: theme.spacing(1),
      fontWeight: 500,
      '&:last-of-type': {
        color: theme.palette.grey['900'],
        marginRight: theme.spacing(1),
        '& + i': {
          width: 8,
        },
      },
    },
    '&:focus-within': {
      '& span': {
        '&:last-of-type': {
          '& + i': {
            transform: 'rotate(180deg)',
          },
        },
      },
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
  sortDropdown: {
    '& .gwcl-MuiPopover-paper': {
      marginTop: theme.spacing(7),
      width: 220,
    },
  },
  sortLabel: {
    [theme.breakpoints.between('sm', 'md')]: {
      display: 'none',
    },
  },
}));

interface IProps {
  value: IAutoCompleteOption;
  options: Array<IAutoCompleteOption>;
  handleMenuItemChange: (value: IAutoCompleteOption) => void;
}

const SortByDropdown: React.FC<IProps> = ({ handleMenuItemChange, value, options }) => {
  const classes = useStyles();
  const { t } = useTranslation(['common']);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (selectedValue: IAutoCompleteOption) => {
    handleMenuItemChange(selectedValue);
    handleClose();
  };

  return (
    <>
      <Box display="flex" alignItems="center" className={classes.sortByInput} onClick={handleClick}>
        <DirectionIcon />
        <span className={classes.sortLabel}>{t('common:sortBy')}</span>
        <span>{value?.label}</span>
        <ArrowDownIcon />
      </Box>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className={classes.sortDropdown}
      >
        {options.map((option: IAutoCompleteOption) => (
          <MenuItem key={option.label} onClick={() => handleMenuItemClick(option)}>
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default SortByDropdown;
