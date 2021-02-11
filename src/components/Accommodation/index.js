import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SnackBar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';

import Pagination from '../shared/Pagination';
import AddAccommodation from './CreateAccommodation';
import SingleAccommodation from './Accommodation';
import { getAccommodations } from '../../redux/actions/accommodationsAction';
import { getLocations } from '../../redux/actions/requestAction';

import { accommodations } from '../../__mocks__/accommodations';
import { locations } from '../../__mocks__/locations';

function Accommodations(props) {
  const theme = useTheme();

  const [currentPage, setCurrentPage] = useState(1);
  const [requestsPerPage, setRequestsPerPage] = useState(3);
  const [isCreating, setIsCreating] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [accError, setAccError] = useState(null);
  const [isAllowed, setIsAllowed] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    backgroundColor: '',
  });

  // useEffect(() => {
  //   const currentUser = {
  //     role: props.user.userRole,
  //     id: props.user.id,
  //   };

  //   props.getAccommodations(currentUser);
  //   props.getLocations();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    if (props.user) {
      handleAuth(props.user);
    }

    if (props.addAccommodation) {
      setAccommodation(props.addAccommodation);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.addAccommodation]);

  // const setCurrentPage = (pageNumber) => {
  //   this.setState({
  //     currentPage: pageNumber
  //   });
  // };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const setAccommodation = (accommodation) => {
    if (accommodation.accommodation) {
      props.history.push(`/accommodation/${accommodation.accommodation.id}`);
    } else if (accommodation.error) {
      if (accommodation.error !== accError) {
        setAccError(accommodation.error);
        setSubmitting(false);
        setAlert({
          open: true,
          message: accommodation.error,
          backgroundColor: theme.palette.error.main,
        });
      }
    }
  };

  const handleAuth = (user) => {
    const allowed = ['Accommodation Supplier', 'Travel Administrator'];
    if (isAllowed !== true) {
      if (allowed.includes(user.userRole)) {
        setIsAllowed(true);
      }
    }
  };

  const toggleCreating = () => setIsCreating(!isCreating);

  const submit = () => setSubmitting(true);

  let total = [];

  if (!requestsPerPage || requestsPerPage <= 0) {
    setRequestsPerPage(1);
  }
  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  total = accommodations;

  const items = total.slice(indexOfFirstRequest, indexOfLastRequest);
  const totalRequests = total.length;

  return (
    <>
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
          rating={Math.round(parseInt(accommodation.averageRating))}
        />
      ))}

      {/* ----------------Pagination--------------------------- */}
      <SnackBar
        open={alert.open}
        message={alert.message}
        ContentProps={{
          style: {
            backgroundColor: alert.backgroundColor,
          },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={() => setAlert({ ...alert, open: false })}
        autoHideDuration={3000}
      />
    </>
  );
}

Accommodations.propTypes = {
  getAccommodations: PropTypes.func.isRequired,
  accommodations: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = ({ accommodations, request, addAccommodation }) => ({
  accommodations,
  locations: request.locations,
  addAccommodation,
});

export default connect(mapStateToProps, { getAccommodations, getLocations })(
  Accommodations
);
