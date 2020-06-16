import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SocialAuth from './shared/SocialAuth';
import Meta from './shared/Meta';
import Input from './shared/Input';
import Button from './shared/Button';
import { localAuth, socialAuth } from '../redux/actions/logInAction';

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      submitting: false,
      error: ''
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { error } = nextProps.logIn;
    if (error !== prevState.error) {
      return {
        submitting: false,
        error
      };
    }
    if (error === 'Invalid email or password entered') {
      return { email: '', password: '' };
    }
    return null;
  }

  componentDidMount() {
    this.setState((prevState) => ({ ...prevState }));
    this.checkLoggedIn();
    const { location: theLocation, socialAuth: auth } = this.props;
    if (theLocation !== undefined) {
      const base64encoded = theLocation.search.split('&')[0].split('?code=')[1];
      if (base64encoded) {
        const decoded = JSON.parse(atob(base64encoded));
        auth(decoded);
      }
    }
  }

  checkLoggedIn = () => {
    const token = localStorage.getItem('barnesToken');
    return token ? (window.location.href = '/') : null;
  };

  componentDidUpdate() {
    const {
      logIn: { isLoggedIn }
    } = this.props;
    if (isLoggedIn) {
      const token = localStorage.getItem('barnesToken');
      return token ? (window.location.href = '/') : null;
    }
  }

  handleInput({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { localAuth: auth } = this.props;
    const { email, password } = this.state;
    this.setState({
      submitting: true,
      error: ''
    });
    const user = {
      userEmail: email,
      userPassword: password
    };
    auth(user);
  }

  render() {
    const { email, password, submitting } = this.state;
    return (
      <>
        <Meta title="Log In" />
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
                name="email"
                inputType="email"
                placeholder="Email"
                onChange={this.handleInput}
                value={email}
                required={{ required: 'required' }}
              />
              <Input
                name="password"
                inputType="password"
                placeholder="Password"
                onChange={this.handleInput}
                value={password}
                required={{ required: 'required' }}
              />
              <div className="forgot">
                <Link to="/forgot-password" className="other-link">
                  Forgot your password?
                </Link>
              </div>
              <div className="m-bottom-1" />
              <Button
                buttonId="login"
                buttonType="submit"
                classes="btn btn-primary"
                text="LOG IN"
                submitting={submitting}
                onClick={this.handleSubmit}
              />
            </form>
            <div className="social">
              <SocialAuth />
            </div>
            <div className="m-bottom-2" />
            <div className="foot-message">
              Don&#39;t have a Barnes Backstars Account?
              <Link to="/sign-up" className="sign-up">
                <span>Sign Up Now!</span>
              </Link>
            </div>
            <div className="m-bottom-2" />
          </div>
        </div>
      </>
    );
  }
}

LoginPage.propTypes = {
  logIn: PropTypes.object.isRequired,
  localAuth: PropTypes.func.isRequired,
  socialAuth: PropTypes.func.isRequired,
  // eslint-disable-next-line react/require-default-props
  location: PropTypes.object
};

const mapStateToProps = ({ logIn }) => ({ logIn });

export default connect(mapStateToProps, { localAuth, socialAuth })(LoginPage);
