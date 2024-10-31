import { useEffect, useState } from "react";
import { getAllBlogs } from "../../services/blogServices";
import { CreatePost } from "../../services/PostServices";
import { useNavigate } from "react-router-dom";

export const NewPost = ({ currentUser }) => {
  const [topicChoices, setTopicChoices] = useState([]);
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getAllBlogs().then((blogsArray) => {
      setTopicChoices(blogsArray);
    });
  }, []);

  const date = new Date();
  const todaysDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;
  const handleNewPost = (event) => {
    event.preventDefault();
    const newPost = {
      userId: currentUser.id,
      topicId: parseInt(topic),
      title: title,
      body: body,
      date: todaysDate,
    };
    CreatePost(newPost).then(() => {
      navigate(`/MyPosts`);
    });
  };

  return (
    <form className="new-post post-container">
      <fieldset>
        <div className="title-topic">
          <input
            type="text"
            name="title"
            maxLength="40"
            placeholder="Enter Title..."
            required
            className="title-input header_choices"
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          <select
            name="topics"
            className="topic-choice header_choices"
            required
            onChange={(event) => {
              setTopic(event.target.value);
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
          placeholder="What's on your mind?"
          required
          onChange={(event) => {
            setBody(event.target.value);
          }}
        />
      </fieldset>
      <fieldset>
        <button className="save-btn interior-borders" onClick={handleNewPost}>
          Create Post
        </button>
      </fieldset>
    </form>
  );
};
