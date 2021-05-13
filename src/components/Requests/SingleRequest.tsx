import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import BookRoomPage from '../Booking';
import UpdateRequest from './CreateOrEditRequest';
import updatableRequest from '@helpers/updatableRequest';
import TravelDetails from './shared/TravelDetails';
import TravelReason from './shared/TravelReason';
import CommentsComponent from './shared/CommentComponent'; //
import ConfirmModal from './shared/ConfirmModal';
import Button from '@components/shared/Button';
import Spinner from '@components/shared/Spinner';
import Meta from '@components/shared/Meta';
import { cancelBookingAction } from '@redux/actions/bookingAction'; //
import { getSingleRequest, deleteRequest } from '@redux/actions/requestAction';

export class ViewRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      request: '',
      updating: false,
      formattedRequest: '',
      showModal: false,
      booking: false,
      showCancel: false,
      cancelling: false,
    };
  }

  componentDidMount() {
    const {
      getSingleRequest: fetchRequest,
      match: { params },
      history,
    } = this.props;
    if (!params.id || !Number.isInteger(Number(params.id)))
      history.push('/requests');
    fetchRequest(params.id);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { request, history, booking } = nextProps;
    const { data, error } = booking;
    if (data || error) {
      if (data) {
        toast.success(data.message);
        window.location = '/requests';
      } else {
        const { status, message } = error;
        this.setState({ cancelling: false });
        switch (status) {
          case 401:
            toast.error('Current session expired. Login');
            localStorage.removeItem('barnesToken');
            history.push('/log-in');
            break;
          case 404:
            toast.error(message);
            window.location = '/requests';
            break;
          case 403:
            toast.error(message);
            history.push('/dashboard');
            break;
          case 500:
            toast.error(message);
            history.push('/500');
            break;
          default:
            toast.error(message);
            history.push('/dashboard');
        }
      }
    }

    switch (request.status) {
      case 'fetch_request_success':
        const formattedRequest = updatableRequest(request.data[0]);
        this.setState({ request: request.data[0], formattedRequest });
        break;
      case 'fetch_request_error':
        toast.error(request.error);
        history.push('/requests');
        break;
      case 'delete_request_success':
        toast.success(request.message);
        history.push('/requests');
        break;
      case 'delete_request_error':
        toast.error(request.error);
        this.setState({ showModal: false });
        break;
      default:
        break;
    }
  }

  toggleUpdating = () => {
    const { updating } = this.state;
    if (updating === true) {
      const {
        getSingleRequest: fetchRequest,
        match: { params },
      } = this.props;
      fetchRequest(params.id);
    }
    this.setState({ updating: !updating });
  };

  toggleModal = () => {
    const { showModal } = this.state;
    this.setState({ showModal: !showModal });
  };

  deleteRequest = () => {
    const { deleteRequest: deleteTripRequest, match } = this.props;
    deleteTripRequest(match.params.id);
  };

  toggleBooking = () => {
    const { booking } = this.state;
    this.setState({ booking: !booking });
  };

  toggleCancel = () => {
    const { showCancel } = this.state;
    this.setState({ showCancel: !showCancel });
  };

  cancelBooking = () => {
    this.toggleCancel();
    this.setState({ cancelling: true });
    const { cancelBookingAction } = this.props;
    const { request } = this.state;
    const { id } = request;
    cancelBookingAction(id);
  };

  render() {
    const {
      request,
      updating,
      formattedRequest,
      showModal,
      booking,
      showCancel,
      cancelling,
    } = this.state;
    const { match, history } = this.props;
    const payload = request;
    delete payload.passportName;
    return updating ? (
      <>
        <div className="grid">
          <div className="col-1" />
          <UpdateRequest
            id={match.params.id}
            toggleUpdating={this.toggleUpdating}
            updating
            request={formattedRequest}
          />
          <div className="col-1" />
        </div>
      </>
    ) : booking ? (
      <>
        <div className="full-width">
          <BookRoomPage
            history={history}
            id={match.params.id}
            toggleBooking={this.toggleBooking}
            request={formattedRequest}
            classes="full-width"
          />
        </div>
      </>
    ) : (
      <>
        {showModal ? (
          <ConfirmModal
            confirm={this.deleteRequest}
            closeModal={this.toggleModal}
          >
            <p>Are you sure you want to delete this request?</p>
          </ConfirmModal>
        ) : showCancel ? (
          <ConfirmModal
            confirm={this.cancelBooking}
            closeModal={this.toggleCancel}
          >
            <p>Are you sure you want to cancel this booking?</p>
          </ConfirmModal>
        ) : (
          ''
        )}

        {request ? (
          <div className="single-request-container grid m-2">
            <Meta title="Single-Request" />
            <div className="col-1" />
            <div className="col-3 center">
              <TravelDetails request={payload} />
              {payload.status === 'Pending' ? (
                <>
                  <Button
                    buttonType="button"
                    buttonId="start-updating"
                    classes="btn btn-secondary m-top-2"
                    text="Update"
                    onClick={this.toggleUpdating}
                  />
                  <Button
                    buttonType="button"
                    buttonId="delete"
                    classes="btn btn-danger"
                    text="Delete"
                    onClick={this.toggleModal}
                  />
                </>
              ) : payload.booked === true ? (
                <>
                  <Button
                    buttonType="button"
                    buttonId="cancel-booking"
                    submitting={cancelling}
                    classes="btn btn-danger m-top-2"
                    text="Cancel Booking"
                    onClick={this.toggleCancel}
                  />
                </>
              ) : payload.status === 'Approved' ? (
                <>
                  <Button
                    buttonType="button"
                    buttonId="start-booking"
                    classes="btn btn-secondary m-top-2"
                    text="Book Room"
                    onClick={this.toggleBooking}
                  />
                </>
              ) : (
                ''
              )}
            </div>
            <div className="travel-reason-2-container col-7">
              <TravelReason reason={payload.reason} />
              <CommentsComponent
                status={payload.status}
                requestId={match.params.id}
              />
            </div>
            <div className="col-1" />
          </div>
        ) : (
          <Spinner className="spinner-center" />
        )}
      </>
    );
  }
}

const mapStateToProps = ({ request, booking }) => ({
  request,
  booking,
});

export default connect(mapStateToProps, {
  getSingleRequest,
  deleteRequest,
  cancelBookingAction,
})(ViewRequest);
