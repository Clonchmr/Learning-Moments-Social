import { Link, useNavigate } from "react-router-dom";

export const NavBar = ({ currentUser }) => {
  const navigate = useNavigate;

  return (
    <ul className="navbar">
      <Link to="/">
        <li className="navbar-items interior-borders">All Posts</li>
      </Link>
      <Link to={"/MyPosts"}>
        <li className="navbar-items interior-borders">My Posts</li>
      </Link>
      <Link to={"/Favorites"}>
        <li className="navbar-items interior-borders">Favorites</li>
      </Link>
      <Link to="/NewPost">
        <li className="navbar-items interior-borders">New Post</li>
      </Link>
      <Link to={`/profile/${currentUser.id}`}>
        <li className="navbar-items interior-borders">Profile</li>
      </Link>
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
