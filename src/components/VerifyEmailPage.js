import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import Spinner from './shared/Spinner';
import Meta from './shared/Meta';
import verifyAction from '../redux/actions/verifyAction';

class VerifyPage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  static getDerivedStateFromProps(nextProps) {
    const {
      verify: { data, error },
      history
    } = nextProps;
    if (data) {
      const { userToken } = data;
      localStorage.setItem('barnesToken', userToken);
      history.push('/log-in');
      toast.success('Email Verified Successfully');
    }
    if (error) {
      switch (error.status) {
        case 401:
          toast.error('Verification link is expired');
          history.push('/reverify');
          break;
        case 500:
          toast.error('Server Error, Try Again');
          history.push('/500');
          break;
        case 501:
          toast.error('Connection Error, Try Refreshing Your Browser');
          break;
        default:
          toast.info('Email Already Verified, Log in');
          history.push('/log-in');
      }
    }
    return null;
  }

  componentDidMount() {
    const { location, verifyAction, history } = this.props;
    const token = location.search.split('?token=')[1];
    if (token) {
      verifyAction(token);
    } else {
      history.push('/log-in');
      const token = localStorage.getItem('barnesToken');
      return token ? history.push('/dashboard') : null;
    }
  }

  render() {
    const { data, error } = this.props.verify;
    return !data && !error ? (
      <div>
        <Meta title="Verify Email" />
        <Spinner />
      </div>
    ) : (
      <div>
        <Meta title="Verify Email" />
        <div className="verify-container">
          <img
            src="https://res.cloudinary.com/aboyeji-barnes-backstars/image/upload/v1588818157/aboyeji-barnes-backstars/Barnes_2_cpqaef.jpg"
            alt="Barnes-Backstars logo"
            className="verify-img"
          />
        </div>
      </div>
    );
  }
}

VerifyPage.defaultProps = {
  token: ''
};

VerifyPage.propTypes = {
  verify: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  token: PropTypes.string
};

const mapStateToProps = ({ verify }) => ({ verify });

export default connect(mapStateToProps, { verifyAction })(VerifyPage);
