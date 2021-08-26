import { Box, FormControl, InputAdornment, makeStyles, OutlinedInput } from '@material-ui/core';
import { ArrowDownIcon, DirectionIcon, FilterIcon, searchIcon } from 'assets/images';
import Button from 'components/Button';
import Drawer from 'components/Drawer';
import DropDown from 'components/Dropdown';
import React, { useState } from 'react';
import { useDrawerToggle } from 'utils/hooks';
import FilterForm from './FilterForm';

const useStyles = makeStyles(theme => ({
  filterFormWrapper: {
    display: 'flex',
    alignItems: 'center',
    '& > div:not(.react-datepicker__tab-loop)': {
      marginRight: theme.spacing(1),
      flex: '0 1 175px',
    },
    '& .gwcl-MuiFormControl-root': {
      marginBottom: 0,
    },
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      '& > div': {
        width: '100%',
        marginBottom: theme.spacing(1.5),
      },
    },
  },
  filterButton: {
    padding: '11px 1rem',
    marginLeft: '10px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  searchAndSort: {
    [theme.breakpoints.down('sm')]: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gridGap: theme.spacing(1.5),
      width: '100%',
    },
  },
  sortOption: {
    alignSelf: 'flex-start',
    marginLeft: theme.spacing(1),
    padding: '13px 16px',
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
  searchFilterInput: {
    '& .gwcl-MuiOutlinedInput-input': {
      height: 'auto',
      padding: '16px 0px',
      width: '5px',
      transition: 'all 0.25s ease',
    },
    '& .gwcl-MuiOutlinedInput-notchedOutline': {
      borderColor: 'transparent',
      transition: 'all 0.25s ease',
    },
    '& .gwcl-MuiInputLabel-root': {
      transform: 'translate(16px, 18px) scale(1)',
      color: theme.palette.grey['700'],
      opacity: 0,
      '&.gwcl-MuiInputLabel-shrink': {
        opacity: 0,
      },
    },
    '& .gwcl-MuiOutlinedInput-root': {
      '&.Mui-focused': {
        '& .gwcl-MuiOutlinedInput-input': {
          width: 'auto',
          padding: 16,
          transition: 'all 0.25s ease',
        },
        '& .gwcl-MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.grey['500'],
        },
      },
    },
    '&:focus-within': {
      '& .gwcl-MuiOutlinedInput-input': {
        width: 'auto',
        padding: 16,
        transition: 'all 0.25s ease',
      },
      '& .gwcl-MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.grey['500'],
      },
    },
    '& .gwcl-MuiInputAdornment-positionEnd': {
      pointerEvents: 'none',
    },
  },
}));

interface IProps {
  handleFilterFormSubmit: (values: any) => void;
}

const Filters: React.FC<IProps> = ({ handleFilterFormSubmit }) => {
  const classes = useStyles();
  const { openDrawer, toggleDrawer } = useDrawerToggle();
  const [anchorEl, setAnchorEl] = useState(null);
  const [sortBy, setSortBy] = useState('Last Added');
  const dropDownOptions = [{ option: 'Last Added' }, { option: 'First Added' }];

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const onClick = (event: any) => {
    setSortBy(event.target.outerText);
    setAnchorEl(null);
  };
  const onSeacrhFieldChange = () => {};

  return (
    <>
      <Box>
        <Box display="flex" justifyContent="center" justifySelf="end">
          <FormControl className={classes.searchFilterInput}>
            <OutlinedInput
              type="text"
              onChange={onSeacrhFieldChange}
              endAdornment={
                <InputAdornment position="end">
                  <img src={searchIcon} alt="" />
                </InputAdornment>
              }
            />
          </FormControl>
          <Button
            type="button"
            variant="outlined"
            size="small"
            className={classes.filterButton}
            onClick={toggleDrawer}
            startIcon={
              <i>
                <FilterIcon />
              </i>
            }
          >
            Filters
          </Button>
          <Box display="flex" className={classes.sortOption} onClick={handleClick}>
            <span>
              <DirectionIcon />
            </span>
            <span className={classes.sortLabel}>Sort by</span>
            <span>{sortBy}</span>
            <span>
              <ArrowDownIcon />
            </span>
          </Box>
          <DropDown
            className={classes.sortDropdown}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            dropDownOptions={dropDownOptions}
            onClick={onClick}
          />
        </Box>
        <DropDown
          className={classes.sortDropdown}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          dropDownOptions={dropDownOptions}
          onClick={onClick}
        />
      </Box>
      <Drawer open={openDrawer} toggleDrawer={toggleDrawer}>
        <FilterForm handleFilterFormSubmit={handleFilterFormSubmit} />
      </Drawer>
    </>
  );
};
export default Filters;
