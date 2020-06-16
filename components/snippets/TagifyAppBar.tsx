import PropTypes from 'prop-types';
import React from 'react';

import {
    AppBar, createStyles, makeStyles, Slide, Theme, Toolbar, useScrollTrigger
} from '@material-ui/core';

const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    transparent: {
      background: "transparent",
    },
  })
);

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
  transparent: PropTypes.bool,
};
TagifyAppBar.defaultProps = {
  hideOnScroll: false,
  transparent: false,
};
export function TagifyAppBar({
  children,
  hideOnScroll,
  transparent,
}): JSX.Element {
  const classes = useStyles();
  let bar = (
    <AppBar
      className={transparent ? classes.transparent : undefined}
      elevation={0}
    >
      <Toolbar>{children}</Toolbar>
    </AppBar>
  );
  return hideOnScroll ? <HideOnScroll>{bar}</HideOnScroll> : bar;
}
