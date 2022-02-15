import React, { useEffect, useState } from "react";
import TollIcon from "@mui/icons-material/Toll";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Search from "@mui/icons-material/Search";
import "./Sidebar.css";
import UserProfile from "./UserProfile";
import db from "./firebase";

function Sidebar({ currentUser, signOut }) {
  const [allUsers, setAllUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    const getAllUsers = async () => {
      const data = await db.collection("users").onSnapshot((snapshot) => {
        setAllUsers(
          snapshot.docs.filter((doc) => doc.data().email !== currentUser.email)
        );
      });
    };
    getAllUsers();
  }, []);
  // console.log("users >>> ", allUsers);
  // eslint-disable-next-line array-callback-return
  const SearchedUser = allUsers.filter((user) => {
    if (searchInput) {
      if (
        user.data().fullname.toLowerCase().includes(searchInput.toLowerCase())
      ) {
        return user;
        // console.log(user.data().fullname);
      }
    }
  });

  const SearchItem = SearchedUser.map((user) => {
    return (
      <UserProfile
        name={user.data().fullname}
        photoUrl={user.data().photoURL}
        key={user.id}
        email={user.data().email}
      />
    );
  });
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-header-img" onClick={signOut}>
          <img src={currentUser?.photoUrl} alt="user-profile" />
        </div>
        <div className="sidebar-header-btn">
          <TollIcon />
          <InsertCommentIcon />
          <MoreVertIcon />
        </div>
      </div>
      <div className="sidebar-search">
        <div className="sidebar-seatch-input">
          <Search />
          <input
            type="text"
            name="search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search..."
          />
        </div>
      </div>
      <div className="sidebar-chat-list">
        {SearchItem.length > 0 ? (
          SearchItem
        ) : (
          <UserProfile name="sinsarul haq" photoUrl={"./user.png"} />
        )}
      </div>
    </div>
  );
}

export default Sidebar;
