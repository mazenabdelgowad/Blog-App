import "./CommentList.css";
import { Link } from "react-router-dom";
const CommentList = ({ setShowUpdateCommentPage, comments }) => {
  // handle delete comment
  const handleDeleteComment = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this comment!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Comment has been deleted successfully", {
          icon: "success",
        });
      }
    });
  };

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="comments-list">
      <h4 className="comments-list-count">
        {comments?.length > 1
          ? `${comments?.length} comments`
          : `${comments?.length} comment`}
      </h4>
      {comments?.length > 0 ? (
        comments?.map((comment) => (
          <div className="comments-list-item" key={comment}>
            <div
              className="comments-list-item-user-info
						d-flex justify-content-between align-items-end
					"
            >
              <h2 className="m-0 comments-list-item-user-info-username">
                <Link to={`/profile/${comment?.user}`}>
                  {comment?.username}
                </Link>
              </h2>
              <p className="comments-list-item-user-info-time m-0">
                {new Date(comment?.createdAt).toDateString()}
              </p>
            </div>

            <p className="comments-list-item-text">This is amazing post</p>

            {user && user?.id === comment?.user && (
              <div className="comments-list-item-icon-wrapper">
                <i
                  className="bi bi-pencil-square"
                  onClick={() => setShowUpdateCommentPage(true)}
                ></i>
                <i
                  onClick={() => handleDeleteComment()}
                  className="bi bi-trash-fill"
                ></i>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No comments yet, be the first </p>
      )}
    </div>
  );
};

export default CommentList;
