import { useEffect } from "react";
import { useState } from "react";
import { getAllBlogs } from "../services/allBlogs";
import { BlogPost } from "./BlogPost";
import "./blogs.css";
import { NavBar } from "./NavBar";

export const AllBlogs = () => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");

  useEffect(() => {
    getAllBlogs().then((blogsArray) => {
      setAllBlogs(blogsArray);
      setFilteredBlogs(blogsArray);
    });
  }, []);

  useEffect(() => {
    let foundBlog = allBlogs;

    if (selectedTopic !== "") {
      foundBlog = foundBlog.filter((blog) => blog.topic.name === selectedTopic);
    }

    if (searchText !== "") {
      foundBlog = foundBlog.filter((blog) =>
        blog.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setFilteredBlogs(foundBlog);
  }, [searchText, selectedTopic, allBlogs]);

  const handleDropdown = (event) => {
    setSelectedTopic(event.target.value);
  };

  return (
    <div className="all-posts-container">
      <div>
        <NavBar />
      </div>
      <div className="header-choices">
        <div className="search-bar">
          <input
            className="header_choices"
            type="text"
            placeholder="Search For Post..."
            onChange={(event) => {
              setSearchText(event.target.value);
            }}
          ></input>
        </div>
        <div className="topic-choice">
          <select
            name="topics"
            className="header_choices"
            onChange={handleDropdown}
          >
            <option value="">Choose Topic</option>
            {[...new Set(allBlogs.map((blog) => blog.topic.name))].map(
              (topicName) => {
                return (
                  <option key={topicName} value={topicName}>
                    {topicName}
                  </option>
                );
              }
            )}
          </select>
        </div>
      </div>
      <div className="posts-container">
        {filteredBlogs.map((blog) => {
          return <BlogPost blog={blog} key={blog.id} />;
        })}
      </div>
    </div>
  );
};
