import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import TextArea from '../../shared/TextArea';
import {
  getComment,
  postComment,
  deleteComment
} from '../../../redux/actions/commentAction';

class CommentsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      markup: '',
      error: ''
    };
  }

  componentDidMount() {
    const { requestId, getComment: fetchComments } = this.props;
    fetchComments(requestId);
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  removeComment = (id) => {
    const { deleteComment: rmComment } = this.props;
    rmComment(id);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { postComment: addComment, requestId } = this.props;
    const { comment } = this.state;
    addComment(requestId, { comment });
  };

  render() {
    const { comment, markup, error } = this.state;
    const { comments, profile, status } = this.props;
    const obj = comments.comments;
    let display;
    if (Object.keys(obj).length === 0 && obj.constructor === Object) {
      display = <h2> No comments</h2>;
    } else {
      const { data } = comments.comments;
      display = data.map((item) => (
        <div className="comment" key={item.id}>
          <span className="comment-details">
            <span className="comment-details-owner">
              {item.User.firstName} {item.User.lastName}
            </span>
            <br />
            <em className="comment-details-time">
              {moment(item.createdAt).fromNow()}
            </em>
          </span>
          <div
            className="comment-body"
            dangerouslySetInnerHTML={{ __html: item.comment }}
          />
          {item.User.firstName === profile.firstName ? (
            <button
              className="comment-actions"
              onClick={() => this.removeComment(item.id)}
              role="button"
              tabIndex="0"
            >
              Delete
            </button>
          ) : (
            ''
          )}
        </div>
      ));
    }
    return (
      <>
        <div className="comment-container">
          <h3 className="comment-title">Comments</h3>
          {status === 'Pending' ? (
            <form onSubmit={this.handleSubmit}>
              <TextArea
                value={comment}
                markup={markup}
                name="comment"
                onChange={(e) => this.handleChange(e)}
                error=""
              />
              <button className="btn btn-secondary" type="submit">
                Add Comment
              </button>
            </form>
          ) : (
            ''
          )}
          <div className="comments">{display}</div>
        </div>
      </>
    );
  }
}

export const mapStateToProps = ({ comments, profile }) => ({
  comments,
  profile: {
    firstName: profile.data.firstName,
    lastName: profile.data.lastName
  }
});

export default connect(mapStateToProps, {
  getComment,
  postComment,
  deleteComment
})(CommentsComponent);
