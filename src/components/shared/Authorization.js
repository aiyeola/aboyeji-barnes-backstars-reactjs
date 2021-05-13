/* eslint-disable default-case*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import checkUser from '../../redux/actions/authorizationAction';
import Navbar from './Navbar';
import Spinner from './Spinner';

class WithAuthorization extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    const { checkUser } = this.props;
    checkUser();
  }

  shouldComponentUpdate(nextProps) {
    const { authorize } = nextProps;
    const { user } = this.state;
    return authorize.user !== user ? true : false;
  }
  // check this later
  // you update state then counter update in shouldComponentUpdate
  componentDidUpdate() {
    const {
      authorize: { user, error },
    } = this.props;
    if (user) {
      this.changeState(user);
    }
    if (error) {
      this.handleError(error);
    }
  }

  changeState = (user) => {
    this.setState({
      user,
    });
  };

  handleError = (error) => {
    const { history } = this.props;
    toast.error(error.message);
    switch (error.status) {
      case 401:
        localStorage.removeItem('barnesToken');
        history.push('/log-in');
        break;
      case 500:
        history.push('/500');
        break;
    }
  };

  render() {
    const {
      user: { userRoles, id },
    } = this.state;
    const {
      authorize: { user },
      allowedRoles,
      WrappedComponent,
    } = this.props;

    const navbar = localStorage.getItem('barnesToken') ? (
      <Navbar role={userRoles} id={id} />
    ) : undefined;

    if (!userRoles) {
      return (
        <div>
          {navbar}
          <Spinner />
        </div>
      );
    }
    if (allowedRoles.includes(userRoles)) {
      return (
        <>
          {navbar}
          <WrappedComponent user={user} {...this.props} />
        </>
      );
    } else if (userRoles === 'Accommodation Supplier') {
      return (
        <>
          {navbar}
          <Redirect href="/accommodations" />
        </>
      );
    } else {
      return (
        <>
          {navbar}
          <Redirect href="/dashboard" />
        </>
      );
    }
  }
}

WithAuthorization.propTypes = {
  checkUser: PropTypes.func.isRequired,
  authorize: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

const Authorization = (allowedRoles) => (WrappedComponent) => {
  const mapStateToProps = ({ authorize }) => ({
    authorize,
    allowedRoles,
    WrappedComponent,
  });
  return connect(mapStateToProps, { checkUser })(WithAuthorization);
};

export default Authorization;
