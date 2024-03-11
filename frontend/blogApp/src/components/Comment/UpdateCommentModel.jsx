import "./UpdateCommentModel.css";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
const UpdateCommentModel = ({ setShowUpdateCommentPage }) => {
  const [title, setTitle] = useState("This is amazing post");
  const titleRef = useRef(null);

  useEffect(() => {
    titleRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "") {
      titleRef?.current?.focus();
      return toast.error("Title is required");
    }

    console.log({ title });
    setShowUpdateCommentPage(false);
    toast.success("Comment updated successfully");
  };

  return (
    <div className="update-comment">
      <div className="container">
        <form
          onSubmit={handleSubmit}
          className="update-comment-form
					d-flex justify-content-center align-items-center flex-column gap-2
				"
        >
          <abbr title="close">
            <i
              className="bi bi-x-circle-fill"
              onClick={() => setShowUpdateCommentPage(false)}
            ></i>
          </abbr>
          <h1 className="text-center text-capitalize">Update Comment</h1>
          <input
            type="text"
            name="update-comment-title"
            id="update-comment-title"
            defaultValue={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="update-comment-title-input w-100"
            ref={titleRef}
          />

          <button className="btn btn-primary">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCommentModel;
