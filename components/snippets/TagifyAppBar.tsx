import PropTypes from 'prop-types';
import React from 'react';

import { AppBar, Slide, Toolbar, useScrollTrigger } from '@material-ui/core';

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

TagifyAppBar.propTypes = {
  children: PropTypes.node.isRequired,
  hideOnScroll: PropTypes.bool,
};
TagifyAppBar.defaultProps = {
  hideOnScroll: false,
};
export function TagifyAppBar({ children, hideOnScroll }): JSX.Element {
  let bar = (
    <AppBar>
      <Toolbar>{children}</Toolbar>
    </AppBar>
  );
  return hideOnScroll ? <HideOnScroll>{bar}</HideOnScroll> : bar;
}
