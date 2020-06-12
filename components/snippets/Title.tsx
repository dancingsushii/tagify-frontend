import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import { Typography } from '@material-ui/core';

Title.propTypes = {
  style: PropTypes.object,
};

export function Title({ style }) {
  return (
    <Typography
      variant="h5"
      style={Object.assign({ textDecoration: "none", color: "inherit" }, style)}
      component={Link}
      to={"/"}
    >
      Tagify
    </Typography>
  );
}
