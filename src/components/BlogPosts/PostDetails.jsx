import { useEffect, useState } from "react";
import { getBlogById } from "../../services/blogServices";
import { useParams } from "react-router-dom";

export const PostDetails = ({ currentUser }) => {
  const [currentBlog, setCurrentBlog] = useState({});

  const { blogId } = useParams();

  useEffect(() => {
    getBlogById(blogId).then((blogArray) => {
      const blogObj = blogArray[0];
      setCurrentBlog(blogObj);
    });
  }, [blogId]);

  const handleLike = () => {
    console.log("add functionality here");
  };

  return (
    <div className="post-container">
      <h3 className="post-title interior-borders">{currentBlog.title}</h3>

      <div className="topic-likes">
        <div className="blog-topic interior-borders">
          {currentBlog.user?.name}
        </div>
        <div className="blog-topic  interior-borders">
          {currentBlog.topic?.name}
        </div>
        <div className="blog-likes interior-borders">
          {currentBlog.likes?.length}{" "}
          {currentBlog.likes?.length === 1 ? "Like" : "Likes"}
        </div>
      </div>
      <div className="blog-body  interior-borders">{currentBlog.body}</div>
      <footer className="post-footer">
        <div className="blog-date interior-borders">{currentBlog.date}</div>
        {currentUser.id === currentBlog.userId ? (
          <button className="edit-btn">Edit Post</button> //need to add click functionality to navigate to edit post
        ) : (
          ""
        )}
        {currentUser.id !== currentBlog.userId ? (
          <button className="like-btn" onClick={handleLike}>
            Like Post
          </button> //need to add navigate to favorited posts/distinguish if post is already liked
        ) : (
          ""
        )}
      </footer>
    </div>
  );
};
