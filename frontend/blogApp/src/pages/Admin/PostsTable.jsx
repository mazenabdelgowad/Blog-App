import AdminSidebar from "./AdminSidebar";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import { posts } from "../../dummyData";
import { useEffect } from "react";

const PostsTable = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDelete = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Post has been deleted successfully!", {
          icon: "success",
        });
      }
    });
  };

  return (
    <section className="posts-table">
      <AdminSidebar />
      <div className="container">
        <h2 className="posts-table-title text-capitalize">Posts</h2>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Count</th>
              <th>User</th>
              <th>Post Title</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {posts.map((post) => (
              <tr key={post._id}>
                <td>{post._id}</td>
                <td className="text-capitalize">{post.user.username}</td>
                <td>{post.title}</td>
                <td className="d-flex justify-content-around">
                  <Link className="btn btn-success" to="/posts/details/1">
                    View Post
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete()}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default PostsTable;
