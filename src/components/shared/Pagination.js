import React from 'react';
import PropTypes from 'prop-types';

const Pagination = (requestsPerPage, totalRequests, paginate, currentPage) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalRequests / requestsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav className="a-pagination">
      <ul>
        {pageNumbers.map((number) => (
          <li
            key={number}
            style={{ display: 'inline' }}
            className={currentPage === number ? 'active' : 'notActive'}
          >
            <button onClick={() => paginate(number)}>{number}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  requestsPerPage: PropTypes.number,
  totalRequests: PropTypes.number,
  paginate: PropTypes.func.isRequired,
  currentPage: PropTypes.number
};

export default Pagination;
