import AdminSidebar from "./AdminSidebar";
import swal from "sweetalert";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  deleteCategory,
} from "../../Redux/ApiCalls/categoriesApi";
const CategoriesTable = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getCategories());
  }, []);

  const handleDelete = (category) => {
    swal({
      title: "Are you sure?",
      text: `Once deleted, you will not be able to recover ${category?.title}!`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteCategory(category?._id));
      }
    });
  };

  return (
    <>
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
              {categories?.map((category, index) => (
                <tr key={category?._id}>
                  <td>{++index}</td>
                  <td>{category?.title}</td>
                  <td className="d-flex justify-content-center align-items-center">
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(category)}
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
    </>
  );
};

export default CategoriesTable;
