import Skeleton from '@material-ui/lab/Skeleton';
import TimelineCard from './TimelineCard';
import TimelineList from './TimelineList';

const TimelineListSkeleton = () => {
  return (
    <TimelineList title={<Skeleton variant="text" width="150px" />}>
      {Array.from(new Array(3)).map((_: any, index: number) => (
        <TimelineCard
          key={index}
          icon={<Skeleton variant="circle" width={36} height={36} />}
          cardTitle={<Skeleton variant="text" width="400px" />}
          cardTimeCaption={<Skeleton variant="text" width="100px" />}
        />
      ))}
    </TimelineList>
  );
};

export default TimelineListSkeleton;
