import React from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { Row, Col, Container } from 'react-bootstrap';
import Button from '@components/shared/Button';
import Input from '@components/shared/Input';
import Select from '@components/shared/Select';

const Profile = ({
  updating,
  uploading,
  image,
  uploadPicture,
  handleChange,
  handleSubmit,
  toggleUpdating,
  errors,
  firstName,
  lastName,
  birthDate,
  gender,
  location,
  language,
  phoneNumber,
  currency,
  passportName,
  passportNumber,
  department,
  submitting,
}) => {
  const disabled = updating ? '' : 'disabled';
  const update = (
    <>
      <i className="fa fa-pencil m-right-1" />
      Update
    </>
  );
  const buttonText = updating ? 'Cancel' : update;
  return (
    <Container>
      <Row>
        <Col className="col-4 pt-5 picture-form center">
          <img
            src={image}
            className="profile-picture my-3"
            alt="Profile"
            height="250"
            width="250"
          />
          <form>
            <label
              id="file-chooser"
              className={
                uploading
                  ? 'btn btn-disabled large file-chooser mb-3'
                  : 'btn large btn-primary file-chooser mb-3'
              }
              htmlFor="file"
            >
              {uploading ? 'Uploading' : 'Upload'}{' '}
              {uploading ? <FontAwesomeIcon icon={faSpinner} spin /> : ''}
              <input
                type="file"
                name="image"
                id="file"
                accept="image/*"
                onChange={uploadPicture}
                hidden="hidden"
              />
            </label>
          </form>
        </Col>
        <Col lg={8}>
          <form
            id="update-profile-form"
            onSubmit={handleSubmit}
            className="profile-form mt-3"
          >
            <Row>
              <Col sm={12} md={6}>
                <Input
                  name="firstName"
                  classes="input-old"
                  placeholder="First Name"
                  value={firstName}
                  onChange={handleChange}
                  error={errors.firstName}
                  disabled={disabled}
                />
              </Col>
              <Col>
                <Input
                  name="lastName"
                  classes="input-old"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={handleChange}
                  error={errors.lastName}
                  disabled={disabled}
                />
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={6}>
                <Input
                  name="birthDate"
                  classes="input-old"
                  inputType="date"
                  placeholder="Birth Date"
                  value={birthDate}
                  onChange={handleChange}
                  error={errors.birthDate}
                  disabled={disabled}
                />
              </Col>
              <Col>
                <Select
                  name="gender"
                  classes="input-old"
                  placeholder="Gender"
                  value={gender}
                  options={['', 'MALE', 'FEMALE', 'OTHER']}
                  onChange={handleChange}
                  error={errors.gender}
                  disabled={disabled}
                />
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={6}>
                <Input
                  name="location"
                  classes="input-old"
                  placeholder="Location"
                  value={location}
                  onChange={handleChange}
                  error={errors.location}
                  disabled={disabled}
                />
              </Col>
              <Col>
                <Input
                  name="language"
                  classes="input-old"
                  placeholder="Language"
                  value={language}
                  onChange={handleChange}
                  error={errors.language}
                  disabled={disabled}
                />
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={6}>
                <Input
                  name="phoneNumber"
                  classes="input-old"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={handleChange}
                  error={errors.phoneNumber}
                  disabled={disabled}
                />
              </Col>
              <Col>
                <Input
                  name="currency"
                  classes="input-old"
                  value={currency}
                  placeholder="Currency"
                  onChange={handleChange}
                  error={errors.currency}
                  disabled={disabled}
                />
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={6}>
                <Input
                  name="passportName"
                  classes="input-old"
                  placeholder="Passport Name"
                  value={passportName}
                  onChange={handleChange}
                  error={errors.passportName}
                  disabled={disabled}
                />
              </Col>
              <Col>
                <Input
                  name="passportNumber"
                  classes="input-old"
                  placeholder="Passport Number"
                  value={passportNumber}
                  onChange={handleChange}
                  error={errors.passportNumber}
                  disabled={disabled}
                />
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={6}>
                <Select
                  name="department"
                  classes="input-old"
                  placeholder="Department"
                  value={department}
                  options={['', 'TDD', 'Marketing', 'Operations', 'Finance']}
                  onChange={handleChange}
                  error={errors.department}
                  disabled={disabled}
                />
              </Col>
            </Row>
            <div className="center m-top-1">
              <Button
                buttonId="edit-profile"
                classes="btn btn-secondary my-3 mr-4"
                text={buttonText}
                onClick={toggleUpdating}
              />
              {updating && (
                <Button
                  buttonId="submit-profile"
                  classes="btn btn-primary"
                  text="Save"
                  buttonType="submit"
                  submitting={submitting}
                />
              )}
            </div>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

Profile.propTypes = {
  updating: PropTypes.bool.isRequired,
  uploading: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  image: PropTypes.object.isRequired,
  uploadPicture: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  toggleUpdating: PropTypes.func.isRequired,
  errors: PropTypes.objectOf({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    birthDate: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    passportName: PropTypes.string.isRequired,
    passportNumber: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
  }).isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  birthDate: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  passportName: PropTypes.string.isRequired,
  passportNumber: PropTypes.string.isRequired,
  department: PropTypes.string.isRequired,
};

export default Profile;
