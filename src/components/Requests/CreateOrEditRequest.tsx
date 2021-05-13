import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Row, Col, Container } from 'react-bootstrap';

import Button from '@components/shared/Button';
import OneWayRequest from './OneWayRequest';
import ReturnRequest from './ReturnRequest';
import MultiCityRequest from './MultiCityRequest';
import { getProfile } from '@redux/actions/profileActions';
// import { getLocation } from '@redux/actions/requestAction';

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
      autofill: '',
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
      [tripTypes[1]]: false,
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { history } = this.props;
    if (nextProps.profile.error === 'Server error') {
      history.push('/500');
    }
    if (nextProps.profile.error === 'Invalid or expired token used') {
      history.push('/log-in');
      nextProps.profile.error = 'You need to log in again';
    }
    switch (nextProps.profile.status) {
      case 'fetch_success': {
        const {
          passportName,
          passportNumber,
          gender,
          requestAutofill,
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
    // getProfile();
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
      autofill,
    } = this.state;
    // console.log('this.state: ', this.state);
    return (
      <>
        <Row>
          <Col>
            {!updating && (
              <div className="req-btn">
                <Button
                  buttonId="oneWayTrip"
                  buttonType="button"
                  text="One Way Trip"
                  classes={`btn ${
                    oneWayTrip ? 'btn-primary' : 'btn-secondary'
                  }`}
                  onClick={this.switchTripType}
                />
                <Button
                  buttonId="returnTrip"
                  buttonType="button"
                  text="Return Trip"
                  classes={`btn ${
                    returnTrip ? 'btn-primary' : 'btn-secondary'
                  }`}
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
          </Col>
        </Row>
        <Container>
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
          {returnTrip && (
            <ReturnRequest
              currentRequest={request}
              id={id}
              updating={updating}
              toggleUpdating={toggleUpdating}
              history={history}
              autofillInfo={autofillInfo}
              autofill={autofill}
            />
          )}
          {multiCityTrip && (
            <MultiCityRequest
              currentRequest={request}
              id={id}
              updating={updating}
              toggleUpdating={toggleUpdating}
              history={history}
              autofillInfo={autofillInfo}
              autofill={autofill}
            />
          )}
        </Container>
      </>
    );
  }
}

CreateOrEditRequest.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfile: PropTypes.func.isRequired,
};

const mapStateToProps = ({ profile, request }) => ({ profile, request });

export default connect(mapStateToProps, { getProfile })(CreateOrEditRequest);
