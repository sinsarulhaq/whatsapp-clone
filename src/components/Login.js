import React from "react";
import { auth, googleProvider } from "./firebase";
import db from "./firebase";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login({ setUser }) {
  const navigate = useNavigate();
  const signInWithGoogle = () => {
    auth
      .signInWithPopup(googleProvider)
      .then((res) => {
        const newUser = {
          fullname: res.user.displayName,
          email: res.user.email,
          photoUrl: res.user.photoURL,
        };
        navigate("/");
        setUser(newUser);
        localStorage.setItem("users", JSON.stringify(newUser));
        db.collection("users").doc(res.user.email).set(newUser);
      })
      .catch((err) => alert(err.message));
  };
  return (
    <div className="login">
      <div className="login-container">
        <img className="login-logo" src="./Whatsapp-logo.png" alt="" />
        <p className="login-name">WhatsApp Web</p>
        <button className="login-btn" onClick={signInWithGoogle}>
          <img src="google-logo.png" alt="google-logo" />
          Login with google
        </button>
      </div>
    </div>
  );
}

export default Login;
