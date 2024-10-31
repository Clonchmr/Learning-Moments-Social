import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById } from "../../services/userServices";
import { editUserProfile } from "../../services/userServices";

export const EditProfile = ({ currentUser }) => {
  const [user, setUser] = useState({});

  const { userId } = useParams();

  const navigate = useNavigate();
  useEffect(() => {
    getUserById(userId).then(setUser);
  }, [userId]);

  const handleSave = (event) => {
    event.preventDefault();
    const userInfo = {
      name: user.name,
      email: user.email,
      cohort: user.cohort,
    };
    editUserProfile(userId, userInfo)
      .then(getUserById(userId))
      .then(setUser)
      .then(navigate(`/profile/${userId}`));
  };
  return (
    <form className="post post-container">
      <h3 className="favorites-header">Edit Profile</h3>
      <fieldset>
        <div className="profile-form">
          <label>Edit Name</label>
          <input
            className="title-input header-choices profile-input"
            type="text"
            required
            value={user.name}
            onChange={(event) => {
              const copy = { ...user };
              copy.name = event.target.value;
              setUser(copy);
            }}
          ></input>
          <label>Edit Cohort</label>
          <input
            className="title-input header-choices profile-input"
            type="text"
            required
            value={user.cohort}
            onChange={(event) => {
              const copy = { ...user };
              copy.cohort = event.target.value;
              setUser(copy);
            }}
          ></input>
        </div>
      </fieldset>

      <fieldset>
        <div>
          <button className="edit-profile-btn" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </fieldset>
    </form>
  );
};
