import React, { useState } from "react";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
} from "firebase/auth";
import app from "../Firebase/firebase.init";

const GoogleSignIn = () => {
  const [user, setUser] = useState([]);
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
  function HandleGoogleButton() {
    console.log("ggogle");
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setUser(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function handleGithubButton() {
    console.log("git");
  }
  function handleFacebookButton() {
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div>
      <button onClick={HandleGoogleButton}>googleSignIn</button>
      <button onClick={handleGithubButton}>githubSignIn</button>
      <button onClick={handleFacebookButton}>FacebookSignIn</button>
      <h1>{user.displayName}</h1>
    </div>
  );
};

export default GoogleSignIn;
