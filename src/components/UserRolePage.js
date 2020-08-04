import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import SettingsCard from './shared/SettingsCard';
import validator from '../helpers/validator';
import Input from './shared/Input';
import Select from './shared/Select';
import Button from './shared/Button';
import { assignUser } from '../redux/actions/superAdminAction';
import addSupplier from '../redux/actions/addSupplierAction';

class UserRolePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      errors: {},
      role: '',
      submittingSupplier: false,
      supplier: {
        errors: { firstName: '', lastName: '', userEmail: '' },
        firstName: '',
        lastName: '',
        userEmail: ''
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSupplierChange = this.handleSupplierChange.bind(this);
    this.handleAddSupplier = this.handleAddSupplier.bind(this);
  }

  static getDerivedStateFromProps(nextProps) {
    const { supplier, history } = nextProps;
    if (supplier) {
      const { data, error } = supplier;
      if (data) {
        toast.success('Supplier added successfully');
        this.setState((prev) => ({ ...prev, submittingSupplier: false }));
      }

      if (error) {
        const { status } = error;
        // eslint-disable-next-line
        switch (status) {
          case 401:
            toast.error('Current session is expired. Login');
            localStorage.removeItem('barnesToken');
            history.push('/log-in');
            break;
          case 403:
            toast.error('Access denied');
            history.push('/AccessForbidden');
            break;
          case 500:
            toast.error('Server Error');
            history.push('/500');
            break;
          case 409:
            this.setState((prev) => ({ ...prev, submittingSupplier: false }));
            toast.error('User already exist');
        }
      }
    }
    return null;
  }

  async handleChange(event) {
    event.persist();
    this.setState((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
    const { error } = await validator(event.target.name, event.target.value);
    const { errors } = this.state;
    this.setState({
      errors: { ...errors, [event.target.name]: error }
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { assignUser } = this.props;
    const { email, role, errors } = this.state;
    const roleInfo = {
      userEmail: email,
      userRole: role
    };
    if (email && role !== '' && Object.keys(errors).length !== 0) {
      assignUser(roleInfo);
    } else {
      toast.error('The data you are trying to send is not valid');
    }
  }

  async handleSupplierChange({ target }) {
    this.setState((prev) => ({
      ...prev,
      supplier: {
        ...prev.supplier,
        [target.name]: target.value
      }
    }));
    const { error } = await validator(target.name, target.value);
    this.setState((prev) => ({
      ...prev,
      supplier: {
        ...prev.supplier,
        errors: {
          ...prev.supplier.errors,
          [target.name]: error
        }
      }
    }));
  }

  handleAddSupplier(event) {
    event.preventDefault();
    const { addSupplier } = this.props;
    const { userEmail, firstName, lastName, errors } = this.state.supplier;
    const values = [userEmail, firstName, lastName];
    const keys = Object.keys({ userEmail, firstName, lastName });
    values.forEach(async (value, index) => {
      const key = keys[index];
      const { error } = await validator(key, value);
      this.setState((prev) => ({
        ...prev,
        supplier: {
          ...prev.supplier,
          errors: {
            ...prev.supplier.errors,
            [key]: error
          }
        }
      }));
    });
    const hasErrors = Object.values(errors).some((val) => val !== undefined);
    if (!hasErrors) {
      addSupplier({ userEmail, firstName, lastName });
      this.setState((prev) => ({ ...prev, submittingSupplier: true }));
    }
  }

  render() {
    const { email, errors, role, supplier, submittingSupplier } = this.state;
    return (
      <>
        <div className="bg-img" />
        <div className="black-container black-short" />
        <p className="accommodation-title pt-5 mb-3">Settings</p>
        <Container>
          <SettingsCard
            title="Roles Panel"
            classes=""
            handleSubmit={this.handleSubmit}
          >
            <Row>
              <Col lg={6}>
                <Input
                  name="email"
                  placeholder="Enter User Email"
                  inputType="email"
                  classes="input-old"
                  value={email}
                  error={errors.email}
                  onChange={this.handleChange}
                />
              </Col>
              <Col lg={6}>
                <Select
                  name="role"
                  options={[
                    '',
                    'Travel Team Member',
                    'Travel Administrator',
                    'Manager',
                    'Requester'
                  ]}
                  classes="input-old"
                  value={role}
                  error={errors.role}
                  onChange={this.handleChange}
                />
              </Col>
            </Row>
            <button className="btn btn-primary mt-2 mb-4" type="submit">
              Assign
            </button>
          </SettingsCard>
          <SettingsCard
            title="Add Supplier"
            classes="supplier-form"
            handleSubmit={this.handleAddSupplier}
          >
            <Input
              placeholder="Enter Supplier email"
              name="userEmail"
              inputType="email"
              classes="input-old"
              error={supplier.errors.userEmail}
              onChange={this.handleSupplierChange}
              value={supplier.userEmail}
              required={{ required: 'required' }}
            />
            <Input
              placeholder="First Name"
              name="firstName"
              inputType="text"
              classes="input-old"
              error={supplier.errors.firstName}
              onChange={this.handleSupplierChange}
              value={supplier.firstName}
              required={{ required: 'required' }}
            />
            <Input
              placeholder="Last Name"
              name="lastName"
              inputType="text"
              classes="input-old"
              error={supplier.errors.lastName}
              onChange={this.handleSupplierChange}
              value={supplier.lastName}
              required={{ required: 'required' }}
            />
            <Button
              buttonId="submit-btn"
              buttonType="submit"
              text="Submit"
              classes="btn btn-primary mt-2 mb-4"
              submitting={submittingSupplier}
            />
          </SettingsCard>
        </Container>
      </>
    );
  }
}

const mapStateToProps = ({ admin: { userRoles, error }, supplier }) => ({
  userRoles,
  error,
  supplier
});

export default connect(mapStateToProps, { assignUser, addSupplier })(
  UserRolePage
);
