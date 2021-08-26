import { makeStyles } from '@material-ui/core';
import { MarkerPin } from 'assets/images';
import React from 'react';

const useStyles = makeStyles(theme => ({
  highlights: {
    '& > svg': {
      '& path': {
        fill: 'green',
      },
    },
  },
}));
interface MarkerProps {
  text?: string;
  lat?: number;
  lng?: number;
  highlight?: boolean;
}
const Marker = ({ text, highlight }: MarkerProps) => {
  const classes = useStyles();
  return (
    <div>
      <span className={highlight ? classes.highlights : ''}>
        <MarkerPin />
      </span>
      {text || null}
    </div>
  );
};
export default Marker;
