import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';

import Meta from '@components/shared/Meta';
import Link from '@components/Link';

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
  verifyText: {
    color: theme.palette.grey[500],
  },
}));

export default function CallForVerify({}) {
  const classes = useStyles();
  const theme = useTheme();
  const router = useRouter();
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

  useEffect(() => {
    const token = localStorage.getItem('barnesToken');
    return token ? router.push('/dashboard') : undefined;
  });

  return (
    <>
      <Meta title="Verify your account" />
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        className={classes.columnContainer}
      >
        <Paper classes={{ root: classes.paper }} elevation={matchesXS ? 0 : 1}>
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
            <Grid item style={{ marginBottom: '2rem' }}>
              <Typography paragraph variant="h4" align="center">
                Please verify your email!
              </Typography>
              <Typography paragraph variant="body1" align="center">
                An email has been sent to your inbox with a link to verify your
                account. If you have not received the email after a few minutes,
                please check your spam folder.
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                paragraph
                variant="body1"
                align="center"
                className={classes.verifyText}
              >
                <WarningRoundedIcon /> The verification link is valid for 24
                hours.
              </Typography>
            </Grid>
            <Grid item>
              <Link gutterBottom href="/log-in">
                ok
              </Link>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
}
