import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Meta from '../shared/Meta';
import TableComponent from './shared/TableComponent';
import { fetchRequestApprovals } from '../../redux/actions/approvalsAction';

class ApprovalsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
      requestsPerPage: 3
    };
  }

  componentDidMount() {
    const { fetchRequestApprovals: getApprovals } = this.props;
    getApprovals();
  }

  componentDidUpdate(prevProps) {
    const { approvals, history } = this.props;
    if (approvals !== prevProps.approvals) {
      if (approvals.error) {
        if (approvals.error.status === 403) {
          history.push('/AccessForbidden');
        }
      }
    }
  }

  setCurrentPage = (pageNumber) => {
    this.setState({
      currentPage: pageNumber
    });
  };

  paginate = (pageNumber) => this.setCurrentPage(pageNumber);

  viewRequest = (e) => {
    window.location.href = `/approvals/${e.target.id}`;
  };

  render() {
    const { approvals } = this.props;
    const { requestsPerPage, currentPage } = this.state;
    let items;
    let display;

    const indexOfLastRequest = currentPage * requestsPerPage;
    const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
    display = (
      <div>
        <h2 className="text-center">Data Loading ...</h2>
      </div>
    );
    if (approvals.error !== null) {
      display = (
        <div>
          <h3 className="text-center text-danger">
            {approvals.error.status === 401
              ? 'Invalid Session'
              : approvals.error.message}
          </h3>
        </div>
      );
    } else {
      const obj = approvals.approvals;
      if (Object.keys(obj).length !== 0 && obj.constructor === Object) {
        items = obj.data;
        const currentRequests = items.slice(
          indexOfFirstRequest,
          indexOfLastRequest
        );
        const table = (
          <TableComponent
            items={currentRequests}
            currentPage={currentPage}
            requestsPerPage={requestsPerPage}
            totalRequests={items.length}
            paginate={this.paginate}
            viewRequest={this.viewRequest}
            destination="approvals"
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
      <>
        <Meta title="Approvals" />
        <div className="grid sm p-bottom-3">
          <div className="col-10 offset-3">
            <div className="bg-img" />
            <div className="black-container black-short" />
            <p className="accommodation-title p-top-5 m-bottom-5">
              Pending Requests
            </p>
            {display}
          </div>
        </div>
      </>
    );
  }
}

ApprovalsPage.propTypes = {
  fetchRequestApprovals: PropTypes.func.isRequired,
  approvals: PropTypes.object.isRequired
};

export const mapStateToProps = ({ approvals }) => ({ approvals });

export default connect(mapStateToProps, {
  fetchRequestApprovals
})(ApprovalsPage);
