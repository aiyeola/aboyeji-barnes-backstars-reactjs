/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMostTravelled, getTrips } from '@redux/actions/dashboardAction';
import DashboardPage from './DashboardPage';
import Spinner from '@components/shared/Spinner';

const ManageDashboard = ({
  getMostTravelled,
  getTrips,
  mostTravelled,
  tripsStats,
}) => {
  const [parameter, setParameter] = useState('years');
  const [value, setValue] = useState('1');

  useEffect(() => {
    getMostTravelled();
    const state = {
      parameter,
      value,
    };
    getTrips(state);
  }, []);

  const handleComputePeriod = (event) => {
    event.preventDefault();
    const state = {
      parameter,
      value,
    };
    getTrips(state);
  };

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setParameter(name);
    setValue(value);
    // this.setState({
    //   [name]: value
    // });
  };

  const spinner = (
    <div>
      <Spinner className="spinner-center" />
    </div>
  );

  const display = mostTravelled ? (
    <DashboardPage
      destination={mostTravelled}
      trips={tripsStats}
      computePeriod={handleComputePeriod}
      updateInput={handleChange}
    />
  ) : (
    spinner
  );
  return display;
};

ManageDashboard.propTypes = {
  mostTravelled: PropTypes.object.isRequired,
  tripsStats: PropTypes.object.isRequired,
  getMostTravelled: PropTypes.func.isRequired,
  getTrips: PropTypes.func.isRequired,
};

const mapStateToProps = ({ dashboard }) => ({
  mostTravelled: dashboard.mostTravelled,
  tripsStats: dashboard.tripStats,
});

export default connect(mapStateToProps, { getMostTravelled, getTrips })(
  ManageDashboard,
);
