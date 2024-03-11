import { toast } from "react-toastify";
import { categoryActions } from "../Slice/categoriesSlice";
import request from "../../utils/baseURL";

export function getCategories() {
  return async (dispatch) => {
    try {
      const token = JSON.parse(localStorage.getItem("user")).token;
      const { data } = await request.get("/api/category", {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(categoryActions.setCategories(data.data.categories));
    } catch (error) {
      toast.error(error?.response?.error?.message);
    }
  };
}
