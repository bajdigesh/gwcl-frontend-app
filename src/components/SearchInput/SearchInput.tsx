import { InputBase, InputBaseProps } from '@material-ui/core';
import { SearchIcon } from 'assets/images';
import { memo } from 'react';
import useStyles from './styles';

interface IProps extends InputBaseProps {
  placeholderText: string;
}

const SearchInput: React.FC<IProps> = ({ placeholderText, ...props }) => {
  const classes = useStyles();

  return (
    <div>
      <InputBase
        {...props}
        fullWidth
        placeholder={placeholderText}
        startAdornment={<SearchIcon />}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
      />
    </div>
  );
};

export default memo(SearchInput);
