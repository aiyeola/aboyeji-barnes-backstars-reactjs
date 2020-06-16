import React from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import Button from '../shared/Button';
import Input from '../shared/Input';
import Select from '../shared/Select';

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
  submitting
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
    <div className="grid p-top-5">
      <div className="col-4 picture-form center">
        <img
          src={image}
          className="profile-picture"
          alt="Profile"
          height="250"
          width="250"
        />
        <br />
        <br />
        <form>
          <label
            id="file-chooser"
            className={
              uploading
                ? 'btn btn-disabled large file-chooser'
                : 'btn large btn-primary file-chooser'
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
        <br />
      </div>
      <form
        id="update-profile-form"
        onSubmit={handleSubmit}
        className="profile-form col-8"
      >
        <div className="grid">
          <div className="col-6">
            <Input
              name="firstName"
              classes="input-old"
              placeholder="First Name"
              value={firstName}
              onChange={handleChange}
              error={errors.firstName}
              disabled={disabled}
            />
          </div>
          <div className="col-6">
            <Input
              name="lastName"
              classes="input-old"
              placeholder="Last Name"
              value={lastName}
              onChange={handleChange}
              error={errors.lastName}
              disabled={disabled}
            />
          </div>
          <div className="col-6">
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
          </div>
          <div className="col-6">
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
          </div>
          <div className="col-6">
            <Input
              name="location"
              classes="input-old"
              placeholder="Location"
              value={location}
              onChange={handleChange}
              error={errors.location}
              disabled={disabled}
            />
          </div>
          <div className="col-6">
            <Input
              name="language"
              classes="input-old"
              placeholder="Language"
              value={language}
              onChange={handleChange}
              error={errors.language}
              disabled={disabled}
            />
          </div>
          <div className="col-6">
            <Input
              name="phoneNumber"
              classes="input-old"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={handleChange}
              error={errors.phoneNumber}
              disabled={disabled}
            />
          </div>
          <div className="col-6">
            <Input
              name="currency"
              classes="input-old"
              value={currency}
              placeholder="Currency"
              onChange={handleChange}
              error={errors.currency}
              disabled={disabled}
            />
          </div>
          <div className="col-6">
            <Input
              name="passportName"
              classes="input-old"
              placeholder="Passport Name"
              value={passportName}
              onChange={handleChange}
              error={errors.passportName}
              disabled={disabled}
            />
          </div>
          <div className="col-6">
            <Input
              name="passportNumber"
              classes="input-old"
              placeholder="Passport Number"
              value={passportNumber}
              onChange={handleChange}
              error={errors.passportNumber}
              disabled={disabled}
            />
          </div>
          <div className="col-6">
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
          </div>
        </div>
        <div className="center m-top-1">
          <Button
            buttonId="edit-profile"
            classes="btn large btn-secondary"
            text={buttonText}
            onClick={toggleUpdating}
          />
          {updating && (
            <Button
              buttonId="submit-profile"
              classes="btn large btn-primary"
              text="Save"
              buttonType="submit"
              submitting={submitting}
            />
          )}
        </div>
      </form>
    </div>
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
    department: PropTypes.string.isRequired
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
  department: PropTypes.string.isRequired
};

export default Profile;
