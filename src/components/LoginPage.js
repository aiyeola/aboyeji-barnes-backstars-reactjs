import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SocialAuth from './shared/SocialAuth';
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
  }

  componentDidMount() {
    console.log(this.props);
  }

  handleInput = () => {};

  handleSubmit = () => {};

  render() {
    const { email, password, submitting } = this.state;
    return (
      <div className="login-container">
        <div className="bg">
          <img src="" alt="" />
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
              <Link to="/forgotPassword" className="other-link">
                Forgot your password?
              </Link>
            </div>
            <Button
              buttonId="login"
              buttonType="submit"
              classes=""
              text="LOGIN"
              submitting={submitting}
              onClick={this.handleSubmit}
            />
          </form>
          <div className="social">
            <SocialAuth />
            <div className="foot-message">
              Don&#39;t have a Barnes Backstars Account?
              <Link to="/signUp">
                <span>Sign Up Now!</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ logIn }) => ({ logIn });

export default connect(mapStateToProps, { localAuth, socialAuth })(LoginPage);
