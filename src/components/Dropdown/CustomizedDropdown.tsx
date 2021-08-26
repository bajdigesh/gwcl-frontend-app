import Menu, { MenuProps } from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import useStyles from 'components/Dropdown/styles';
import React, { memo } from 'react';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props: MenuProps) => (
  <Menu
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
));

interface IProps extends MenuProps {
  renderTriggerElement: (handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void) => React.ReactNode;
  children: (handleClose: () => void) => React.ReactNode;
}

const CustomizedDropdown: React.FC<IProps> = ({ renderTriggerElement, children, open, ...props }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {renderTriggerElement(handleClick)}
      <StyledMenu
        anchorEl={anchorEl}
        keepMounted
        onClose={handleClose}
        PopoverClasses={{ paper: classes.paperRoot }}
        variant="menu"
        open={Boolean(anchorEl)}
        {...props}
      >
        {children(handleClose)}
      </StyledMenu>
    </>
  );
};

export default memo(CustomizedDropdown);
