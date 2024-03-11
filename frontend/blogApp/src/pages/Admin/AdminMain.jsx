import { useEffect } from "react";
import AddCategory from "./AddCategory";
import AdminFeature from "../../components/AdminFeautre/AdminFeature";

const AdminMain = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="admin-main">
      <div className="container">
        <div className="admin-main-features-container">
          <AdminFeature
            feature="users"
            count={6}
            buttonText="see all users"
            icon="person"
          />
          <AdminFeature
            feature="posts"
            count={10}
            buttonText="see all posts"
            icon="file-post"
          />
          <AdminFeature
            feature="categories"
            count={8}
            buttonText="see all categories"
            icon="tag-fill"
          />
          <AdminFeature
            feature="comments"
            count={8}
            buttonText="see all comments"
            icon="chat-left-text"
          />
        </div>
        <AddCategory />
      </div>
    </div>
  );
};

export default AdminMain;
