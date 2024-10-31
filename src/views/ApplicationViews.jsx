import { Outlet, Route, Routes } from "react-router-dom";
import { AllBlogs } from "../components/BlogPosts/AllBlogs";
import { useEffect, useState } from "react";
import { PostDetails } from "../components/BlogPosts/PostDetails";
import { NavBar } from "../components/navBar/NavBar";
import { NewPost } from "../components/forms/NewPost";
import { MyPosts } from "../components/BlogPosts/MyPosts";
import { EditPost } from "../components/forms/EditPost";
import { FavoritePosts } from "../components/BlogPosts/FavoritePosts";
import { UserProfile } from "../components/profiles/UserProfile";
import { EditProfile } from "../components/forms/EditProfile";

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
            <NavBar currentUser={currentUser} />
            <Outlet />
          </>
        }
      >
        <Route index element={<AllBlogs />} />
        <Route path="NewPost" element={<NewPost currentUser={currentUser} />} />
        <Route path="MyPosts" element={<MyPosts currentUser={currentUser} />} />
        <Route
          path="Favorites"
          element={<FavoritePosts currentUser={currentUser} />}
        />
        <Route path="profile">
          <Route
            path=":userId"
            element={<UserProfile currentUser={currentUser} />}
          />

          <Route
            path=":userId/edit"
            element={<EditProfile currentUser={currentUser} />}
          />
        </Route>

        <Route
          path="post/:blogId"
          element={<PostDetails currentUser={currentUser} />}
        />
        <Route
          path="post/:blogId/edit"
          element={<EditPost currentUser={currentUser} />}
        />
      </Route>
    </Routes>
  );
};
