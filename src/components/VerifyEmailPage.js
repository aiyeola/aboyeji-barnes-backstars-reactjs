import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SnackBar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';

import Spinner from './shared/Spinner';
import Meta from './shared/Meta';
import verifyAction from '../redux/actions/verifyAction';

const useStyles = makeStyles((theme) => ({
  columnContainer: {
    height: '100vh',
    backgroundColor: theme.palette.common.white,
    width: '100vw',
  },
  logo: {
    textShadow: `1px 2px 6px ${theme.palette.grey[500]}`,
  },
}));
export function VerifyPage(props) {
  const classes = useStyles();
  const theme = useTheme();

  const [alert, setAlert] = useState({
    open: false,
    message: '',
    backgroundColor: '',
  });

  useEffect(() => {
    const token = props.location.search.split('?token=')[1];
    if (token) {
      props.verifyAction(token);
    } else {
      props.history.push('/log-in');
      return localStorage.getItem('barnesToken')
        ? props.history.push('/dashboard')
        : null;
    }
  }, []);

  useEffect(() => {
    const {
      verify: { data, error },
      history,
    } = props;
    if (data) {
      const { userToken } = data;
      localStorage.setItem('barnesToken', userToken);
      history.push('/log-in');
      setAlert({
        open: true,
        message: 'Email Verified Successfully',
        backgroundColor: theme.palette.success.main,
      });
    }
    if (error) {
      switch (error.status) {
        case 401:
          setAlert({
            open: true,
            message: 'Verification link is expired',
            backgroundColor: theme.palette.error.main,
          });
          history.push('/reverify');
          break;
        case 500:
          setAlert({
            open: true,
            message: 'Server Error, Try Again',
            backgroundColor: theme.palette.error.main,
          });
          history.push('/500');
          break;
        case 501:
          setAlert({
            open: true,
            message: 'Connection Error, Try Refreshing Your Browser',
            backgroundColor: theme.palette.error.main,
          });
          break;
        default:
          setAlert({
            open: true,
            message: 'Email Already Verified, Log in',
            backgroundColor: theme.palette.info.main,
          });
          history.push('/log-in');
      }
    }
  }, [props.verify]);

  const Snackbar = (
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
  );

  return (
    <>
      <Meta title="Verify Email" />
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        className={classes.columnContainer}
      >
        {!props.data && !props.error ? (
          <Spinner />
        ) : (
          <Grid
            item
            container
            direction="column"
            style={{ width: '100%' }}
            alignItems="center"
          >
            <Grid item>
              <Typography
                gutterBottom
                variant="subtitle1"
                className={classes.logo}
              >
                Barnes Backstars
              </Typography>
            </Grid>
          </Grid>
        )}
        {Snackbar}
      </Grid>
    </>
  );
}

VerifyPage.defaultProps = {
  token: '',
};

VerifyPage.propTypes = {
  verify: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  token: PropTypes.string,
};

const mapStateToProps = ({ verify }) => ({ verify });

export default connect(mapStateToProps, { verifyAction })(VerifyPage);
