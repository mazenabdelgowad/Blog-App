import { useRef, useState } from "react";
import { toast } from "react-toastify";
import "./AddComment.css";
const AddComment = () => {
  const [comment, setComment] = useState("");
  const commentRef = useRef(null);

  const handleSumbit = (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      commentRef.current.focus();
      return toast.error("Comment is required");
    }
    // @TODO - send comment to server
    console.log(comment);
    setComment("");
  };
  return (
    <form className="add-comment-form" onSubmit={handleSumbit}>
      <input
        type="text"
        placeholder="Add comment"
        name="comment"
        id="name"
        autoComplete="off"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        ref={commentRef}
      />
      <button type="submit" className="btn btn-dark rounded-pill">
        Add comment
      </button>
    </form>
  );
};

export default AddComment;
