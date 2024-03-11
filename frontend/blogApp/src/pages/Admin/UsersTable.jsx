import AdminSidebar from "./AdminSidebar";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import { useEffect } from "react";
const UsersTable = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleDelete = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this user!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("User has been deleted successfully!", {
          icon: "success",
        });
      }
    });
  };

  return (
    <section className="users-table">
      <AdminSidebar />
      <div className="container">
        <h2 className="users-table-title text-capitalize">users</h2>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Count</th>
              <th>User</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>1</td>
              <td>Mazen</td>
              <td>mazen@gmail.com</td>
              <td className="d-flex justify-content-around">
                <Link className="btn btn-success" to="/profile/1">
                  View Proflie
                </Link>
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

export default UsersTable;
