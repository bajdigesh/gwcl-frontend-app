import { Menu, MenuItem } from '@material-ui/core';
import React from 'react';

export interface IDropDownProps {
  onClose: any;
  dropDownOptions: any;
  anchorEl: any;
  className: string;
  onClick: any;
}

const DropDown = ({ className, anchorEl, onClose, dropDownOptions, onClick }: IDropDownProps) => {
  return (
    <>
      <Menu className={className} anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={onClose}>
        {dropDownOptions.map((option: any, index: any) => (
          <MenuItem onClick={onClick} key={index}>
            {option.option}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default DropDown;
