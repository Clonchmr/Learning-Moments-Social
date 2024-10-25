import { Route, Routes } from "react-router-dom";
import { AllBlogs } from "../components/BlogPosts/AllBlogs";
import { useEffect, useState } from "react";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localLearningUser = localStorage.getItem("learning_user");
    const learningUserObj = JSON.parse(localLearningUser);
    setCurrentUser(learningUserObj);
  }, []);

  return (
    <Routes>
      <Route path="/">
        <Route index element={<AllBlogs />} />
      </Route>
    </Routes>
  );
};
