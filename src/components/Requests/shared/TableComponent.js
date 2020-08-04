import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Pagination from '../../shared/Pagination';
// import useStyles from '../../shared/iconStyles';
import TooltipComponent from './ToolTipComponent';

export default function TableComponent({
  items,
  totalRequests,
  requestsPerPage,
  paginate,
  currentPage,
  viewRequest,
  destination
}) {
  // const classes = useStyles();
  // let status;
  function getStatus(params) {
    switch (params) {
      case 'Approved':
        return 'approved';
      case 'Rejected':
        return 'rejected';
      case 'Pending':
        return 'pending';
      default:
        return null;
    }
  }
  return (
    <>
      <table className="table">
        <thead className="table-header">
          <tr className="table-header-row">
            <th className="table-header-col">#</th>
            <th className="table-header-col">Owner</th>
            <th className="table-header-col">Request date</th>
            <th className="table-header-col">From</th>
            <th className="table-header-col">To</th>
            <th className="table-header-col">Travel Date</th>
            <th className="table-header-col">Return Date</th>
            <th className="table-header-col">Status</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {items.map((request, index) => (
            <tr
              className="table-row"
              onClick={viewRequest}
              id={request.id}
              key={request.id.toString()}
            >
              <td className="table-col" id={request.id}>
                {index + 1}
              </td>
              <td className="table-col text-center " id={request.id}>
                <Link to={`/${destination}/${request.id}`}>
                  <TooltipComponent passportName={request.passportName} />
                </Link>
              </td>
              <td className="table-col" id={request.id}>
                {moment(request.createdAt).format('MMM Do YYYY')}
              </td>
              <td className="table-col" id={request.id}>
                {request.from}
              </td>
              <td className="table-col" id={request.id}>
                {request.accommodations.map((item, idx) => (
                  <>
                    {idx > 0 && <div className="line" />}
                    <li id={request.id} key={item.id.toString()}>
                      {item.Location.city}, {item.Location.country}
                    </li>
                  </>
                ))}
              </td>
              <td className="table-col" id={request.id}>
                {request.travelDate.map((item, _index) => (
                  <li id={request.id} key={_index.toString()}>
                    {moment(item).format('MMM Do YYYY')}
                  </li>
                ))}
              </td>
              <td className="table-col" id={request.id}>
                {moment(request.returnDate).format('MMM Do YYYY') ===
                'Invalid date'
                  ? '-'
                  : moment(request.returnDate).format('MMM Do YYYY')}
              </td>
              <td className="table-col" id={request.id}>
                {request.status}
                <div
                  id={request.id}
                  className={`${getStatus(request.status)} circle`}
                />
              </td>
            </tr>
          ))}
          <tr className="table-col">
            <td colSpan="3">
              Showing <span className="special">{currentPage}</span> of{' '}
              {Math.ceil(totalRequests / requestsPerPage)}
            </td>
            <td className="table-col">
              <Pagination
                requestsPerPage={requestsPerPage}
                currentPage={currentPage}
                totalRequests={totalRequests}
                paginate={paginate}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

TableComponent.defaultProps = {
  destination: 'request'
};

TableComponent.propTypes = {
  items: PropTypes.array.isRequired,
  totalRequests: PropTypes.number,
  requestsPerPage: PropTypes.number,
  paginate: PropTypes.func.isRequired,
  currentPage: PropTypes.number,
  viewRequest: PropTypes.func.isRequired,
  destination: PropTypes.string
};
