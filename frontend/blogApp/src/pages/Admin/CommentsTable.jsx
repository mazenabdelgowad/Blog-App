import AdminSidebar from "./AdminSidebar";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import { useEffect } from "react";
const CommentsTable = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleDelete = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this comment!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Comment has been deleted successfully!", {
          icon: "success",
        });
      }
    });
  };

  return (
    <section className="comments-table">
      <AdminSidebar />
      <div className="container">
        <h2 className="comments-table-title text-capitalize">Comments</h2>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Count</th>
              <th>User</th>
              <th>Comment</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>1</td>
              <td>Mazen</td>
              <td>This is amazing post</td>
              <td className="d-flex justify-content-center align-items-center">
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete()}
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default CommentsTable;
