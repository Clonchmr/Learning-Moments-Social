import { Outlet, Route, Routes } from "react-router-dom";
import { AllBlogs } from "../components/BlogPosts/AllBlogs";
import { useEffect, useState } from "react";
import { PostDetails } from "../components/BlogPosts/PostDetails";
import { NavBar } from "../components/navBar/NavBar";
import { NewPost } from "../components/BlogPosts/NewPost";
import { MyPosts } from "../components/BlogPosts/MyPosts";

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
        <Route path="NewPost" element={<NewPost currentUser={currentUser} />} />
        <Route path="MyPosts" element={<MyPosts currentUser={currentUser} />} />
        <Route
          path="post/:blogId"
          element={<PostDetails currentUser={currentUser} />}
        />
      </Route>
    </Routes>
  );
};
