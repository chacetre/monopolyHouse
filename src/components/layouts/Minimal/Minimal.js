import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop:0,
    height: '100%'
  },
  content: {
    height: '100%'
  }
}));

const Minimal = props => {
  const { children } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <main className={classes.content}>{children}</main>
    </div>
  );
};

Minimal.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default Minimal;
