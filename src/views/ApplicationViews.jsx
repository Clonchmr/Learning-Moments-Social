import { Outlet, Route, Routes } from "react-router-dom";
import { AllBlogs } from "../components/BlogPosts/AllBlogs";
import { useEffect, useState } from "react";
import { PostDetails } from "../components/BlogPosts/PostDetails";
import { NavBar } from "../components/navBar/NavBar";
import { NewPost } from "../components/BlogPosts/NewPost";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localLearningUser = localStorage.getItem("learning_user");
    const learningUserObj = JSON.parse(localLearningUser);
    setCurrentUser(learningUserObj);
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar />
            <Outlet />
          </>
        }
      >
        <Route index element={<AllBlogs />} />
        <Route path="newpost" element={<NewPost currentUser={currentUser} />} />
        <Route
          path="post/:blogId"
          element={<PostDetails currentUser={currentUser} />}
        />
      </Route>
    </Routes>
  );
};
