import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Link from '@components/Link';

const useStyles = makeStyles((theme) => ({
  inputField: {
    minWidth: '10rem',
    [theme.breakpoints.down('xs')]: {
      minWidth: '3rem',
    },
  },
}));

export const ResetFormTemplate = ({
  handleChange,
  handleSubmit,
  submitting,
}) => {
  const classes = useStyles();

  return (
    <>
      <Grid item style={{ marginBottom: '2rem' }}>
        <Typography paragraph align="center">
          In order to reset password please provide an email linked to your
          Barnes Backstars account below
        </Typography>
      </Grid>
      <Grid item style={{ marginBottom: '2rem' }}>
        <TextField
          id="email"
          name="email"
          variant="outlined"
          label="Email Address"
          className={classes.inputField}
          onChange={handleChange}
        />
      </Grid>

      <Grid item style={{ width: 200 }}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          {submitting ? (
            <CircularProgress color="secondary" size={25} />
          ) : (
            'Reset Password'
          )}
        </Button>
      </Grid>
    </>
  );
};

export const ResetEmailSentTemplate = ({ email }) => (
  <>
    <Grid item style={{ marginBottom: '2rem' }}>
      <Typography gutterBottom>
        Kindly check your <strong>{email}</strong> for password reset
        information
      </Typography>
    </Grid>

    <Button variant="contained" color="primary" component={Link} href="/log-in">
      LOG IN
    </Button>
  </>
);

export const PasswordResetFormTemplate = ({
  handleSubmit,
  handleChange,
  error,
  submitting,
}) => {
  const classes = useStyles();

  return (
    <>
      <Grid item style={{ marginBottom: '2rem' }}>
        <TextField
          name="password"
          type="password"
          variant="outlined"
          label="Enter password"
          onChange={handleChange}
          error={error.password !== undefined}
          helperText={error.password}
          required
        />
      </Grid>
      <Grid item style={{ marginBottom: '2rem' }}>
        <TextField
          name="newPassword"
          type="password"
          variant="outlined"
          label="Confirm Password"
          onChange={handleChange}
          error={error.match !== undefined}
          helperText={error.match}
          required
        />
      </Grid>
      <Grid item style={{ width: 200 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          className={classes.inputField}
        >
          {submitting ? (
            <CircularProgress color="secondary" size={25} />
          ) : (
            'Submit'
          )}
        </Button>
      </Grid>
    </>
  );
};
