import React from 'react';

interface UseDrawerToggleReturnType {
  openDrawer: boolean;
  toggleDrawer: () => void;
}

const useDrawerToggle = (): UseDrawerToggleReturnType => {
  const [openDrawer, setOpenDrawer] = React.useState<boolean>(false);

  const toggleDrawer = () => {
    setOpenDrawer(prevDrawer => !prevDrawer);
  };

  return { openDrawer, toggleDrawer };
};

export default useDrawerToggle;
