import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { toast } from 'react-toastify';
import { Container, Row, Col } from 'react-bootstrap';
import Input from '../shared/Input';
import Select from '../shared/Select';
import Button from '../shared/Button';
import TextArea from '../shared/TextArea';
import locationsHelper from '../../helpers/locationsHelper';
import { validateRequest } from '../../helpers/validator';
import {
  getLocations,
  requestTrip,
  updateRequest
} from '../../redux/actions/requestAction';

export class ReturnRequest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      from: '',
      location: '',
      travelDate: moment(new Date()).format('YYYY-MM-DD'),
      returnDate: moment(new Date()).format('YYYY-MM-DD'),
      accommodation: '',
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
      autofill: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.toggleAutofill = this.toggleAutofill.bind(this);
    this.stopUpdating = this.stopUpdating.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  componentDidMount() {
    const {
      getLocations: fetchLocations,
      id,
      currentRequest,
      updating,
      autofillInfo,
      autofill
    } = this.props;
    fetchLocations();
    if (updating) {
      this.setState({
        ...currentRequest,
        id,
        updating,
        markup: currentRequest.reason
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
              Accommodations
            })
          )
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

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
      error: '',
      markup: ''
    });
  }

  async handleSubmit() {
    const {
      requestTrip: newTrip,
      updateRequest: updateTrip,
      autofill
    } = this.props;
    const payload = this.state;
    console.log('payload: ', payload);

    const { location, accommodation, travelDate } = payload;
    payload.trips = [
      { location: parseInt(location, 10), accommodation, travelDate }
    ];
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
            gender: payload.gender
          }
        });
        this.setState({ submitting: true });
      } else {
        newTrip({
          type: 'one-way',
          toggleAutofill,
          data: {
            from: payload.from,
            reason: payload.reason,
            to: payload.trips,
            passportName: payload.passportName,
            passportNumber: payload.passportNumber,
            gender: payload.gender
          }
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
      travelDate,
      returnDate,
      location,
      updating,
      accommodation,
      reason,
      markup,
      autofill,
      autofillInfo,
      passportName,
      passportNumber,
      gender,
      error,
      submitting
    } = this.state;
    console.log('this.state: ', this.state);
    const {
      locationIds,
      locationNames,
      locationAccommodations,
      selectedAccommodation
    } = locationsHelper(possibleLocations, location);
    return (
      <Container className="all-container mt-5">
        <Row>
          <Col lg={6}>
            <Select
              name="from"
              classes="input-old"
              options={locationNames}
              value={from}
              onChange={this.handleChange}
              error=""
            />
          </Col>
          <Col lg={6}>
            <Input
              name="travelDate"
              inputType="date"
              value={travelDate}
              classes="input-old"
              onChange={this.handleChange}
              error=""
            />
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <Input
              name="returnDate"
              inputType="date"
              value={returnDate}
              classes="input-old"
              onChange={this.handleChange}
              error=""
            />
          </Col>
          <Col lg={6}>
            <Select
              name="location"
              classes="input-old"
              ids={locationIds}
              options={locationNames}
              value={
                updating && possibleLocations
                  ? possibleLocations.find((lct) => lct.id === location).name
                  : location
              }
              onChange={this.handleChange}
              error=""
            />
          </Col>
        </Row>
        <Row>
          <Col className="mb-2">
            <Select
              name="accommodation"
              classes="input-old"
              options={locationAccommodations}
              value={accommodation}
              onChange={this.handleChange}
              error=""
            />
          </Col>
        </Row>
        {/* <Show accommodations pictures> */}
        {location &&
          possibleLocations && [
            '',
            ...selectedAccommodation.Accommodations.map(
              ({ name, imageUrl }, index) => (
                <>
                  {index === 0 && (
                    <h3 className="col-12 center">Accommodations</h3>
                  )}
                  <div
                    id={`accommodation-image-${index + 1}`}
                    key={`${index + 1}`}
                    className={`col-3 p-top-1 p-bottom-1 m-bottom-1 center accommodation-image ${
                      name === accommodation && 'accommodation-selected'
                    }`}
                    onClick={() => {
                      this.handleChange({
                        target: { name: 'accommodation', value: name }
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
              )
            )
          ]}
        {/* </Show accommodations pictures> */}
        <Row>
          <Col>
            <TextArea
              value={reason}
              markup={markup}
              name="reason"
              onChange={this.handleChange}
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
                  <Link className="link-blue" to="/profile">
                    profile
                  </Link>
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
              classes="input-old"
              placeholder="Passport Name"
              value={passportName}
              onChange={this.handleChange}
              error=""
              disabled={
                autofill && autofillInfo && autofillInfo.passportName && true
              }
            />
          </Col>
          <Col lg={6}>
            <Input
              name="passportNumber"
              classes="input-old"
              placeholder="Passport Number"
              value={passportNumber}
              onChange={this.handleChange}
              error=""
              disabled={
                autofill && autofillInfo && autofillInfo.passportNumber && true
              }
            />
          </Col>
        </Row>
        <Row>
          <Col className="mb-2">
            <Select
              name="gender"
              classes="input-old"
              options={['', 'MALE', 'FEMALE', 'OTHER']}
              value={gender}
              onChange={this.handleChange}
              error=""
              disabled={autofill && autofillInfo && autofillInfo.gender && true}
            />
          </Col>
        </Row>
        <div className="col-8 center">
          {error && <div className="error-multi-city">{error}</div>}
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
            buttonId="submit-request"
            buttonType="button"
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

ReturnRequest.propType = {
  request: PropTypes.object.isRequired,
  getLocations: PropTypes.func.isRequired,
  requestTrip: PropTypes.func.isRequired,
  updateRequest: PropTypes.func.isRequired
};

const mapStateToProps = ({ request }) => ({ request });

export default connect(mapStateToProps, {
  getLocations,
  requestTrip,
  updateRequest
})(ReturnRequest);
