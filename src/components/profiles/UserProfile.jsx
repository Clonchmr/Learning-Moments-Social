import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById } from "../../services/userServices";

export const UserProfile = ({ currentUser }) => {
  const [user, setUser] = useState([]);
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getUserById(userId).then(setUser);
  }, [userId]);
  return (
    <>
      <section className="user-profile post">
        <div className="user-info">
          <div className="user-info-item interior-borders">{user.name}</div>
          <div className="user-info-item interior-borders">{user.cohort}</div>
        </div>
        <div className="user-footer">
          <div className="user-info-item interior-borders">
            Contributed {user.posts?.length} thoughts
          </div>
          {parseInt(userId) === currentUser.id ? (
            <button
              className="edit-profile-btn"
              onClick={() => {
                navigate(`/profile/${userId}/edit`);
              }}
            >
              Edit Profile
            </button>
          ) : (
            ""
          )}
        </div>
      </section>
    </>
  );
};
