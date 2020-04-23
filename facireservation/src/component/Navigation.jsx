import React, { Component } from "react";

import { NavLink } from "react-router-dom";
import firebase from "firebase";
import "./css/login.css";

class NavBar extends Component {
  state = {};
  signout = () => {
    firebase.auth().signOut();
    alert("Signed out!");
  };
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" exact to="/">
                  NewsFeed
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/facility">
                  Facility
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/reservation">
                  Reservation
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/" onClick={this.signout}>
                  Signout
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default NavBar;
