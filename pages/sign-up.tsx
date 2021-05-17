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

import Link from '@components/Link';
import Meta from '@components/shared/Meta';
import validator from '@helpers/validator';
import SocialAuth from '@components/shared/SocialAuth';
import signUpAction, { resetSignupState } from '@redux/actions/signUpAction';
import { InitialState } from '@redux/InitialState';
import { SnackBarStateProps } from 'pages/log-in';

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

interface StateProps {
  signUp: InitialState['signUp'];
}

export default function SignUpPage(): JSX.Element {
  const classes = useStyles();
  const theme = useTheme();
  const router = useRouter();
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    userEmail: '',
    userPassword: '',
  });
  const { firstName, lastName, userEmail, userPassword } = userDetails;
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    firstName: undefined,
    lastName: undefined,
    userEmail: undefined,
    userPassword: undefined,
  });
  const [alert, setAlert] = useState<SnackBarStateProps>({
    open: false,
    message: '',
    backgroundColor: '',
  });

  const { signUp } = useSelector<InitialState, StateProps>((state) => ({
    signUp: state.signUp,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    checkLoggedIn();
  }, []);

  useEffect(() => {
    if (signUp.data) {
      setAlert({
        open: true,
        message: signUp.data,
        backgroundColor: theme.palette.success.main,
      });
      dispatch(resetSignupState());
      router.push('/call-4-verify');
      return;
    }
    if (signUp.error) {
      setSubmitting(false);
      setUserDetails({
        firstName: '',
        lastName: '',
        userEmail: '',
        userPassword: '',
      });
      setAlert({
        open: true,
        message: signUp.error,
        backgroundColor: theme.palette.error.main,
      });
      dispatch(resetSignupState());
    }
  }, [signUp]);

  const checkLoggedIn = () =>
    localStorage.getItem('barnesToken') ? router.push('/') : null;

  const validate = async (id: string, value: string) => {
    const { error } = await validator(id, value);
    return error;
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = async (
    e,
  ) => {
    const { id, value } = e.target;
    setUserDetails({ ...userDetails, [id]: value });
    setErrors({ ...errors, [id]: await validate(id, value) });
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const hasErrors = Object.values(errors).some((val) => val !== undefined);

    if (!hasErrors) {
      setSubmitting(true);
      dispatch(signUpAction(userDetails));
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
              <Grid item style={{ marginBottom: theme.spacing(4), width: 150 }}>
                <Button
                  type="submit"
                  disabled={
                    firstName.length === 0 ||
                    lastName.length === 0 ||
                    userEmail.length === 0 ||
                    userPassword.length === 0 ||
                    Object.values(errors).some((val) => val !== undefined) ||
                    submitting
                  }
                >
                  {submitting ? (
                    <CircularProgress color="primary" />
                  ) : (
                    'Sign Up'
                  )}
                </Button>
              </Grid>
              <Grid item style={{ width: '20rem' }}>
                <SocialAuth />
              </Grid>
              <Grid item>
                <Link gutterBottom href="/log-in">
                  Already have a Barnes Backstars Account? {matchesXS && <br />}
                  <span>Log In!</span>
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
        onClose={() => setAlert({ ...alert, open: false })}
      />
    </>
  );
}
