import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/login.css";

class Login extends Component {
  render() {
    return (
      <div className="jumbotron">
        <h1>Sign Up</h1>
        <div className="form-group1">
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="First Name"
            className="form-control"
          />
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Last Name"
            className="form-control"
          />
        </div>
        <div className="form-group2">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            className="form-control"
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="form-control"
          />
          <input
            type="newPassword"
            name="newPassword"
            id="newPassword"
            placeholder="New Password"
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </div>
    );
  }
}

export default Login;
