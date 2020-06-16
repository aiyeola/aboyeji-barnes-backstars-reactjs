import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import Input from './shared/Input';
import Meta from './shared/Meta';
import validator from '../helpers/validator';
import signUpAction from '../redux/actions/signUpAction';
import SocialAuth from './shared/SocialAuth';

class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {
        firstName: undefined,
        lastName: undefined,
        userEmail: undefined,
        userPassword: undefined,
        confirm: undefined
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static getDerivedStateFromProps(nextProps) {
    const {
      signUp: { data, error },
      history
    } = nextProps;
    if (data !== null) {
      history.push('/call-4-verify');
    } else if (error !== null) {
      toast.error(error.message);

      const button = document.querySelector('button');
      button.innerHTML = 'Sign Up';
    }
    return null;
  }

  componentDidMount() {
    this.checkLoggedIn();
  }

  checkLoggedIn = () => {
    const token = localStorage.getItem('barnesToken');
    return token ? (window.location.href = '/') : null;
  };

  async handleChange({ target }) {
    this.setState((prev) => ({ ...prev, [target.name]: target.value }));
    let { error } = await validator(target.name, target.value);
    if (target.name === 'confirm') {
      const { userPassword, confirm } = this.state;
      if (userPassword !== confirm) {
        error = 'Passwords do not match';
      }
    }
    this.setState((prev) => ({
      ...prev,
      errors: { ...prev.errors, [target.name]: error }
    }));
  }

  handleSubmit(event) {
    event.preventDefault();
    const { errors } = this.state;
    const hasErrors = Object.values(errors).some((val) => val !== undefined);
    if (!hasErrors) {
      const { SignUp } = this.props;
      const userCredentials = this.state;
      SignUp(userCredentials);

      const button = document.querySelector('button');
      button.innerHTML = 'Wait ...';
    }
  }

  render() {
    const {
      firstName,
      lastName,
      userEmail,
      userPassword,
      confirm,
      errors
    } = this.state;
    return (
      <>
        <Meta title="Sign Up" />
        <div className="login-container">
          <div className="local bg">
            <img
              className="barnes-backstars-logo"
              src="https://res.cloudinary.com/aboyeji-barnes-backstars/image/upload/v1588818157/aboyeji-barnes-backstars/Barnes_2_cpqaef.jpg"
              alt="Barnes-Backstars Logo"
            />
            <div className="m-bottom-1" />
            <form className="login-form" onSubmit={this.handleSubmit}>
              <Input
                name="firstName"
                inputType="text"
                placeholder="First Name"
                onChange={this.handleChange}
                value={firstName}
                required={{ required: 'required' }}
                error={errors.firstName}
              />
              <div className="m-bottom-1" />
              <Input
                name="lastName"
                inputType="text"
                placeholder="Last Name"
                onChange={this.handleChange}
                value={lastName}
                required={{ required: 'required' }}
                error={errors.lastName}
              />
              <div className="m-bottom-1" />
              <Input
                name="userEmail"
                inputType="email"
                placeholder="Email"
                onChange={this.handleChange}
                value={userEmail}
                required={{ required: 'required' }}
                error={errors.userEmail}
              />
              <div className="m-bottom-1" />
              <Input
                name="userPassword"
                inputType="password"
                placeholder="Password"
                onChange={this.handleChange}
                value={userPassword}
                required={{ required: 'required' }}
                error={errors.userPassword}
              />
              <div className="m-bottom-1" />
              <Input
                name="confirm"
                inputType="password"
                placeholder="Confirm Password"
                onChange={this.handleChange}
                value={confirm}
                required={{ required: 'required' }}
                error={errors.confirm}
              />
              <div className="m-bottom-1" />
              <button type="submit" className="btn btn-primary">
                Sign Up
              </button>
            </form>
            <div className="social">
              <SocialAuth />
            </div>
            <div className="m-bottom-2" />
            <div className="foot-message">
              Already have a Barnes Backstars Account?
              <Link to="/log-in">
                <span className="other-link">Log In</span>
              </Link>
            </div>
            <div className="m-bottom-2" />
          </div>
        </div>
      </>
    );
  }
}

SignUpPage.defaultProps = {
  history: PropTypes.object,
  push: PropTypes.func
};

SignUpPage.propTypes = {
  SignUp: PropTypes.func.isRequired,
  signUp: PropTypes.object.isRequired,
  history: PropTypes.object,
  push: PropTypes.func
};

const mapStateToProps = ({ signUp }) => ({ signUp });

const mapDispatchToProps = {
  SignUp: signUpAction
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
