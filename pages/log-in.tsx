import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import SnackBar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import grey from '@material-ui/core/colors/grey';

import Link from '@components/Link';
import Meta from '@components/shared/Meta';
import SocialAuth from '@components/shared/SocialAuth';
import {
  localAuth,
  socialAuth,
  resetLoginState,
} from '@redux/actions/logInAction';
import { InitialState } from '@redux/InitialState';

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
      backgroundColor: grey[100],
      backgroundImage: 'none',
    },
    [theme.breakpoints.down('xs')]: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    width: '100%',
    maxWidth: '60vw',
    padding: theme.spacing(4),
    backgroundColor: theme.palette.common.white,
    [theme.breakpoints.down('sm')]: {
      maxWidth: '80vw',
      padding: '1rem',
    },
    [theme.breakpoints.down('xs')]: {
      maxWidth: '100vw',
      padding: 0,
    },
  },
  logo: {
    textShadow: `1px 2px 6px ${theme.palette.grey[500]}`,
  },
  inputField: {
    minWidth: '10rem',
    [theme.breakpoints.down('xs')]: {
      minWidth: '3rem',
    },
  },
}));

interface StateProps {
  logIn: InitialState['logIn'];
  errors: InitialState['errors'];
}

type SnackBarStateProps = {
  open: boolean;
  message?: string;
  backgroundColor: string;
};

export default function LoginPage(): JSX.Element {
  const classes = useStyles();
  const theme = useTheme();
  const router = useRouter();

  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [alert, setAlert] = useState<SnackBarStateProps>({
    open: false,
    message: '',
    backgroundColor: '',
  });

  const { logIn, errors } = useSelector<InitialState, StateProps>((state) => ({
    logIn: state.logIn,
    errors: state.errors,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    checkLoggedIn();
    const base64encoded = router.asPath.split('?code=')[1] as string;
    if (base64encoded) {
      const decoded = JSON.parse(atob(base64encoded));
      dispatch(socialAuth(decoded));
    }
  }, []);

  useEffect(() => {
    if (logIn.isLoggedIn) {
      setAlert({
        open: true,
        message: logIn?.message,
        backgroundColor: theme.palette.success.main,
      });
      router.push('/dashboard');
      return;
    }

    if (logIn.error) {
      setEmail('');
      setPassword('');
      setSubmitting(false);
      dispatch(resetLoginState());
      setAlert({
        open: true,
        message: logIn.error,
        backgroundColor: theme.palette.error.main,
      });
    }
  }, [logIn.error, logIn.isLoggedIn]);

  useEffect(() => {
    setAlert({
      open: true,
      message: errors.message,
      backgroundColor: theme.palette.error.main,
    });
    setSubmitting(false);
    dispatch(resetLoginState());
  }, [errors]);

  const checkLoggedIn = () =>
    localStorage.getItem('barnesToken') ? router.push('/dashboard') : null;

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (email.length > 0 && password.length > 0) {
      setSubmitting(true);
      const user = {
        userEmail: email,
        userPassword: password,
      };
      dispatch(localAuth(user));
    } else {
      setEmail('');
      setPassword('');
      setSubmitting(false);
      setAlert({
        open: true,
        message: 'Invalid Login Details',
        backgroundColor: theme.palette.error.main,
      });
    }
  };

  return (
    <>
      <Meta title="Log In" />
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        className={classes.columnContainer}
      >
        <Paper classes={{ root: classes.paper }} elevation={matchesXS ? 0 : 1}>
          <form onSubmit={handleSubmit}>
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
              <Grid item style={{ marginBottom: theme.spacing(4) }}>
                <TextField
                  label="Email"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={classes.inputField}
                />
              </Grid>
              <Grid item style={{ marginBottom: theme.spacing(2) }}>
                <TextField
                  label="Password"
                  variant="outlined"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={classes.inputField}
                />
              </Grid>
              <Grid item style={{ marginBottom: theme.spacing(2) }}>
                <Link href="/forgot-password">Forgot your password?</Link>
              </Grid>
              <Grid item style={{ marginBottom: theme.spacing(4), width: 150 }}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={submitting}
                >
                  {submitting ? (
                    <CircularProgress color="primary" size={24} />
                  ) : (
                    'LOG IN'
                  )}
                </Button>
              </Grid>
              <Grid item style={{ width: '20rem' }}>
                <SocialAuth />
              </Grid>
              <Grid item>
                <Link href="/sign-up">
                  Don&#39;t have a Barnes Backstars Account?{' '}
                  {matchesXS && <br />}
                  <span>Sign Up Now!</span>
                </Link>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>

      <SnackBar
        open={alert.open}
        message={alert.message}
        ContentProps={{
          style: {
            backgroundColor: alert.backgroundColor,
          },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={() => setAlert({ ...alert, open: false })}
        autoHideDuration={3000}
      />
    </>
  );
}
