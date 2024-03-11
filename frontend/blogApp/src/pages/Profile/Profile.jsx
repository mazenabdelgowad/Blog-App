import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserProfile,
  updateProfilePhoto,
} from "../../Redux/ApiCalls/profileApi";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import swal from "sweetalert";
import PostList from "../../components/posts/PostList";
import "./Profile.css";
import UpdateProrfileModel from "./UpdateProfileModel";
const Profile = () => {
  // Get user profile form server
  const { userId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getUserProfile(userId));
  }, []);
  const { profile } = useSelector((state) => state.profile);

  const validUser = userId === JSON.parse(localStorage.getItem("user")).id;

  const [file, setFile] = useState(null);
  const [showUpdateProfilePage, setShowUpdateProfilePage] = useState(false);

  const handleDeleteProfile = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover your proflie!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Profile has been deleted successfully", {
          icon: "success",
        });
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return toast.error("No image provided");

    const formData = new FormData();

    formData.append("image", file);

    dispatch(updateProfilePhoto(formData));
  };

  return (
    <section className="profile">
      {showUpdateProfilePage && (
        <UpdateProrfileModel
          profile={profile}
          setShowUpdateProfilePage={setShowUpdateProfilePage}
        />
      )}

      <div className="profile-header">
        <div className="profile-image-wrapper">
          <img
            src={file ? URL.createObjectURL(file) : profile?.profilePhoto?.url}
            alt={profile?.username}
            className="profile-image"
          />
          {validUser && (
            <form onSubmit={handleSubmit}>
              <abbr title="choose profile photo">
                <label
                  htmlFor="file"
                  className="bi bi-camera-fill upload-profile-photo-icon"
                ></label>
              </abbr>

              <>
                <input
                  type="file"
                  name="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <button type="submit" className="upload-profile-photo-btn">
                  upload
                </button>
              </>
            </form>
          )}
        </div>
        <h1 className="profile-username ">{profile?.username}</h1>
        <p className="profile-bio">{profile?.bio ? profile?.bio : ""}</p>
        <div className="user-date-joined">
          <strong>Date Joined: </strong>
          <span>{new Date(profile?.createdAt).toDateString()}</span>
        </div>
        {validUser && (
          <button
            className="profile-update-btn"
            onClick={() => setShowUpdateProfilePage(true)}
          >
            <i className="bi bi-file-person-fill"></i>
            Update Profile
          </button>
        )}
      </div>

      <div className="profile-posts-list">
        <h2 className="profile-posts-list-title">{profile?.username} Posts</h2>
        {profile?.posts?.length > 0 ? (
          <PostList posts={profile?.posts} />
        ) : (
          <p className="text-danger fw-bold m-0">
            you did not post anything yet!
          </p>
        )}
      </div>

      <button onClick={handleDeleteProfile} className="btn btn-danger">
        Delete Your Account
      </button>
    </section>
  );
};

export default Profile;
