import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, Container } from 'react-bootstrap';
import { createAccommodation } from '../../redux/actions/accommodationsAction';
import Button from '../shared/Button';
import Input from '../shared/Input';
import Select from '../shared/Select';
// import Map from './MapComponent';
import TextArea from '../shared/TextArea';

class CreateAccommodation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      accName: '',
      amenity: '',
      amenities: [],
      service: '',
      services: [],
      selectedImages: null,
      description: '',
      requiredError: '',
      location: '',
      mapLocations: {
        lat: null,
        lng: null,
      },
      error: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleNew = this.handleNew.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleAddedChange = this.handleAddedChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.readImages = this.readImages.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getMapLocation = this.getMapLocation.bind(this);
  }

  getMapLocation(mapLocations) {
    this.setState({
      mapLocations,
    });
  }
  readImages(e) {
    this.setState({
      selectedImages: e.target.files,
    });
  }

  handleRemove(value, index) {
    const { amenities, services } = this.state;
    if (value === 'service') {
      this.setState({
        services: services.filter((s, idx) => index !== idx),
      });
    } else {
      this.setState({
        amenities: amenities.filter((a, idx) => index !== idx),
      });
    }
  }

  handleAddedChange(index, e) {
    const { amenities, services } = this.state;
    if (e.target.name === 'service') {
      services[index] = e.target.value;
    } else {
      amenities[index] = e.target.value;
    }
  }

  handleAdd(e, value) {
    const { amenities, services } = this.state;
    if (value === 'service') {
      this.setState({
        services: services.concat(['']),
      });
    } else {
      this.setState({
        amenities: amenities.concat(['']),
      });
    }
  }

  handleNew(title, index) {
    const property = title.toLowerCase();
    return (
      <div key={index}>
        <Input
          name={property}
          classes="input-old"
          inputType="text"
          placeholder={title}
          onChange={(e) => this.handleAddedChange(index, e)}
        />
        <br />
        <Button
          buttonId="remove-trip"
          buttonType="button"
          classes="btn btn-danger"
          text="✖"
          onClick={() => this.handleRemove(property, index)}
        />
      </div>
    );
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
    if (e.target.name === 'description') {
      if (e.target.value.length < 150) {
        this.setState({
          error: 'The description has to be at least 150 characters',
        });
      } else {
        this.setState({
          error: '',
        });
      }
    }
  }

  handleSubmit() {
    const {
      selectedImages,
      accName,
      amenities,
      amenity,
      services,
      service,
      description,
      location,
      mapLocations,
      error,
    } = this.state;
    const { submit } = this.props;
    const ml = Object.values(mapLocations);
    if (
      !amenities ||
      !services ||
      !accName ||
      !amenity ||
      !service ||
      !description ||
      error ||
      !location ||
      !selectedImages ||
      ml.includes(null)
    ) {
      this.setState({
        requiredError: 'ALL * fields must be valid and are required',
      });
    } else {
      const { createAccommodation } = this.props;
      submit();
      const selected = Array.from(selectedImages);
      amenities.push(amenity);
      services.push(service);
      const payload = new FormData();
      for (let counter = 0; counter < selected.length; counter += 1) {
        payload.append('image', selected[counter]);
      }
      for (let counter = 0; counter < amenities.length; counter += 1) {
        payload.append('amenities', amenities[counter]);
      }
      for (let counter = 0; counter < services.length; counter += 1) {
        payload.append('services', services[counter]);
      }
      payload.append('name', accName);
      payload.append('locationId', location);
      payload.append('description', description);
      payload.append('lat', mapLocations.lat);
      payload.append('lng', mapLocations.lng);
      createAccommodation(payload);
      this.setState({
        services: [],
        amenities: [],
      });
    }
  }

  // map
  // form error
  render() {
    console.log(this.state);
    const {
      accName,
      amenity,
      amenities,
      service,
      services,
      images,
      location,
      description,
      requiredError,
    } = this.state;
    let { mapLocations } = this.state;
    const { submitting, locations } = this.props;
    const possibleLocations = locations.map(
      ({ id, city, country, Accommodations }) => ({
        id,
        name: `${city}, ${country}`,
        Accommodations,
      }),
    );
    // const locationIds = possibleLocations.map(({ id }) => id);
    const names = possibleLocations.map(({ name }) => name);
    const values = Object.values(mapLocations);
    if (!values[0]) {
      mapLocations = { lat: -1.9705786, lng: 30.10442880000005 };
    }
    return (
      <Container className="all-container mt-5">
        <Row>
          <Col lg={6}>
            <Input
              name="accName"
              classes="input-old"
              inputType="text"
              placeholder="Name *"
              value={accName}
              onChange={this.handleChange}
              required={{ required: 'required' }}
            />
          </Col>
          <Col lg={6}>
            <Select
              name="location"
              classes="input-old"
              value={location}
              options={['', ...names]}
              onChange={this.handleChange}
            />
          </Col>
        </Row>
        <Row>
          <Col>Pick hotel location on the map *</Col>
        </Row>
        <Row>
          <Col>
            {/* <Map
            google={this.props.google}
            center={mapLocations}
            height="200px"
            zoom={15}
            display="display"
            getMapLocation={this.getMapLocation}
          />  */}
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <Input
              name="amenity"
              classes="input-old"
              inputType="text"
              placeholder="Amenities *"
              value={amenity}
              onChange={this.handleChange}
              required={{ required: 'required' }}
            />
            {amenities.map((value, index) => this.handleNew('Amenity', index))}
            <div className="col-12">
              <Button
                buttonId="add-amenity"
                buttonType="button"
                classes="btn btn-primary my-2"
                text="✚ Add Amenity"
                onClick={(e) => this.handleAdd(e, 'amenity')}
              />
            </div>
          </Col>
          <Col lg={6}>
            <Input
              name="service"
              classes="input-old"
              inputType="text"
              placeholder="Services *"
              value={service}
              onChange={this.handleChange}
              required={{ required: 'required' }}
            />
            {services.map((value, index) => this.handleNew('Service', index))}
            <div className="col-12">
              <Button
                buttonId="add-service"
                buttonType="button"
                classes="btn btn-primary my-2"
                text="✚ Add Service"
                onClick={(e) => this.handleAdd(e, 'service')}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="text-area mb-3">
            <TextArea
              name="description"
              value={description}
              onChange={(e) => this.handleChange(e)}
              error=""
              required
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <h3 className="text-center text-danger">{requiredError || ''}</h3>
          </Col>
        </Row>
        <Row>
          <Col className="acc-image-upload mb-4">
            Add Images * : <br />
            <input
              type="file"
              name="images"
              value={images}
              onChange={(e) => this.readImages(e)}
              accept="image/*"
              multiple
              required
            />
          </Col>
        </Row>
        <Row>
          <Col className="text-center ">
            <Button
              buttonId="submit-request"
              buttonType="submit"
              classes="btn btn-primary"
              text="Create Accommodation"
              submitting={submitting}
              onClick={this.handleSubmit}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

CreateAccommodation.propTypes = {
  submitting: PropTypes.bool.isRequired,
  submit: PropTypes.func.isRequired,
  locations: PropTypes.array.isRequired,
  createAccommodation: PropTypes.func.isRequired,
};

export default connect(null, { createAccommodation })(CreateAccommodation);
