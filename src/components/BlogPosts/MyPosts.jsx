import { useEffect, useState } from "react";
import { getBlogByUserId } from "../../services/blogServices";
import { useNavigate } from "react-router-dom";
import { DeletePost } from "../../services/PostServices";

export const MyPosts = ({ currentUser }) => {
  const [userBlogs, setUserBlogs] = useState([]);

  const navigate = useNavigate();

  const getUserBlogs = () => {
    getBlogByUserId(currentUser.id).then((blogsArray) => {
      setUserBlogs(blogsArray);
    });
  };

  useEffect(() => {
    getUserBlogs();
  }, [currentUser]);

  const handleDelete = (event) => {
    DeletePost(event.target.value).then(() => {
      getUserBlogs();
    });
  };

  return (
    <section className="my-posts-container">
      {userBlogs.map((blog) => {
        return (
          <article className="my-post" key={blog.id}>
            <span
              className="my-post-title"
              onClick={() => navigate(`/post/${blog.id}`)}
            >
              {blog.title}
            </span>
            <button
              className="delete-btn edit-btn"
              value={blog.id}
              onClick={handleDelete}
            >
              Delete Post
            </button>
          </article>
        );
      })}
    </section>
  );
};
