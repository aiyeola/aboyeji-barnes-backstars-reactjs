import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import Input from './shared/Input';
import Meta from './shared/Meta';
import reverifyAction from '../redux/actions/reverifyAction';

class ReverifyPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userEmail: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const {
      reVerify: { data, error },
      history
    } = nextProps;
    if (data) {
      history.push('/call-4-verify');
    }
    if (error) {
      switch (error.status) {
        case 404:
          toast.error('Email not registered');
          break;
        case 501:
          toast.error('Connection Error');
          break;
        default:
          toast.error('Server Error, Try again later');
      }
      const button = document.querySelector('button');
      button.innerHTML = 'Send';
    }
    return null;
  }

  componentDidMount() {
    const { history } = this.props;
    const token = localStorage.getItem('barnesToken');
    return token ? history.push('/dashboard') : null;
  }

  handleChange({ target }) {
    this.setState((prev) => ({
      ...prev,
      [target.name]: target.value
    }));
  }

  handleSubmit(event) {
    event.preventDefault();
    const { reverifyAction } = this.props;
    const { userEmail } = this.state;
    reverifyAction(userEmail);

    const button = document.querySelector('button');
    button.innerHTML = 'Sending...';
  }

  render() {
    const { userEmail } = this.state;
    return (
      <>
        <Meta title="Reverify" />
        <div className="login-container">
          <div className="local bg">
            <img
              className="barnes-backstars-logo"
              src="https://res.cloudinary.com/aboyeji-barnes-backstars/image/upload/v1588818157/aboyeji-barnes-backstars/Barnes_2_cpqaef.jpg"
              alt="Barnes-Backstars Logo"
            />
            <form className="login-form" onSubmit={this.handleSubmit}>
              <p className="foot-message">
                Your verification link has expired enter your email to get a new
                one
              </p>
              <div className="m-bottom-2" />
              <Input
                name="userEmail"
                inputType="email"
                classes="input"
                placeholder="Email"
                onChange={this.handleChange}
                value={userEmail}
                required={{ required: 'required' }}
              />
              <button className="btn btn-primary" type="submit">
                Send
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }
}

ReverifyPage.propTypes = {
  reVerify: PropTypes.object.isRequired,
  reverifyAction: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = ({ reVerify }) => ({ reVerify });

export default connect(mapStateToProps, { reverifyAction })(ReverifyPage);
