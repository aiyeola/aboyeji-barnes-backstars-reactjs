import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Col, Row, Container } from 'react-bootstrap';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SnackBar from '@material-ui/core/Snackbar';
class Accommodations extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
      requestsPerPage: 3,
      isCreating: false,
      submitting: false,
      accError: null,
      isAllowed: true,
    };

    this.submit = this.submit.bind(this);
    this.toggleCreating = this.toggleCreating.bind(this);
    this.handleAuth = this.handleAuth.bind(this);
    this.setAccommodation = this.setAccommodation.bind(this);
    this.paginate = this.paginate.bind(this);
  }

  setCurrentPage = (pageNumber) => {
    this.setState({
      currentPage: pageNumber,
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
      accError,
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
