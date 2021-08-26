import { makeStyles } from '@material-ui/core';

export const useTimelineListStyles = makeStyles(theme => ({
  timelineList: {
    '&:not(:last-of-type)': {
      marginBottom: theme.spacing(6.5),
    },
    ' & > h6': {
      textTransform: 'uppercase',
      color: theme.palette.grey['700'],
      fontWeight: 500,
      marginBottom: theme.spacing(1),
      fontSize: 14,
    },
  },
}));

export const useTimelineCardStyles = makeStyles(theme => ({
  timelineCard: {
    position: 'relative',
    padding: theme.spacing(2),
    borderRadius: '8px',
    display: 'flex',
    border: `1px solid ${theme.palette.grey['500']}`,
    width: 'fit-content',
    maxWidth: 750,
    '&:not(:last-of-type)': {
      marginBottom: theme.spacing(4.5),
      '&:after': {
        position: 'absolute',
        top: 'calc(100% + 1px)',
        left: theme.spacing(4),
        width: 1,
        height: '36px',
        content: `''`,
        background: theme.palette.grey['500'],
      },
    },
  },
  timelineIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: '0 0 36px',
    height: '36px',
    borderRadius: '50%',
    marginRight: theme.spacing(2),
    background: theme.palette.grey['500'],
    color: theme.palette.primary.main,
    '& svg path': {
      fill: theme.palette.primary.main,
    },
  },
  timelineCardContent: {
    [theme.breakpoints.up('md')]: {
      minWidth: 250,
    },
  },
  cardTitle: {
    marginBottom: theme.spacing(1),
    '& span': {
      fontWeight: 600,
    },
  },
  cardTimeCaption: {
    color: theme.palette.grey['700'],
    fontSize: 12,
    fontWeight: 500,
  },
}));
