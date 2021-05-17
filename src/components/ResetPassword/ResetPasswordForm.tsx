import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Link from '@components/Link';
import Meta from '@components/shared/Meta';
import { ValidationErrors } from '@components/ResetPassword/ResetPasswordPage';

const useStyles = makeStyles((theme) => ({
  inputField: {
    minWidth: '10rem',
    [theme.breakpoints.down('xs')]: {
      minWidth: '3rem',
    },
  },
}));

interface ResetProps {
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  submitting: boolean;
  email: string;
  error: ValidationErrors;
}

export const ResetFormTemplate = ({
  handleChange,
  submitting,
  email,
  error,
}: ResetProps) => {
  const classes = useStyles();

  return (
    <>
      <Meta title="Forgot Password" />
      <Grid item style={{ marginBottom: '2rem' }}>
        <Typography paragraph align="center">
          In order to reset password, provide the email linked to your Barnes
          Backstars account
        </Typography>
      </Grid>
      <Grid item style={{ marginBottom: '2rem' }}>
        <TextField
          id="email"
          name="emailAddress"
          variant="outlined"
          label="Email Address"
          value={email}
          className={classes.inputField}
          onChange={handleChange}
          error={error.email !== ''}
          helperText={error.email}
          required
        />
      </Grid>

      <Grid item style={{ width: 200 }}>
        <Button disabled={submitting} type="submit">
          {submitting ? <CircularProgress color="primary" /> : 'Reset Password'}
        </Button>
      </Grid>
    </>
  );
};

export const ResetEmailSentTemplate = () => (
  <>
    <Grid item style={{ marginBottom: '2rem' }}>
      <Typography paragraph align="center">
        Kindly check your mailbox for password reset information
      </Typography>
    </Grid>

    <Link href="/log-in">
      <Button>LOG IN</Button>
    </Link>
  </>
);

interface PasswordResetProps extends Partial<ResetProps> {
  password: string;
  newPassword: string;
}

export const PasswordResetFormTemplate = ({
  handleChange,
  error,
  submitting,
  password,
  newPassword,
}: PasswordResetProps) => {
  const classes = useStyles();

  return (
    <>
      <Meta title="Reset Password" />
      <Grid
        item
        style={{
          marginBottom: '1.3rem',
        }}
      >
        <Typography paragraph gutterBottom align="center">
          RESET PASSWORD
        </Typography>
      </Grid>
      <Grid item style={{ marginBottom: '2rem' }}>
        <TextField
          name="password"
          type="password"
          value={password}
          variant="outlined"
          label="Enter password"
          onChange={handleChange}
          error={error?.password !== '' && error?.password !== undefined}
          helperText={error?.password}
          required
        />
      </Grid>
      <Grid item style={{ marginBottom: '2rem' }}>
        <TextField
          name="newPassword"
          type="password"
          value={newPassword}
          variant="outlined"
          label="Confirm Password"
          onChange={handleChange}
          error={error?.match !== ''}
          helperText={error?.match}
          required
        />
      </Grid>
      <Grid item>
        <Button
          type="submit"
          disabled={submitting}
          className={classes.inputField}
        >
          {submitting ? <CircularProgress color="primary" /> : 'Submit'}
        </Button>
      </Grid>
    </>
  );
};
