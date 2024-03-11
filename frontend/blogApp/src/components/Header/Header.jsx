import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../Redux/Slice/authSlice";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(authActions.logout());
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <NavLink className="navbar-brand fw-bold text-light" to="/">
          Blog<i className="bi bi-pencil"></i>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span>
            <i className="bi bi-list"></i>
          </span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/posts">
                Posts
              </NavLink>
            </li>
            {user && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/posts/create-post">
                  Create
                </NavLink>
              </li>
            )}
            {user && user.isAdmin && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin-dashboard">
                  Admin Dashboard
                </NavLink>
              </li>
            )}
            {!user ? (
              <li className="nav-item">
                <Link className="btn btn-light" to="/log-in">
                  <i className="bi bi-box-arrow-in-right"></i> Log in
                </Link>
              </li>
            ) : (
              <div className="dropdown user-info">
                <button
                  className="user-info-dropdown dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {user?.username}
                  <img
                    src={user?.profilePhoto?.url}
                    alt={user?.username}
                    className="ms-1"
                  />
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={`/profile/${user?.id}`}>
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleLogOut()}
                    >
                      Log out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
