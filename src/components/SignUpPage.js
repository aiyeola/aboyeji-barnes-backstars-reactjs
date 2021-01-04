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

import Meta from './shared/Meta';
import validator from '../helpers/validator';
import SocialAuth from './shared/SocialAuth';
import bgImage from '../assets/bg1.png';
import signUpAction from '../redux/actions/signUpAction';

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
      height: 'auto',
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

function SignUpPage(props) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    userEmail: '',
    userPassword: '',
  });
  const { firstName, lastName, userEmail, userPassword } = data;
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    firstName: undefined,
    lastName: undefined,
    userEmail: undefined,
    userPassword: undefined,
  });
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    backgroundColor: '',
  });

  useEffect(() => {
    checkLoggedIn();
  }, []);

  useEffect(() => {
    if (props.signUp.data !== null) {
      props.history.push('/call-4-verify');
    } else if (props.signUp.error !== null) {
      setSubmitting(false);
      setAlert({
        open: true,
        message: props.signUp.error.message,
        backgroundColor: '#FF3232',
      });
    }
  }, [props.signUp]);

  const checkLoggedIn = () =>
    localStorage.getItem('barnesToken') ? (window.location.href = '/') : null;

  const validate = async (id, value) => {
    // @ts-ignore
    let { error } = await validator(id, value);
    return error;
  };

  const handleChange = async (e) => {
    const { id, value } = e.target;
    setData({ ...data, [id]: value });
    setErrors({ ...errors, [id]: await validate(id, value) });
  };

  const handleSubmit = () => {
    const hasErrors = Object.values(errors).some((val) => val !== undefined);

    if (!hasErrors) {
      setSubmitting(true);
      props.SignUp(data);
    }
  };

  return (
    <>
      <Meta title="Sign Up" />
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
                id="firstName"
                label="First Name"
                variant="outlined"
                value={firstName}
                onChange={handleChange}
                className={classes.inputField}
                required
                error={errors.firstName !== undefined}
                helperText={errors.firstName}
              />
            </Grid>
            <Grid item style={{ marginBottom: '2rem' }}>
              <TextField
                id="lastName"
                label="Last Name"
                variant="outlined"
                value={lastName}
                onChange={handleChange}
                className={classes.inputField}
                required
                error={errors.lastName !== undefined}
                helperText={errors.lastName}
              />
            </Grid>
            <Grid item style={{ marginBottom: '2rem' }}>
              <TextField
                id="userEmail"
                label="Email"
                variant="outlined"
                value={userEmail}
                onChange={handleChange}
                className={classes.inputField}
                required
                error={errors.userEmail !== undefined}
                helperText={errors.userEmail}
              />
            </Grid>
            <Grid item style={{ marginBottom: '2rem' }}>
              <TextField
                id="userPassword"
                label="Password"
                variant="outlined"
                type="password"
                value={userPassword}
                onChange={handleChange}
                className={classes.inputField}
                required
                error={errors.userPassword !== undefined}
                helperText={errors.userPassword}
              />
            </Grid>
            <Grid item style={{ marginBottom: '1rem', width: 150 }}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={
                  firstName.length === 0 ||
                  lastName.length === 0 ||
                  userEmail.length === 0 ||
                  userPassword.length === 0 ||
                  Object.values(errors).some((val) => val !== undefined)
                }
              >
                {submitting ? (
                  <CircularProgress color="secondary" size={25} />
                ) : (
                  'Sign Up'
                )}
              </Button>
            </Grid>
            <Grid item style={{ width: '20rem' }}>
              <SocialAuth />
            </Grid>
            <Grid item>
              <Link gutterBottom component={RouterLink} to="/log-in">
                Already have a Barnes Backstars Account? {matchesXS && <br />}
                <span>Log In!</span>
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

SignUpPage.defaultProps = {
  history: PropTypes.object,
  push: PropTypes.func,
};

SignUpPage.propTypes = {
  SignUp: PropTypes.func.isRequired,
  signUp: PropTypes.object.isRequired,
  history: PropTypes.object,
  push: PropTypes.func,
};

const mapStateToProps = ({ signUp }) => ({ signUp });

const mapDispatchToProps = {
  SignUp: signUpAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
