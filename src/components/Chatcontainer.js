import React, { useState, useEffect } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MoodIcon from "@mui/icons-material/Mood";
import SendIcon from "@mui/icons-material/Send";
import "./Chatcontainer.css";
import Chatmessage from "./Chatmessage";
import Picker from "emoji-picker-react";
import { useParams } from "react-router-dom";
import db from "./firebase";
import firebase from "firebase";


function Chatcontainer({ currentUser }) {
  const [message, setMessage] = useState("");
  const [openEmojiBox, setEpenEmojiBox] = useState(false);
  const [chatUser, setChatUser] = useState({});
  const { emailID } = useParams();
  // console.log(emailID);
  const [chatMessages, setchatMessages] = useState([]);
  useEffect(() => {
    const getUser = async () => {
      const data = await db
        .collection("users")
        .doc(emailID)
        .onSnapshot((snapshot) => {
          setChatUser(snapshot.data());
          // console.log(snapshot.data());
        });
    };
    const getMessages = async () => {
      const data = await db
        .collection("chats")
        .doc(emailID)
        .collection("messages")
        .orderBy("timeStamp", "asc")
        .onSnapshot((snapshot) => {
          let messages = snapshot.docs.map((doc) => doc.data());

          let newMessage = messages.filter(
            (message) =>
              message.senderEmail === (currentUser.email || emailID) ||
              message.receiverEmail === (currentUser.email || emailID)
          );
          setchatMessages(newMessage);
        });
    };
    getUser();
    getMessages();
  }, []);
  
  // useEffect(() => {
  //   chatBox.current.addEventListener("DOMNodeInserted", (event) => {
  //     const { currentTarget: target } = event;
  //     target.scroll({ top: target.scrollHeight, behavior: "smooth" });
  //   });
  // }, [chatMessages]);
  const send = (e) => {
    e.preventDefault();

    if (emailID) {
      let payload = {
        text: message,
        senderEmail: currentUser.email,
        receiverEmail: emailID,
        timeStamp: firebase.firestore.Timestamp.now(),
      };
      // sender
      db.collection("chats")
        .doc(currentUser.email)
        .collection("messages")
        .add(payload);

      // reciever
      db.collection("chats").doc(emailID).collection("messages").add(payload);
      setMessage("");
      db.collection("Friendlist")
        .doc(currentUser.email)
        .collection("list")
        .doc(emailID)
        .set({
          email: chatUser.email,
          fullname: chatUser.fullname,
          photoURL: chatUser.photoURL,
          lastMessage: message,
        });

      db.collection("Friendlist")
        .doc(emailID)
        .collection("list")
        .doc(currentUser.email)
        .set({
          email: currentUser.email,
          fullname: currentUser.fullname,
          photoURL: currentUser.photoURL,
          lastMessage: message,
        });
    }
  };
  return (
    <div className="chat-container">
      <div className="chat-condainer-header">
        <div className="chat-user-info">
          <div className="chat-user-img">
            <img src={chatUser.photoUrl} alt="DP" />
          </div>
          <p>{chatUser.fullname}</p>
        </div>
        <div className="chat-container-header-btn">
          <MoreVertIcon />
        </div>
      </div>
      <div className="chat-display-container">
        {
          chatMessages.map((message) => (
            <Chatmessage
              message={message.text}
              time={message.timeStamp}
              sender={message.senderEmail}
            />
          ))
        }
      </div>
      <div className="chat-input">
        {openEmojiBox && (
          <Picker
            onEmojiClick={(event, emojiObject) =>
              setMessage(message + emojiObject.emoji)
            }
          />
        )}
        <div className="chat-input-btn">
          <MoodIcon onClick={() => setEpenEmojiBox(!openEmojiBox)} />
          <AttachFileIcon />
        </div>
        <form action="">
          <input
            type="text"
            placeholder="Type..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </form>
        <div className="chat-input-send-btn">
          <SendIcon onClick={send} />
        </div>
      </div>
    </div>
  );
}

export default Chatcontainer;
