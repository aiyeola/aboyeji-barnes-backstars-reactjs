import React from 'react';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';

export default function Spinner() {
  return (
    <Grid item style={{ minWidth: '80vw' }}>
      <LinearProgress />
    </Grid>
  );
}
