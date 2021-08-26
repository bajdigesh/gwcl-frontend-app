import { makeStyles, Typography, TypographyProps } from '@material-ui/core';
import React from 'react';

interface IProps extends TypographyProps {}

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(0),
    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacing(2),
    },
  },
}));

const TitleSecondary: React.FC<IProps> = ({ children, ...props }) => {
  const classes = useStyles();
  return (
    <Typography variant="h4" align="left" className={classes.root} {...props}>
      {children}
    </Typography>
  );
};
export default TitleSecondary;
