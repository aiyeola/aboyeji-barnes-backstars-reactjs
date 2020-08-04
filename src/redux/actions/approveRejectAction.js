import { approveReject } from '../../API/managerApi';
import { APPROVE_REJECT_SUCCESS, APPROVE_REJECT_ERROR } from './actionTypes';

const ApproveReject = ({ action, requestId, reason }) => async (dispatch) => {
  try {
    const data = await approveReject(action, requestId, reason);
    switch (data.status) {
      case 200:
        dispatch({
          type: APPROVE_REJECT_SUCCESS,
          details: {
            status: 200,
            message: `Request ${action}ed Successfully`
          }
        });
        break;
      default:
        dispatch({
          type: APPROVE_REJECT_ERROR,
          error: { status: data.status, message: data.message }
        });
    }
  } catch (error) {
    dispatch({
      type: APPROVE_REJECT_ERROR,
      error: { status: 501, message: 'Connection error' }
    });
  }
};
export default ApproveReject;
