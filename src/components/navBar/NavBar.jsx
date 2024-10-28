import { Link, useNavigate } from "react-router-dom";

export const NavBar = () => {
  const navigate = useNavigate;

  return (
    <ul className="navbar">
      <Link to="/">
        <li className="navbar-items interior-borders">All Posts</li>
      </Link>
      <li className="navbar-items interior-borders">My Posts</li>
      <li className="navbar-items interior-borders">Favorites</li>
      <Link to="/newpost">
        <li className="navbar-items interior-borders">New Post</li>
      </Link>
      <li className="navbar-items interior-borders">Profile</li>
      {localStorage.getItem("learning_user") ? (
        <li className="navbar-items interior-borders">
          <Link
            to=""
            onClick={() => {
              localStorage.removeItem("learning_user");
              navigate("/login", { replace: true });
            }}
          >
            Logout
          </Link>
        </li>
      ) : (
        ""
      )}
    </ul>
  );
};
