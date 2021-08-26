import React, { useCallback } from 'react';

interface useToggleReturnType {
  open: boolean;
  toggleOpen: (openStatus?: boolean) => void;
}

const useToggle = (): useToggleReturnType => {
  const [open, setOpen] = React.useState<boolean>(false);

  const toggleOpen = useCallback((openStatus?: boolean) => {
    if (openStatus) {
      setOpen(openStatus);
    } else {
      setOpen(prevOpenStatus => !prevOpenStatus);
    }
  }, []);

  return { open, toggleOpen };
};

export default useToggle;
