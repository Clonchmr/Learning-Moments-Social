import { useEffect, useState } from "react";
import { getBlogById } from "../../services/blogServices";
import { useNavigate, useParams } from "react-router-dom";
import { AddNewLike } from "../../services/Likeservices";

export const PostDetails = ({ currentUser }) => {
  const [currentBlog, setCurrentBlog] = useState(null);

  const { blogId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getBlogById(blogId).then((blogArray) => {
      const blogObj = blogArray[0];
      setCurrentBlog(blogObj);
    });
  }, [blogId]);

  const handleLike = () => {
    const postToLike = {
      userId: currentUser.id,
      postId: currentBlog.id,
    };
    AddNewLike(postToLike)
      .then(() => getBlogById(blogId))
      .then((blogArray) => {
        const blogObj = blogArray[0];
        setCurrentBlog(blogObj);
      })
      .then(navigate("/Favorites"));
  };

  if (!currentBlog) {
    return null;
  }

  return (
    <div className="post-container">
      <h3 className="post-title interior-borders">{currentBlog?.title}</h3>

      <div className="topic-likes">
        <div className="blog-topic interior-borders">
          <span
            className="my-post-title"
            onClick={() => {
              navigate(`/profile/${currentBlog.userId}`);
            }}
          >
            {currentBlog?.user?.name}
          </span>
        </div>
        <div className="blog-topic  interior-borders">
          {currentBlog?.topic?.name}
        </div>
        <div className="blog-likes interior-borders">
          {currentBlog?.likes?.length}{" "}
          {currentBlog?.likes?.length === 1 ? "Like" : "Likes"}
        </div>
      </div>
      <div className="blog-body  interior-borders">{currentBlog.body}</div>
      <footer className="post-footer">
        <div className="blog-date interior-borders">{currentBlog.date}</div>
        {currentUser.id === currentBlog.userId ? (
          <button
            className="edit-btn"
            onClick={() => {
              navigate("edit");
            }}
          >
            Edit Post
          </button>
        ) : (
          ""
        )}
        {currentUser.id !== currentBlog.userId ? (
          <button
            className="like-btn"
            onClick={handleLike}
            disabled={currentBlog.likes?.some(
              (like) => like.userId === currentUser.id
            )}
          >
            {currentBlog.likes?.some((like) => like.userId === currentUser.id)
              ? `Liked`
              : `Like Post`}
          </button> //need to add navigate to favorited posts
        ) : (
          ""
        )}
      </footer>
    </div>
  );
};
