import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import SnackBar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import Meta from './shared/Meta';
import bgImage from '../assets/bg1.png';
import reverifyAction from '../redux/actions/reverifyAction';

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
function ReverifyPage(props) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

  const [userEmail, setUserEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    backgroundColor: '',
  });

  useEffect(() => {
    return localStorage.getItem('barnesToken')
      ? props.history.push('/dashboard')
      : undefined;
  }, []);

  useEffect(() => {
    const {
      reVerify: { data, error },
      history,
    } = props;
    if (data) {
      history.push('/call-4-verify');
    }
    if (error) {
      switch (error.status) {
        case 404:
          setAlert({
            open: true,
            message: 'Email not registered',
            backgroundColor: theme.palette.error.main,
          });
          setSubmitting(false);
          break;

        case 501:
          setAlert({
            open: true,
            message: 'Connection Error',
            backgroundColor: theme.palette.error.main,
          });
          setSubmitting(false);
          break;
        default:
          setAlert({
            open: true,
            message: 'Server Error, Try again later',
            backgroundColor: theme.palette.error.main,
          });
          setSubmitting(false);
          break;
      }
    }
  }, [props.reVerify]);

  const handleSubmit = () => {
    setSubmitting(true);
    props.reverifyAction(userEmail);
  };

  return (
    <>
      <Meta title="Reverify" />
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
              <Typography paragraph align="center">
                Your verification link has expired enter your email to get a new
                one
              </Typography>
            </Grid>
            <Grid item style={{ marginBottom: '2rem' }}>
              <TextField
                id="userEmail"
                label="Email"
                variant="outlined"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className={classes.inputField}
              />
            </Grid>
            <Grid item style={{ marginBottom: theme.spacing(4), width: 150 }}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={userEmail.length === 0}
              >
                {submitting ? (
                  <CircularProgress color="secondary" size={25} />
                ) : (
                  'Submit'
                )}
              </Button>
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

ReverifyPage.propTypes = {
  reVerify: PropTypes.object.isRequired,
  reverifyAction: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = ({ reVerify }) => ({ reVerify });

export default connect(mapStateToProps, { reverifyAction })(ReverifyPage);
