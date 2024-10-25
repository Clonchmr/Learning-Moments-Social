import { Link } from "react-router-dom";

export const BlogPost = ({ blog }) => {
  return (
    <div className="post">
      <Link to={`/post/${blog.id}`}>
        <h3 className="post-title interior-borders">{blog.title}</h3>
      </Link>
      <div className="topic-likes">
        <div className="blog-topic  interior-borders">{blog.topic.name}</div>
        <div className="blog-likes interior-borders">
          {blog.likes.length} {blog.likes.length === 1 ? "Like" : "Likes"}
        </div>
      </div>
      <div className="blog-body  interior-borders">{blog.body}</div>
    </div>
  );
};
