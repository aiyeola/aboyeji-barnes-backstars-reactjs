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

  handleChange = async ({ target }) => {
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
  };

  handleSubmit = (event) => {
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
  };

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
      <div>
        <Meta title="Sign Up" />
        <div>
          <form onSubmit={this.handleSubmit}>
            <Input
              name="firstName"
              inputType="text"
              classes="input"
              placeholder="First Name"
              onChange={this.handleChange}
              value={firstName}
              required={{ required: 'required' }}
              error={errors.firstName}
            />
            <Input
              name="lastName"
              inputType="text"
              classes="input"
              placeholder="Last Name"
              onChange={this.handleChange}
              value={lastName}
              required={{ required: 'required' }}
              error={errors.lastName}
            />
            <Input
              name="userEmail"
              inputType="email"
              classes="input"
              placeholder="Email"
              onChange={this.handleChange}
              value={userEmail}
              required={{ required: 'required' }}
              error={errors.userEmail}
            />
            <Input
              name="userPassword"
              inputType="password"
              classes="input"
              placeholder="Password"
              onChange={this.handleChange}
              value={userPassword}
              required={{ required: 'required' }}
              error={errors.userPassword}
            />
            <Input
              name="confirm"
              inputType="password"
              classes="password"
              placeholder="Confirm Password"
              onChange={this.handleChange}
              value={confirm}
              required={{ required: 'required' }}
              error={errors.confirm}
            />
            <button type="submit" className="signup-btn">
              Sign Up
            </button>
          </form>
        </div>

        <div>
          <SocialAuth />
          <div className="foot-message">
            Already have a Barnes Backstars Account
            <Link to="/log-in">
              <span className="other-link">Log In</span>
            </Link>
          </div>
        </div>
      </div>
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
