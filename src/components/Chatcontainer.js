import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MoodIcon from "@mui/icons-material/Mood";
import SendIcon from "@mui/icons-material/Send";
import "./Chatcontainer.css";
import Chatmessage from "./Chatmessage";

function Chatcontainer() {
  const [message, setMessage] = useState('')
  return (
    <div className="chat-container">
      <div className="chat-condainer-header">
        <div className="chat-user-info">
          <div className="chat-user-img">
            <img src="./user.png" alt="" />
          </div>
          <p>sinsar</p>
        </div>
        <div className="chat-container-header-btn">
          <MoreVertIcon />
        </div>
      </div>
      <div className="chat-display-container">
        <Chatmessage message={message} date="13-3-2022" />
      </div>
      <div className="chat-input">
        <div className="chat-input-btn">
          <MoodIcon />
          <AttachFileIcon />
        </div>
        <form action="">
          <input type="text" placeholder="Type..." value={message} onChange={(e) => setMessage(e.target.value)} />
        </form>
        <div className="chat-input-send-btn">
          <SendIcon />
        </div>
      </div>
    </div>
  );
}

export default Chatcontainer;
//1:000
