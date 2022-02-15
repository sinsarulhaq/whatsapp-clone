import React from "react";
import { useNavigate } from "react-router-dom";
import "./UserProfile.css";
function UserProfile({ name, photoUrl, email }) {
  const navigate = useNavigate();

  const goToUser = (emailId) => {
    if (emailId) {
      navigate(`/${emailId}`);
    }
  };
  return (
    <div className="user-profile" onClick={() => goToUser(email)}>
      <div className="user-image">
        <img src={photoUrl} alt="" />
      </div>
      <div className="user-info">
        <p className="username">{name}</p>
      </div>
    </div>
  );
}

export default UserProfile;
