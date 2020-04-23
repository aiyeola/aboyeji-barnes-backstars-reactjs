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
  }

  static getDerivedStateFromProps(nextProps) {
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

  handleChange = ({ target }) => {
    this.setState((prev) => ({
      ...prev,
      [target.name]: target.value
    }));
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { reverifyAction } = this.props;
    const { userEmail } = this.state;
    reverifyAction(userEmail);

    const button = document.querySelector('button');
    button.innerHTML = 'Sending...';
  };

  render() {
    const { userEmail } = this.state;
    return (
      <div className="reverify-page">
        <Meta title="Reverify" />
        <div className="form-cover">
          <img
            src=""
            alt="Barnes-Backstars logo"
            className="barnes-backstars-logo"
          />
          <form className="reverify-form m-top-10" onSubmit={this.handleSubmit}>
            <p>
              Your verification link has expired enter you email to get a new
              one
            </p>
            <Input
              name="userEmail"
              inputType="email"
              classes="input"
              placeholder="Email"
              onChange={this.handleChange}
              value={userEmail}
              required={{ required: 'required' }}
            />
            <button className="btn btn-primary reverify-btn" type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
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
