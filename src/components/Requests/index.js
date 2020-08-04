import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import TableComponent from './shared/TableComponent';
import RequestPanel from './HeaderPanel';
import Spinner from '../shared/Spinner';
import Button from '../shared/Button';
import CreateRequest from './CreateOrEditRequest';
import { searchMessage } from '../../helpers/search';
import {
  fetchRequests,
  getPending,
  getPast,
  searchRequests
} from '../../redux/actions/requestsAction';

class Requests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      requestsPerPage: 5,
      parameter: null,
      query: null,
      isCreating: false
    };

    this.handleRequests = this.handleRequests.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.viewRequest = this.viewRequest.bind(this);
    this.paginate = this.paginate.bind(this);
    this.toggleCreating = this.toggleCreating.bind(this);
  }

  toggleCreating() {
    const { isCreating } = this.state;
    this.setState({ isCreating: !isCreating });
  }

  setCurrentPage = (pageNumber) => {
    this.setState({
      currentPage: pageNumber
    });
  };

  paginate(pageNumber) {
    this.setCurrentPage(pageNumber);
  }

  viewRequest(e) {
    window.location.href = `/request/${e.target.id}`;
  }

  handleSearch() {
    const { parameter, query } = this.state;
    const { searchRequests } = this.props;
    if (parameter && query) {
      searchRequests(parameter, query);
    }
  }

  handleRequests(value) {
    const { fetchRequests: getRequests, getPending, getPast } = this.props;
    switch (value) {
      case 'ALL':
        getRequests();
        break;
      case 'PENDING':
        getPending();
        break;
      case 'PAST':
        getPast();
        break;
      default:
        break;
    }
  }

  componentDidMount() {
    // const { fetchRequests: getRequests } = this.props;
    // getRequests();
  }

  componentDidUpdate(prevProps) {
    const { requests, history } = this.props;
    if (
      requests !== prevProps.requests &&
      requests.error &&
      requests.error.status === 401
    ) {
      localStorage.removeItem('barnesToken');
      history.push('/log-in');
    }
  }

  handleChange(e) {
    let resetPage = {};
    if (e.target.name === 'requestsPerPage') {
      resetPage = { currentPage: 1 };
    }
    this.setState({
      ...resetPage,
      [e.target.name]: e.target.value
    });
  }

  render() {
    const { requests, history } = this.props;
    const { parameter, currentPage, isCreating } = this.state;
    const { message, type } = searchMessage(parameter);
    let { requestsPerPage } = this.state;
    if (!requestsPerPage || requestsPerPage <= 0) {
      requestsPerPage = 1;
    }
    const indexOfLastRequest = currentPage * requestsPerPage;
    const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;

    let items;
    let display;
    let obj;

    display = (
      <div>
        <Spinner className="spinner-center" />
      </div>
    );

    if (Object.keys(requests.filtered).length !== 0) {
      obj = requests.filtered;
    } else {
      obj = requests.requests;
    }

    if (requests.error !== null) {
      display = (
        <div>
          <h3 className="text-center text-danger">
            {requests.error.status === 401
              ? 'Invalid Session'
              : requests.error.message}
          </h3>
        </div>
      );
    } else {
      if (Object.keys(obj).length !== 0 && obj.constructor === Object) {
        items = obj.data;
        const currentRequests = items.slice(
          indexOfFirstRequest,
          indexOfLastRequest
        );
        const table = (
          <TableComponent
            items={currentRequests}
            viewRequest={this.viewRequest}
            destination="request"
            currentPage={currentPage}
            requestsPerPage={requestsPerPage}
            totalRequests={items.length}
            paginate={this.paginate}
          />
        );

        display =
          items && items.length ? (
            table
          ) : (
            <p className="text-center backdrop">
              you currently have no requests
            </p>
          );
      }
    }

    return (
      <Container>
        <RequestPanel
          title={requests.title}
          onClick={this.handleRequests}
          onChange={this.handleChange}
          holder={message}
          type={type}
          search={this.handleSearch}
        />
        <div className="bg-img" />
        <div className="black-container black-short" />
        <p className="accommodation-title p-top-5">Your Requests</p>
        <Row>
          <Col className="col-10">
            <Button
              buttonType="button"
              ButtonId="create-start"
              classes={`btn m-bottom-1 ${
                isCreating ? 'btn-danger' : 'btn-primary'
              }`}
              text={isCreating ? '✖ Close' : '✙ New Request'}
              onClick={this.toggleCreating}
            />
          </Col>
          {isCreating && <CreateRequest history={history} />}
        </Row>
        <div className="row sm p-bottom-3">
          <div className="col-10 offset-3">
            <div className="page-header text-center" />
            {display}
          </div>
        </div>
      </Container>
    );
  }
}

Requests.propTypes = {
  fetchRequests: PropTypes.func.isRequired,
  getPending: PropTypes.func.isRequired,
  getPast: PropTypes.func.isRequired,
  searchRequests: PropTypes.func.isRequired
};

const mapStateToProps = ({ requests, errors }) => ({ requests, errors });

const mapDispatchToProps = {
  fetchRequests,
  getPending,
  getPast,
  searchRequests
};

export default connect(mapStateToProps, mapDispatchToProps)(Requests);
