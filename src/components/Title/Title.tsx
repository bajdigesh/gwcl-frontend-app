import { makeStyles, Typography, TypographyProps } from '@material-ui/core';
import React from 'react';

interface IProps extends TypographyProps {}

const useStyles = makeStyles(theme => ({
  title: {
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(2),
    },
  },
}));

const Title: React.FC<IProps> = ({ children, ...props }) => {
  const classes = useStyles();
  return (
    <Typography variant="h3" align="left" className={classes.title} {...props}>
      {children}
    </Typography>
  );
};
export default Title;
