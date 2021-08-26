import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React from 'react';
import { useTimelineCardStyles } from './styles';

interface IProps {
  icon: React.ReactNode;
  cardTitle: React.ReactNode;
  cardTimeCaption: React.ReactNode;
  cardClass?: string;
}

const TimelineCard: React.FC<IProps> = ({ icon, cardTitle, cardTimeCaption, cardClass }) => {
  const classes = useTimelineCardStyles();
  return (
    <div className={clsx(classes.timelineCard, cardClass && `${cardClass}`)}>
      <span className={classes.timelineIcon}>{icon}</span>
      <div className={classes.timelineCardContent}>
        <Typography variant="body2" className={classes.cardTitle}>
          {cardTitle}
        </Typography>
        <Typography variant="caption" className={classes.cardTimeCaption}>
          {cardTimeCaption}
        </Typography>
      </div>
    </div>
  );
};

export default TimelineCard;
