import React, { Component } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import "./css/login.css";
import SignUp from "./SignUpForm";

import firebase from "firebase";
import { firebaseConfig } from "./Config";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import Heading from "./Heading";

firebase.initializeApp(firebaseConfig);

class Login extends Component {
  state = { isSignedIn: false };
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  };
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user });
    });
  };
  render() {
    return (
      <div>
        {this.state.isSignedIn ? (
          <span>
            <div>Signed In</div>
            <button onClick={() => firebase.auth().signOut()}>Sign out</button>
          </span>
        ) : (
          <span>
            <Heading />
            <div className="container">
              <SignUp />
              <StyledFirebaseAuth
                className="jumbotron"
                uiConfig={this.uiConfig}
                firebaseAuth={firebase.auth()}
              />
            </div>
          </span>
        )}
      </div>
    );
  }
}

export default Login;
