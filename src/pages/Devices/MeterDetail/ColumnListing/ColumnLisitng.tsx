import { Box } from '@material-ui/core';
import React from 'react';
import useStyle from './style';
interface IColumnData {
  columns: DataItem[];
}
interface DataItem {
  id: string;
  label: string;
  data: () => JSX.Element;
}
const ColumnListing = ({ columns }: IColumnData) => {
  const classes = useStyle();
  return (
    <>
      {columns.map(col => {
        return (
          <Box display="flex" flexDirection="column" className={classes.gridItemBox} key={col.id}>
            <div>
              <label>{col.label}</label>
              <span>{col.data()}</span>
            </div>
          </Box>
        );
      })}
    </>
  );
};
export default ColumnListing;
