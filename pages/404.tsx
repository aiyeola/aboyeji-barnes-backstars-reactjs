import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Meta from '@components/shared/Meta';

const useStyles = makeStyles((theme) => ({
  columnContainer: {
    height: '100vh',
    backgroundImage: 'url(/static/images/bg1.png)',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      backgroundColor: theme.palette.common.white,
      backgroundImage: 'none',
    },
  },
  paper: {
    width: '100%',
    maxWidth: '60vw',
    padding: '2rem',
    backgroundColor: theme.palette.common.white,
    [theme.breakpoints.down('sm')]: {
      maxWidth: '80vw',
      padding: '1rem',
      marginTop: '2rem',
      marginBottom: '2rem',
    },
    [theme.breakpoints.down('xs')]: {
      maxWidth: '100vw',
    },
  },
  logo: {
    textShadow: `1px 2px 6px ${theme.palette.grey[500]}`,
  },
  '@keyframes blink': {
    '0%': {
      opacity: 0,
    },
    '49%': {
      opacity: 0,
    },
    '50%': {
      opacity: 1,
    },
    '100%': {
      opacity: 1,
    },
  },
  blink: {
    animationName: '$blink',
    animationDuration: '1s',
    animationIterationCount: 'infinite',
  },
}));

export default function PageNotFound() {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Meta title="Page Not Found" />
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        className={classes.columnContainer}
      >
        <Grid
          item
          container
          direction="column"
          style={{ width: '100%' }}
          alignItems="center"
        >
          <Grid item style={{ marginBottom: '2rem' }}>
            <Typography
              gutterBottom
              variant="subtitle1"
              className={classes.logo}
            >
              Barnes Backstars
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant="h3"
              gutterBottom
              style={{ fontSize: matchesSM ? theme.spacing(4) : undefined }}
            >
              PAGE NOT FOUND
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant="h4"
              gutterBottom
              style={{
                fontSize: matchesSM ? theme.spacing(4) : undefined,
                color: theme.palette.error.main,
              }}
            >
              404
              <span className={classes.blink}>_</span>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
