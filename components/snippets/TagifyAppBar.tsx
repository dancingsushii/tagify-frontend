import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { AppBar, Slide, Toolbar, useScrollTrigger, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  transparent: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    boxShadow: "none",
  },
  visibility: {
    opacity: 1.0
  }, 
});

HideOnScroll.propTypes = {
  children: PropTypes.node.isRequired,
};
function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => ++value); // update the state to force render
}

TagifyAppBar.propTypes = {
  children: PropTypes.node.isRequired,
  hideOnScroll: PropTypes.bool,
  transparent: PropTypes.bool,
};
TagifyAppBar.defaultProps = {
  hideOnScroll: false,
  transparent: false,
};

export function TagifyAppBar({ children, hideOnScroll }): JSX.Element {
  const forceUpdate = useForceUpdate();
  const classes = useStyles();
  let bar = (
    <AppBar onClick={forceUpdate} className={(location.pathname === "/") ? classes.transparent : classes.visibility}>

      <Toolbar>{children}</Toolbar>
    </AppBar>
  );
  return hideOnScroll ? <HideOnScroll>{bar}</HideOnScroll> : bar;
}
