import { toast } from "react-toastify";
import { profileActions } from "../Slice/profileSlice";
import { authActions } from "../Slice/authSlice";
import request from "../../utils/baseURL";

export function getUserProfile(userId) {
  return async (dispatch) => {
    try {
      const token = JSON.parse(localStorage.getItem("user")).token;
      const { data } = await request.get(`/api/users/profile/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(profileActions.setProfile(data.data.user));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

export function updateProfilePhoto(newPhoto) {
  return async (dispatch) => {
    try {
      const token = JSON.parse(localStorage.getItem("user")).token;
      const { data } = await request.post(
        `/api/users/profile/profile-photo-upload`,
        newPhoto,
        {
          headers: { Authorization: `Bearer ${token}` },
          "Content-Type": "multipart/form-data",
        }
      );

      toast.success(data.message);
      dispatch(profileActions.setProfilePhoto(data.profilePhoto));
      dispatch(authActions.setUserProfilePhoto(data.profilePhoto));

      const user = JSON.parse(localStorage.getItem("user"));
      user.profilePhoto = data?.profilePhoto;
      localStorage.setItem("user", JSON.stringify(user));

      //
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
}

export function updateUserProfile(userId, newProfile) {
  return async (dispatch) => {
    try {
      const token = JSON.parse(localStorage.getItem("user")).token;
      const { data } = await request.patch(
        `/api/users/profile/${userId}`,
        newProfile,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log(data?.data?.user);
      console.log("posts: ", data?.data?.user.posts);

      dispatch(profileActions.updateProfile(data?.data?.user));
      dispatch(authActions.setUserName(data?.data?.user?.username));

      const user = JSON.parse(localStorage.getItem("user"));
      // console.log("user from localStorage: ", user);
      user.username = data?.data?.user?.username;
      localStorage.setItem("user", JSON.stringify(user));
      //
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
}
