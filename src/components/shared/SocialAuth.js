import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Facebook from '../../logo/iconfinder_square-facebook_317727.png';
import Google from '../../logo/iconfinder_Google_1298745.png';
import { BASE_URL } from '../../config';

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: '1rem',
  },
  logo: {
    width: 30,
    height: 30,
  },
  socialText: {
    color: theme.palette.common.black,
    fontSize: '0.7rem',
    fontWeight: 300,
  },
}));

export default function SocialAuth() {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid
      container
      direction={matchesSM ? 'column' : 'row'}
      className={classes.container}
      alignItems={matchesSM ? 'center' : undefined}
    >
      <Grid
        item
        style={{
          marginBottom: matchesSM ? '1rem' : 0,
          marginRight: matchesSM ? 0 : '1rem',
        }}
      >
        <Grid item container md>
          <Link href={`${BASE_URL}/api/v1/auth/google`}>
            <Grid item>
              <img src={Google} alt="logo" className={classes.logo} />
              <Typography className={classes.socialText} variant="body1">
                Continue with Google
              </Typography>
            </Grid>
          </Link>
        </Grid>
      </Grid>

      <Grid item>
        <Grid item container md>
          <Link href={`${BASE_URL}/api/v1/auth/facebook`}>
            <Grid item>
              <img src={Facebook} alt="logo" className={classes.logo} />
              <Typography className={classes.socialText} variant="body1">
                Continue with Facebook
              </Typography>
            </Grid>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
}
