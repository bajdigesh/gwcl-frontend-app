import React from 'react';
import { useTimelineListStyles } from './styles';

interface IProps {
  children: React.ReactNode;
  title: React.ReactNode;
}

const TimelineList: React.FC<IProps> = ({ children, title }) => {
  const classes = useTimelineListStyles();
  return (
    <div className={classes.timelineList}>
      <h6>{title}</h6>
      {children}
    </div>
  );
};

export default TimelineList;
