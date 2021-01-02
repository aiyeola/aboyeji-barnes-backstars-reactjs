import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import SnackBar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';

import SocialAuth from './shared/SocialAuth';
import Meta from './shared/Meta';
import { localAuth, socialAuth } from '../redux/actions/logInAction';
import bgImage from '../assets/bg1.png';

const useStyles = makeStyles((theme) => ({
  columnContainer: {
    height: '100vh',
    backgroundImage: `url(${bgImage})`,
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
  },
}));

function LoginPage(props) {
  // console.log('props: ', props);
  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    backgroundColor: '',
  });

  useEffect(() => {
    checkLoggedIn();
    // if (props.location.state !== undefined) {
    //   const base64encoded = props.location.search
    //     .split('&')[0]
    //     .split('?code=')[1];
    //   if (base64encoded) {
    //     const decoded = JSON.parse(atob(base64encoded));
    //     props.socialAuth(decoded);
    //   }
    // }
  }, []);

  useEffect(() => {
    if (props.logIn && props.logIn.error) {
      setError(true);
      setSubmitting(false);
      setAlert({
        open: true,
        message: props.logIn.error,
        backgroundColor: '#FF3232',
      });

      if (props.logIn.error === 'Invalid email or password entered') {
        setEmail('');
        setPassword('');
        setError(true);
        setAlert({
          open: true,
          message: props.logIn.error,
          backgroundColor: '#FF3232',
        });
      }
    }
  }, [props.logIn, error]);

  const checkLoggedIn = () =>
    localStorage.getItem('barnesToken') ? (window.location.href = '/') : null;

  const handleSubmit = () => {
    if (email.length > 0 && password.length > 0) {
      setSubmitting(true);
      const user = {
        userEmail: email,
        userPassword: password,
      };
      props.localAuth(user);
    } else {
      setAlert({
        open: true,
        message: 'Invalid Login Details',
        backgroundColor: '#FF3232',
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
              <TextField
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={classes.inputField}
              />
            </Grid>
            <Grid item style={{ marginBottom: '1rem' }}>
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={classes.inputField}
              />
            </Grid>
            <Grid item style={{ marginBottom: '1rem' }}>
              <Link component={RouterLink} to="/forgot-password">
                Forgot your password?
              </Link>
            </Grid>
            <Grid item style={{ marginBottom: '1rem', width: 150 }}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                {submitting ? (
                  <CircularProgress color="secondary" size={25} />
                ) : (
                  'LOG IN'
                )}
              </Button>
            </Grid>
            <Grid item style={{ width: '20rem' }}>
              <SocialAuth />
            </Grid>
            <Grid item>
              <Link gutterBottom component={RouterLink} to="/sign-up">
                Don&#39;t have a Barnes Backstars Account? {matchesXS && <br />}
                <span>Sign Up Now!</span>
              </Link>
            </Grid>
          </Grid>
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

LoginPage.propTypes = {
  logIn: PropTypes.object.isRequired,
  localAuth: PropTypes.func.isRequired,
  socialAuth: PropTypes.func.isRequired,
  // eslint-disable-next-line react/require-default-props
  location: PropTypes.object,
};

const mapStateToProps = ({ logIn }) => ({ logIn });

export { LoginPage };
export default connect(mapStateToProps, { localAuth, socialAuth })(LoginPage);
