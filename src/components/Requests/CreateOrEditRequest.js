import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import Button from '../shared/Button';
import OneWayRequest from './OneWayRequest';
import { getProfile } from '../../redux/actions/profileActions';
import { getLocation } from '../../redux/actions/requestAction';

class CreateOrEditRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oneWayTrip: false,
      returnTrip: false,
      multiCityTrip: false,
      id: '',
      request: '',
      updating: false,
      autofillInfo: '',
      autofill: ''
    };

    this.switchTripType = this.switchTripType.bind(this);
  }

  switchTripType(e) {
    const tripTypes = ['oneWayTrip', 'returnTrip', 'multiCityTrip'];
    const index = tripTypes.indexOf(e.target.id);
    tripTypes.splice(index, 1);
    this.setState({
      [e.target.id]: true,
      [tripTypes[0]]: false,
      [tripTypes[1]]: false
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { history } = this.props;
    if (nextProps.profile.error === 'Server error') {
      history.push('/500');
    }
    if (nextProps.profile.error === 'Invalid or expired token used') {
      history.push('/login');
      nextProps.profile.error = 'You need to log in again';
    }
    switch (nextProps.profile.status) {
      case 'fetch_success': {
        const {
          passportName,
          passportNumber,
          gender,
          requestAutofill
        } = nextProps.profile.data;
        const emptyValues = [null, undefined, '', 'null'];
        let autofillInfo;
        if (!emptyValues.includes(passportName))
          autofillInfo = { ...autofillInfo, passportName };
        if (!emptyValues.includes(passportNumber))
          autofillInfo = { ...autofillInfo, passportNumber };
        if (!emptyValues.includes(gender))
          autofillInfo = { ...autofillInfo, gender };
        this.setState({ autofillInfo, autofill: requestAutofill });
        break;
      }
      case 'fetch_error':
        toast.error(nextProps.profile.error);
        break;
      default:
        break;
    }
  }

  componentDidMount() {
    const { getProfile, profile } = this.props;
    getProfile();
    console.log('profile: ', profile);
  }

  render() {
    const { updating, toggleUpdating, history } = this.props;
    const {
      oneWayTrip,
      returnTrip,
      multiCityTrip,
      request,
      id,
      autofillInfo,
      autofill
    } = this.state;
    console.log('this.state: ', this.state);
    return (
      <>
        <div className={`col-10 ${updating ? '' : 'offset-3'} p-1 m-bottom-1`}>
          {!updating && (
            <div className="center">
              <Button
                buttonId="oneWayTrip"
                buttonType="button"
                text="One Way Trip"
                classes={`btn ${oneWayTrip ? 'btn-primary' : 'btn-secondary'}`}
                onClick={this.switchTripType}
              />
              <Button
                buttonId="returnTrip"
                buttonType="button"
                text="Return Trip"
                classes={`btn ${returnTrip ? 'btn-primary' : 'btn-secondary'}`}
                onClick={this.switchTripType}
              />
              <Button
                buttonId="multiCityTrip"
                buttonType="button"
                text="Multi City Trip"
                classes={`btn ${
                  multiCityTrip ? 'btn-primary' : 'btn-secondary'
                }`}
                onClick={this.switchTripType}
              />
            </div>
          )}
        </div>
        <br />
        {oneWayTrip && (
          <OneWayRequest
            currentRequest={request}
            id={id}
            updating={updating}
            toggleUpdating={toggleUpdating}
            history={history}
            autofillInfo={autofillInfo}
            autofill={autofill}
          />
        )}
      </>
    );
  }
}

CreateOrEditRequest.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfile: PropTypes.func.isRequired
};

const mapStateToProps = ({ profile, request }) => ({ profile, request });

export default connect(mapStateToProps, { getProfile })(CreateOrEditRequest);
