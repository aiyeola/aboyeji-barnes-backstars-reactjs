import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SnackBar from '@material-ui/core/Snackbar';

import validator from '@helpers/validator';
import { InitialState } from '@redux/InitialState';
import { SnackBarStateProps } from 'pages/log-in';
import { resetErrorState } from '@redux/actions/errorAction';
import {
  ResetFormTemplate,
  PasswordResetFormTemplate,
  ResetEmailSentTemplate,
} from './ResetPasswordForm';
import {
  sendResetPasswordAction,
  resetPasswordAction,
} from '@redux/actions/resetPasswordAction';

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
      padding: '1rem',
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
  errors: InitialState['errors'];
  resetPassword: InitialState['resetPassword'];
}

export type ValidationErrors = {
  email: string;
  password?: string;
  match?: string;
};

function ResetPasswordPage() {
  const router = useRouter();

  const { userId, userToken } = router.query;

  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [validationErrors, setErrors] = useState<ValidationErrors>({
    email: '',
    password: '',
    match: '',
  });
  const [alert, setAlert] = useState<SnackBarStateProps>({
    open: false,
    message: '',
    backgroundColor: '',
  });

  const { errors, resetPassword } = useSelector<InitialState, StateProps>(
    (state) => ({
      errors: state.errors,
      resetPassword: state.resetPassword,
    }),
  );
  console.log('errors: ', errors);
  console.log('resetPassword: ', resetPassword);

  const dispatch = useDispatch();

  useEffect(() => {
    checkLoggedIn();
  }, []);

  useEffect(() => {
    redirect();
  }, [errors, resetPassword]);

  const checkLoggedIn = () =>
    localStorage.getItem('barnesToken') ? router.push('/') : null;

  const validate = async (id: string, value: string) => {
    const { error } = await validator(id, value);
    return error;
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = async ({
    target,
  }) => {
    switch (target.name) {
      case 'emailAddress':
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
        setNewPassword(target.value);
        if (validationErrors.match) {
          setErrors({
            ...validationErrors,
            match: '',
          });
        }
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const hasErrors = Object.values(validationErrors).some(
      (val) => val !== '' && val !== undefined,
    );

    if (email !== '') {
      const invalidEmail = await validate('emailAddress', email);
      if (invalidEmail) {
        setErrors({
          ...validationErrors,
          email: invalidEmail,
        });
        setSubmitting(false);
        return;
      } else if (typeof invalidEmail === 'undefined') {
        setErrors({
          ...validationErrors,
          email: '',
        });
        setSubmitting(true);
        dispatch(sendResetPasswordAction(email));
      }
    }

    if (!hasErrors && password && newPassword) {
      if (password === newPassword) {
        setSubmitting(true);
        const data = { password, newPassword, userId, userToken };
        dispatch(resetPasswordAction(data));
      } else {
        setErrors({
          ...validationErrors,
          match: 'Passwords do not match',
        });
      }
    }
  };

  const redirect = async () => {
    if (userId === undefined) {
      if (
        email !== '' &&
        errors.message === '' &&
        resetPassword.message.includes('email')
      ) {
        setEmailSent(true);
        setAlert({
          open: true,
          message: 'Password Reset Link Sent',
          backgroundColor: theme.palette.success.main,
        });
      }

      if (email !== '' && errors.message) {
        setSubmitting(false);
        setAlert({
          open: true,
          message: errors.message,
          backgroundColor: theme.palette.error.main,
        });
      }

      if (email !== '' && !resetPassword.message.includes('email')) {
        setEmail('');
        setSubmitting(false);
        setAlert({
          open: true,
          message: resetPassword.message,
          backgroundColor: theme.palette.error.main,
        });
        dispatch(resetErrorState());
      }
    }

    if (userId) {
      if (
        password !== '' &&
        errors.message === '' &&
        resetPassword.message.includes('login')
      ) {
        setAlert({
          open: true,
          message: 'Password Reset Successful',
          backgroundColor: theme.palette.success.main,
        });
        router.push('/log-in');
      }
      if (password !== '' && errors.message) {
        setSubmitting(false);
        setAlert({
          open: true,
          message: resetPassword.message,
          backgroundColor: theme.palette.error.main,
        });
        setTimeout(() => {
          setAlert({
            open: true,
            message: 'Try to login via Google or Facebook',
            backgroundColor: theme.palette.error.main,
          });
        }, 3000);
        dispatch(resetErrorState());
      }
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
              {userId === undefined ? (
                !emailSent ? (
                  <ResetFormTemplate
                    handleChange={handleChange}
                    submitting={submitting}
                    error={validationErrors}
                    email={email}
                  />
                ) : (
                  <ResetEmailSentTemplate />
                )
              ) : (
                <PasswordResetFormTemplate
                  handleChange={handleChange}
                  error={validationErrors}
                  submitting={submitting}
                  password={password}
                  newPassword={newPassword}
                />
              )}
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

export default ResetPasswordPage;
