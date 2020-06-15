import React, { Props } from 'react';

import { Button, withStyles } from '@material-ui/core';

export const TagifyButton = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
  },
}))(Button);
