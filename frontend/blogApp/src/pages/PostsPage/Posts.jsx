import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts, getPostsCount } from "../../Redux/ApiCalls/postApi.js";
import Sidepar from "../../components/Sidepar/Sidepar";
import PostList from "../../components/posts/PostList.jsx";
import Pagination from "../../components/Pagination/Pagination.jsx";
import "./PostsPage.css";

const POST_PER_PAGE = 3;

const Posts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const { posts, postsCount } = useSelector((state) => state.posts);

  const pages = Math.ceil(postsCount / POST_PER_PAGE);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getPosts(currentPage));
  }, [currentPage]);

  useEffect(() => {
    dispatch(getPostsCount());
  }, []);

  return (
    <section className="posts">
      <div className="home-latest-posts">
        <div className="container">
          <PostList posts={posts} />
          <Sidepar />
        </div>
      </div>
      <Pagination
        pages={pages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </section>
  );
};

export default Posts;
