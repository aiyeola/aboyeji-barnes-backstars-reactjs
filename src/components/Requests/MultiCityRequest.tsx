import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { toast } from 'react-toastify';
import { Container, Row, Col } from 'react-bootstrap';

import Input from '@components/shared/Input';
import Select from '@components/shared/Select';
import Button from '@components/shared/Button';
import TextArea from '@components/shared/TextArea';
import locationsHelper from '@helpers/locationsHelper';
import { validateRequest } from '@helpers/validator';
import {
  getLocations,
  requestTrip,
  updateRequest,
} from '@redux/actions/requestAction';

export class MultiCityRequest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      from: '',
      trips: [
        {
          location: '',
          travelDate: moment(new Date()).format('YYYY-MM-DD'),
          accommodation: '',
        },
      ],
      returnDate: moment(new Date()).format('YYYY-MM-DD'),
      reason: '',
      passportName: '',
      passportNumber: '',
      gender: '',
      error: '',
      possibleLocations: '',
      updating: false,
      id: '',
      markup: '',
      submitting: false,
      autofillInfo: '',
      autofill: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.toggleAutofill = this.toggleAutofill.bind(this);
    this.stopUpdating = this.stopUpdating.bind(this);
    this.handleAddTrip = this.handleAddTrip.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleAddTrip() {
    const { trips } = this.state;
    this.setState({
      trips: trips.concat([
        {
          location: '',
          travelDate: moment(new Date()).format('YYYY-MM-DD'),
          accommodation: '',
        },
      ]),
    });
  }

  stopUpdating() {
    const { toggleUpdating } = this.props;
    toggleUpdating();
  }

  toggleAutofill() {
    const { autofill } = this.state;
    const { autofillInfo } = this.props;
    if (autofill) {
      this.setState({ gender: '', passportName: '', passportNumber: '' });
    } else {
      this.setState({ ...autofillInfo });
    }
    this.setState({ autofill: !autofill });
  }

  handleRemoveTrip = (index) => () => {
    const { trips } = this.state;
    this.setState({
      trips: trips.filter((s, idx) => index !== idx),
    });
  };

  componentDidMount() {
    const {
      getLocations: fetchLocations,
      id,
      currentRequest,
      updating,
      autofillInfo,
      autofill,
    } = this.props;
    fetchLocations();
    if (updating) {
      this.setState({
        ...currentRequest,
        id,
        updating,
        markup: currentRequest.reason,
      });
    }
    this.setState({ autofillInfo, autofill });
    if (autofill) this.setState({ ...autofillInfo });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { request, toggleUpdating, history } = nextProps;
    switch (request.status) {
      case 'fetch_locations_success':
        this.setState({
          possibleLocations: request.locations.map(
            ({ id, country, city, Accommodations }) => ({
              id,
              name: `${city}, ${country}`,
              Accommodations,
            }),
          ),
        });
        break;
      case 'request_success':
        toast.success(request.message);
        history.push(`/request/${request.id}`);
        break;
      case 'request_error':
        this.setState({ error: request.error, submitting: false });
        break;
      case 'update_request_success':
        toast.success(request.message);
        toggleUpdating();
        break;
      case 'update_request_error':
        toast.success(request.error);
        toggleUpdating();
        break;
      default:
        break;
    }
  }

  handleChange(index, e) {
    const { trips } = this.state;
    const newTrips = trips.map((trip, idx) => {
      if (index !== idx) return trip;
      let newTrip = {
        ...trip,
        [e.target.name]:
          e.target.name === 'location'
            ? parseInt(e.target.value, 10)
            : e.target.value,
      };
      if (e.target.name === 'location') {
        newTrip = { ...newTrip, accommodation: '' };
      }
      return newTrip;
    });
    let newState = { trips: newTrips };
    if (index === 'other') {
      newState = { ...newState, [e.target.name]: e.target.value };
    }
    this.setState({ ...newState, error: '', markup: '' });
  }

  async handleSubmit() {
    const payload = this.state;
    const {
      requestTrip: newTrip,
      updateRequest: updateTrip,
      autofill,
    } = this.props;
    const error = await validateRequest(payload);
    if (!error) {
      let toggleAutofill = false;
      if (autofill !== payload.autofill) toggleAutofill = true;
      if (payload.updating) {
        updateTrip({
          id: payload.id,
          data: {
            from: payload.from,
            reason: payload.reason,
            to: payload.trips,
            passportName: payload.passportName,
            passportNumber: payload.passportNumber,
            gender: payload.gender,
          },
        });
        this.setState({ submitting: true });
      } else {
        newTrip({
          type: 'multi-city',
          toggleAutofill,
          data: {
            from: payload.from,
            reason: payload.reason,
            to: payload.trips,
            returnDate: payload.returnDate,
            passportName: payload.passportName,
            passportNumber: payload.passportNumber,
            gender: payload.gender,
          },
        });
        this.setState({ submitting: true });
      }
    } else {
      this.setState({ error });
    }
  }

  render() {
    const {
      possibleLocations,
      from,
      returnDate,
      trips,
      updating,
      reason,
      markup,
      autofill,
      autofillInfo,
      passportName,
      passportNumber,
      gender,
      error,
      submitting,
    } = this.state;
    console.log('this.state: ', this.state);
    const { locationNames } = locationsHelper(possibleLocations, '');
    return (
      <Container className="all-container mt-5">
        <Row>
          <Col lg={6}>
            <Select
              name="from"
              classes="input-old"
              options={locationNames}
              selected={from}
              onChange={(e) => this.handleChange('other', e)}
              error=""
            />
          </Col>
          <Col lg={6}>
            <Input
              inputType="date"
              value={returnDate}
              classes="input-old"
              name="returnDate"
              onChange={(e) => this.handleChange('other', e)}
              error=""
            />
          </Col>
        </Row>
        {trips.map((trip, index) => {
          const {
            locationIds,
            selectedAccommodation,
            locationAccommodations,
          } = locationsHelper(possibleLocations, trip.location);
          return (
            <>
              <Row>
                <Col lg={6}>
                  <Select
                    name="location"
                    ids={locationIds}
                    options={locationNames}
                    classes="input-old"
                    value={
                      updating && possibleLocations
                        ? possibleLocations.find(
                            (lct) => lct.id === trip.location,
                          ).name
                        : trip.location
                    }
                    onChange={(e) => this.handleChange(index, e)}
                    error=""
                  />
                </Col>
                <Col lg={6}>
                  <Input
                    inputType="date"
                    value={trip.travelDate}
                    classes="input-old"
                    name="travelDate"
                    onChange={(e) => this.handleChange(index, e)}
                    error=""
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Select
                    name="accommodation"
                    options={locationAccommodations}
                    value={trip.accommodation}
                    classes="input-old"
                    onChange={(e) => this.handleChange(index, e)}
                    error=""
                  />
                </Col>
              </Row>
              <div>
                <Button
                  buttonType="button"
                  buttonId="remove-trip"
                  classes="btn btn-danger px-2 my-2"
                  text="✖"
                  onClick={this.handleRemoveTrip(index)}
                />
              </div>
              {/* <Show accommodations pictures> */}
              {trip.location &&
                possibleLocations && [
                  '',
                  ...selectedAccommodation.Accommodations.map(
                    ({ name, imageUrl }, idx) => (
                      <>
                        {idx === 0 && (
                          <h3 className="col-12 center">Accommodations</h3>
                        )}
                        <div
                          id={`accommodation-image-${(index + 1) * (idx + 1)}`}
                          className={`col-3 p-top-1 p-bottom-1 m-bottom-1 center accomodation-image ${
                            name === trip.accommodation &&
                            'accommodation-selected'
                          }`}
                          onClick={() => {
                            this.handleChange(index, {
                              target: { name: 'accommodation', value: name },
                            });
                          }}
                        >
                          <img
                            src={
                              imageUrl
                                ? imageUrl[0]
                                : 'https://res.cloudinary.com/drayzii/image/upload/v1573796111/no-image-found-360x260_xvpnuj.png'
                            }
                            height="200"
                            width="200"
                            alt="accommodation"
                          />
                          <br />
                          <h5 className="m-top-1">{name}</h5>
                        </div>
                      </>
                    ),
                  ),
                ]}
              {/* </Show accommodations pictures> */}
            </>
          );
        })}
        <Button
          buttonType="button"
          buttonId="add-trip"
          classes="btn btn-secondary mb-2"
          text="✚ Add Destination"
          onClick={this.handleAddTrip}
        />
        <Row>
          <Col>
            <TextArea
              value={reason}
              markup={markup}
              name="reason"
              onChange={(e) => this.handleChange('other', e)}
              error=""
            />
          </Col>
        </Row>
        <Row>
          <Col className="my-1">
            {autofillInfo ? (
              <>
                <input
                  type="checkbox"
                  id="toggle-checkbox"
                  checked={autofill}
                  onChange={this.toggleAutofill}
                />
                <span className="m-left-1 text-blue">
                  Autofill fields below from your profile
                </span>
              </>
            ) : (
              <>
                <input disabled type="checkbox" />
                <span className="text-blue">
                  Autofill fields below from your profile (Will be available
                  when you fill your
                  <a className="link-blue" href="/profile">
                    profile
                  </a>
                  )
                </span>
              </>
            )}
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <Input
              name="passportName"
              value={passportName}
              classes="input-old"
              placeholder="Passport Name"
              onChange={(e) => this.handleChange('other', e)}
              error=""
              disabled={
                autofill && autofillInfo && autofillInfo.passportName && true
              }
            />
          </Col>
          <Col lg={6}>
            <Input
              name="passportNumber"
              value={passportNumber}
              classes="input-old"
              placeholder="Passport Number"
              onChange={(e) => this.handleChange('other', e)}
              error=""
              disabled={
                autofill && autofillInfo && autofillInfo.passportNumber && true
              }
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Select
              name="gender"
              options={['', 'MALE', 'FEMALE', 'OTHER']}
              value={gender}
              classes="input-old"
              onChange={(e) => this.handleChange('other', e)}
              error=""
              disabled={autofill && autofillInfo && autofillInfo.gender && true}
            />
          </Col>
        </Row>
        <div className="col-8 center">
          {error ? <div className="error-multi-city">{error}</div> : ''}
        </div>
        <div className="col-12 center my-2">
          {updating && (
            <Button
              buttonType="button"
              buttonId="stop-updating"
              classes="btn btn-danger"
              text="Cancel"
              onClick={this.stopUpdating}
            />
          )}
          <Button
            buttonType="button"
            buttonId="submit-request"
            classes="btn btn-primary"
            text={updating ? 'Update' : 'Submit Request'}
            submitting={submitting}
            onClick={this.handleSubmit}
          />
        </div>
      </Container>
    );
  }
}

MultiCityRequest.propTypes = {
  request: PropTypes.object.isRequired,
  getLocations: PropTypes.func.isRequired,
  requestTrip: PropTypes.func.isRequired,
  updateRequest: PropTypes.func.isRequired,
};

const mapStateToProps = ({ request }) => ({ request });

export default connect(mapStateToProps, {
  getLocations,
  requestTrip,
  updateRequest,
})(MultiCityRequest);
