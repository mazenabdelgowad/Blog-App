import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../../Redux/ApiCalls/postApi.js";
import Sidepar from "../../components/Sidepar/Sidepar.jsx";
import PostList from "../../components/posts/PostList.jsx";
import "./Home.css";
const Home = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getPosts(1));
  }, []);
  return (
    <section className="home">
      <div className="home-hero-header">
        <div className="home-hero-header-title">
          <div className="container">
            <h1 className="home-hero-header-title-text">welcome to blog</h1>
          </div>
        </div>
      </div>

      <h1 className="text-center my-5">Latest Posts</h1>

      <div className="home-latest-posts">
        <div className="container">
          <PostList posts={posts} />
          <Sidepar />
        </div>
      </div>

      <Link className="home-link btn btn-success" to="/posts">
        See All Posts
      </Link>
    </section>
  );
};

export default Home;
