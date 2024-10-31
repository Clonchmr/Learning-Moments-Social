import { useEffect, useState } from "react";
import { getAllBlogs, getBlogById } from "../../services/blogServices";
import { useNavigate, useParams } from "react-router-dom";
import { UpdatePost } from "../../services/PostServices";

export const EditPost = ({ currentUser }) => {
  const [topicChoices, setTopicChoices] = useState([]);
  const [currentBlog, setCurrentBlog] = useState(null);

  const { blogId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getBlogById(blogId).then((blogArray) => {
      const blogToEdit = blogArray[0];
      setCurrentBlog(blogToEdit);
    });
  }, [blogId]);

  useEffect(() => {
    getAllBlogs().then(setTopicChoices);
  }, []);

  const handleSaveChanges = (event) => {
    event.preventDefault();
    const editedPost = {
      userId: currentUser.id,
      topicId: currentBlog.topicId,
      title: currentBlog.title,
      body: currentBlog.body,
      date: currentBlog.date,
    };
    UpdatePost(currentBlog.id, editedPost).then(() => {
      navigate(`/post/${currentBlog.id}`);
    });
  };
  return (
    <form className="new-post post-container">
      {currentBlog && (
        <>
          <fieldset>
            <div className="title-topic">
              <input
                type="text"
                name="title"
                maxLength="40"
                value={currentBlog.title}
                required
                className="title-input header_choices"
                onChange={(event) => {
                  const copy = { ...currentBlog };
                  copy.title = event.target.value;
                  setCurrentBlog(copy);
                }}
              />
              <select
                name="topics"
                className="topic-choice header_choices"
                required
                value={currentBlog.topicId}
                onChange={(event) => {
                  const copy = { ...currentBlog };
                  copy.topicId = parseInt(event.target.value);
                  setCurrentBlog(copy);
                }}
              >
                <option value="">Choose Topic</option>
                {[...new Set(topicChoices.map((topic) => topic.topic.id))]
                  .map(
                    (id) =>
                      topicChoices.find((topic) => topic.topic.id === id).topic
                  )
                  .map((topicInfo) => {
                    return (
                      <option key={topicInfo.id} value={topicInfo.id}>
                        {topicInfo.name}
                      </option>
                    );
                  })}
              </select>
            </div>
          </fieldset>
          <fieldset>
            <textarea
              className="post-body header_choices"
              name="body"
              value={currentBlog.body}
              required
              onChange={(event) => {
                const copy = { ...currentBlog };
                copy.body = event.target.value;
                setCurrentBlog(copy);
              }}
            />
          </fieldset>
          <fieldset>
            <button
              className="save-btn interior-borders"
              onClick={handleSaveChanges}
            >
              Save Changes
            </button>
          </fieldset>
        </>
      )}
    </form>
  );
};
