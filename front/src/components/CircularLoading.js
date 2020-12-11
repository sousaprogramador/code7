import React, { memo } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Grid } from '@material-ui/core';

const CircularLoading = memo(() => (
  <Grid
    container
    spacing={0}
    alignItems="center"
    justify="center"
    style={{ minHeight: '100vh' }}
  >
    <CircularProgress color="primary" />
  </Grid>
));

export default CircularLoading;
