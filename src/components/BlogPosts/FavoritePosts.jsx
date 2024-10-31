import { useEffect, useState } from "react";
import { deleteLike, getLikes } from "../../services/Likeservices";
import { Link } from "react-router-dom";
import { getAllBlogs } from "../../services/blogServices";

export const FavoritePosts = ({ currentUser }) => {
  const [allLikes, setAllLikes] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    getLikes().then(setAllLikes);
  }, [favorites]);

  useEffect(() => {
    const filteredLikes = allLikes.filter(
      (like) => like.userId === currentUser.id
    );
    setFavorites(filteredLikes);
  }, [allLikes, currentUser]);

  return (
    <>
      <h3 className="favorites-header">Your Favorite Posts:</h3>
      <section className="favorites-container">
        {favorites.map((favorite) => {
          return (
            <div className="favorite-item interior-borders" key={favorite.id}>
              <Link to={`/post/${favorite.post.id}`}>
                <span className="my-post-title">{favorite.post.title}</span>
              </Link>
              <button
                className="interior-borders remove-favorite-btn"
                onClick={() => {
                  deleteLike(favorite.id).then(() => {
                    getLikes().then(setAllLikes);
                  });
                }}
              >
                Unfavorite
              </button>
            </div>
          );
        })}
      </section>
    </>
  );
};
