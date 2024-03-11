import { toast } from "react-toastify";
import { authActions } from "../Slice/authSlice";
import request from "../../utils/baseURL";
export function loginUser(user) {
  return async (dispatch) => {
    try {
      const { data } = await request.post("/api/auth/login", user);
      dispatch(authActions.login(data.data));
      localStorage.setItem("user", JSON.stringify(data.data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
export function registerUser(user) {
  return async (dispatch) => {
    try {
      const { data } = await request.post("/api/auth/register", user);
      dispatch(authActions.register(data.message));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
