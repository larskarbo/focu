// If you enabled Analytics in your project, add the Firebase SDK for Analytics
// import "firebase/analytics";
// Firebase App (the core Firebase SDK) is always required and must be listed first
// import * as firebase from "firebase/app";
import { Box } from "grommet";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Monkey from "./Monkey";
import Spotify from "./Spotify";

// Add the Firebase products that you want to use

// import "firebase/auth";
// import "firebase/firestore";
// import "firebase/functions";
import { useEffect } from "react";

// const firebaseConfig = {
//   apiKey: "AIzaSyASOX8v5kmQfodOGGNhQxrLrEOsj0HL1LI",
//   authDomain: "focusmonkey-936e9.firebaseapp.com",
//   databaseURL: "https://focusmonkey-936e9.firebaseio.com",
//   projectId: "focusmonkey-936e9",
//   storageBucket: "focusmonkey-936e9.appspot.com",
//   messagingSenderId: "941029155285",
//   appId: "1:941029155285:web:d7e8a01d347d4e5ea29d5c",
//   measurementId: "G-5GJTX8N98Y",
// };

// Initialize Firebase
// const app = firebase.initializeApp(firebaseConfig);
// const defaultAnalytics = firebase.analytics();

const App = () => {
  const [spotify, setSpotify] = useState(null);

  useEffect(() => {
    setSpotify(new Spotify());
  }, []);

  return (
    <Box align="center" full style={{ padding: 20 }}>
      <Box width="410px" align="center">
        <>
          <Box width="100%">
            <div
              style={{
                paddingTop: 40,
                paddingBottom: 20,
                color: "white",
                fontSize: 20,
              }}
            >
              Focus<strong>Monkey</strong>.io
            </div>
          </Box>

          {spotify && <Monkey spotify={spotify} />}
        </>
      </Box>
    </Box>
  );
};

const LogOut = ({ spotify }) => {
  spotify.logOut();

  return <div>logged out</div>;
};

export default App;
