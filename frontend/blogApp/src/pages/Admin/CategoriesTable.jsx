import AdminSidebar from "./AdminSidebar";
import swal from "sweetalert";
import { categories } from "../../dummyData";
import { useEffect } from "react";
const CategoriesTable = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleDelete = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this category!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Category has been deleted successfully!", {
          icon: "success",
        });
      }
    });
  };

  return (
    <section className="categories-table">
      <AdminSidebar />
      <div className="container">
        <h2 className="categories-table-title text-capitalize">Categories</h2>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Count</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((category) => (
              <tr key={category._id}>
                <td>{category._id}</td>
                <td>{category.title}</td>
                <td className="d-flex justify-content-center align-items-center">
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

export default CategoriesTable;
