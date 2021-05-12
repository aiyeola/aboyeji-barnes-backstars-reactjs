/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SnackBar from '@material-ui/core/Snackbar';

import Meta from '@components/shared/Meta';
import validator from '@helpers/validator';
import {
  sendResetPassword,
  resetPassword,
} from '@redux/actions/resetPasswordAction';
import {
  ResetFormTemplate,
  PasswordResetFormTemplate,
  ResetEmailSentTemplate,
} from './ResetPasswordForm';

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

function ResetPasswordPage(props) {
  const router = useRouter();

  const { userId, userToken } = router.query;

  //  get localstorage in nextjs
  // if (localStorage.getItem('barnesToken')) {
  //   router.push('/dashboard');
  // }

  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [validationErrors, setErrors] = useState({
    email: undefined,
    password: undefined,
    match: undefined,
  });
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    backgroundColor: '',
  });

  useEffect(() => {
    // redirect();
  }, [props.errors]);

  const validate = async (id, value) => {
    // @ts-ignore
    let { error } = await validator(id, value);
    return error;
  };

  const handleChange = async ({ target }) => {
    switch (target.name) {
      case 'email':
        setEmail(target.value);
        break;
      case 'password':
        setPassword(target.value);
        setErrors({
          ...validationErrors,
          password: await validate(target.name, target.value),
        });
        break;
      case 'newPassword':
        setErrors({
          ...validationErrors,
          match: undefined,
        });
        setNewPassword(target.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = () => {
    const hasErrors = Object.values(validationErrors).some(
      (val) => val !== undefined,
    );

    if (email !== undefined && email.length > 5) {
      setSubmitting(true);
      props.sendResetPassword({ email });
    }

    if (!hasErrors && password.length > 0 && newPassword) {
      if (password === newPassword) {
        console.log('password: ', password);
        console.log('newPassword: ', newPassword);
        setSubmitting(true);
        props.resetPassword({ password, newPassword, userId, userToken });
      } else {
        setErrors({
          ...validationErrors,
          match: 'Passwords do not match',
        });
      }
    }
  };

  const redirect = () => {
    if (userId === undefined) {
      if (email !== undefined && props.errors.message === '') {
        setEmailSent(true);
        setAlert({
          open: true,
          message: 'Reset Password Link Sent',
          backgroundColor: theme.palette.success.main,
        });
      } else if (email !== undefined && props.errors.message !== '') {
        setAlert({
          open: true,
          message: props.errors.message,
          backgroundColor: theme.palette.error.main,
        });
      }
    }

    if (password !== undefined && props.errors.message === '') {
      setAlert({
        open: true,
        message: 'Password Reset Successfully',
        backgroundColor: theme.palette.success.main,
      });
      router.push('/');
    } else if (password !== undefined && props.errors.message !== '') {
      setAlert({
        open: true,
        message: errors.message,
        backgroundColor: theme.palette.error.main,
      });
    }
  };

  return (
    <>
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
            {props.userId === undefined ? (
              !emailSent ? (
                <>
                  <Meta title="Forgot Password" />
                  <ResetFormTemplate
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    submitting={submitting}
                  />
                </>
              ) : (
                <ResetEmailSentTemplate email={email} />
              )
            ) : (
              <>
                <Meta title="Reset Password" />
                <PasswordResetFormTemplate
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  error={validationErrors}
                  submitting={submitting}
                />
              </>
            )}
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

const mapStateToProps = ({ errors }) => ({ errors });

export default connect(mapStateToProps, { sendResetPassword, resetPassword })(
  ResetPasswordPage,
);
