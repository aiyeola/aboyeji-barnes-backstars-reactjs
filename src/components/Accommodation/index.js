import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Col, Row, Container } from 'react-bootstrap';
import Button from '../shared/Button';
import Pagination from '../shared/Pagination';
import AddAccommodation from './CreateAccommodation';
import SingleAccommodation from './Accommodation';
import { getAccommodations } from '../../redux/actions/accommodationsAction';
import { getLocations } from '../../redux/actions/requestAction';

import { accommodations } from '../../__mocks__/accommodations';
import { locations } from '../../__mocks__/locations';

class Accommodations extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
      requestsPerPage: 3,
      isCreating: false,
      submitting: false,
      accError: null,
      isAllowed: true
    };

    this.submit = this.submit.bind(this);
    this.toggleCreating = this.toggleCreating.bind(this);
    this.handleAuth = this.handleAuth.bind(this);
    this.setAccommodation = this.setAccommodation.bind(this);
    this.paginate = this.paginate.bind(this);
  }

  setCurrentPage = (pageNumber) => {
    this.setState({
      currentPage: pageNumber
    });
  };

  paginate(pageNumber) {
    return this.setCurrentPage(pageNumber);
  }

  setAccommodation(accommodation) {
    const { history } = this.props;
    if (accommodation.accommodation) {
      history.push(`/accommodation/${accommodation.accommodation.id}`);
    } else if (accommodation.error) {
      const { accError } = this.state;
      if (accommodation.error !== accError) {
        this.setState({ accError: accommodation.error });
        toast.error(accommodation.error);
        this.setState({ submitting: false });
      }
    }
  }

  handleAuth(user) {
    const { isAllowed } = this.state;
    const allowed = ['Accommodation Supplier', 'Travel Administrator'];
    if (isAllowed !== true) {
      if (allowed.includes(user.userRole)) {
        this.setState({
          isAllowed: true
        });
      }
    }
  }

  toggleCreating() {
    const { isCreating } = this.state;
    this.setState({ isCreating: !isCreating });
  }

  submit() {
    this.setState({ submitting: true });
  }

  // componentDidMount() {
  //   const { getAccommodations, user, getLocations } = this.props;
  //   const currentUser = {
  //     role: user.userRole,
  //     id: user.id
  //   };

  //   getAccommodations(currentUser);
  //   getLocations();
  // }

  componentDidUpdate() {
    const { addAccommodation, user } = this.props;
    if (user) {
      this.handleAuth(user);
    }

    if (addAccommodation) {
      this.setAccommodation(addAccommodation);
    }
  }

  render() {
    console.log(this.props);
    // const { accommodations, locations } = this.props;
    const {
      submitting,
      isAllowed,
      isCreating,
      currentPage,
      accError
    } = this.state;
    let { requestsPerPage } = this.state;
    let total = [];

    if (!requestsPerPage || requestsPerPage <= 0) {
      requestsPerPage = 1;
    }
    const indexOfLastRequest = currentPage * requestsPerPage;
    const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
    total = accommodations;

    const items = total.slice(indexOfFirstRequest, indexOfLastRequest);
    const totalRequests = total.length;

    const button = (
      <Button
        buttonId="create-start"
        buttonType="button"
        classes={`btn ${isCreating ? 'btn-danger' : 'btn-primary'}`}
        text={isCreating ? '✖ Close' : '✙ New Accommodation'}
        onClick={this.toggleCreating}
      />
    );
    return (
      <Container>
        <Row>
          <Col>{isAllowed && button}</Col>
        </Row>
        <Row>
          <Col>
            {isCreating && (
              <AddAccommodation
                submitting={submitting}
                submit={this.submit}
                locations={locations}
              />
            )}
          </Col>
        </Row>
        <Row>
          <Col className="text-center text-danger">{accError || ''}</Col>
        </Row>
        <div className="bg-img" />
        <Row className="mt-5">
          <Col as="h2" className="text-center">
            Accommodation
          </Col>
        </Row>
        <Row className="my-4 py-3">
          <Col>
            {items.map((accommodation) => (
              <SingleAccommodation
                key={accommodation.id}
                id={accommodation.id}
                name={accommodation.name}
                location={accommodation.location}
                imageUrl={accommodation.imageUrl}
                description={accommodation.description}
                likes={accommodation.likes.length}
                rooms={accommodation.rooms.length}
                rating={Math.round(accommodation.averageRating * 10) / 10}
              />
            ))}
          </Col>
        </Row>

        <div className="col-lg-12 text-center">
          <table>
            <tbody>
              <tr className="table-col">
                <td colSpan="3">
                  Showing <span className="special">{currentPage}</span> of{' '}
                  {Math.ceil(totalRequests / requestsPerPage)}
                </td>
                <td className="table-col">
                  <Pagination
                    requestsPerPage={requestsPerPage}
                    totalRequests={totalRequests}
                    paginate={this.paginate}
                    currentPage={currentPage}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Container>
    );
  }
}

Accommodations.propTypes = {
  // getAccommodations: PropTypes.func.isRequired
  // accommodations: PropTypes.object.isRequired,
  // user: PropTypes.object.isRequired
};

const mapStateToProps = ({ accommodations, request, addAccommodation }) => ({
  accommodations,
  locations: request.locations,
  addAccommodation
});

export default connect(mapStateToProps, { getAccommodations, getLocations })(
  Accommodations
);
