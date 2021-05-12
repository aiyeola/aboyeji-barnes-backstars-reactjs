import React from 'react';
import Image from 'next/image';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: '1rem',
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
      alignItems="center"
    >
      <Grid
        item
        md
        style={{
          marginBottom: matchesSM ? '1rem' : 0,
        }}
      >
        <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/google`}>
          <Image
            src="/static/images/google.png"
            alt="logo"
            width={30}
            height={30}
          />
          <Typography className={classes.socialText} variant="body1">
            Continue with Google
          </Typography>
        </Link>
      </Grid>

      <Grid item md style={{}}>
        <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/facebook`}>
          <Image
            src="/static/images/facebook.png"
            alt="logo"
            width={30}
            height={30}
          />
          <Typography className={classes.socialText} variant="body1">
            Continue with Facebook
          </Typography>
        </Link>
      </Grid>
    </Grid>
  );
}
