import React, { Component } from "react";

import firebase from "firebase";
import moment from "moment";
import { Toast, toast } from "react-toastify";

import "jquery-timepicker/jquery.timepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./css/reservation.css";
import Datepickers from "./Datepicker";

class Reservation extends Component {
  state = {
    eventTitle: "",
    rooms: "",
    timeStart: "",
    timeEnd: "",
    datePick: "",
  };
  database = firebase.database().ref();
  rootRef = this.database.child("Reservations");

  handleClick = (text) => {
    toast.success(text);
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  handleEventTitleChange = (event) => {
    this.setState({
      eventTitle: event.target.value,
    });
  };

  handleRoomsChange = (event) => {
    this.setState({
      rooms: event.target.value,
    });
  };

  handleTimeStartChange = (event) => {
    this.setState({
      timeStart: event.target.value,
    });
  };

  handleTimeEndChange = (event) => {
    this.setState({
      timeEnd: event.target.value,
    });
  };

  handleDateChange = (event) => {
    this.setState({
      datePick: Date(event.target.value),
    });
  };

  reserve = () => {
    let email = firebase.auth().currentUser.email;
    let rooms = document.getElementById("rooms").value;
    let start = document.getElementById("timeStart").value;
    let end = document.getElementById("timeEnd").value;
    let datee = document.getElementById("datePick").value;
    let eventTitle = document.getElementById("eventTitle").value;

    let date = moment(datee).format("MMM Do YYYY");
    let dateSubmitted = moment().format("LL");
    let [h, m] = start.split(":");
    let timeStart =
      h >= 12
        ? (h % 12) + 12 * (h % 12 === 0) + ":" + m + " PM"
        : (h % 12) + 12 * (h % 12 === 0) + ":" + m + " AM";

    let [a, b] = end.split(":");
    let timeEnd =
      a >= 12
        ? (a % 12) + 12 * (a % 12 === 0) + ":" + b + " PM"
        : (a % 12) + 12 * (a % 12 === 0) + ":" + b + " AM";

    this.saveReservation(
      email,
      rooms,
      timeStart,
      timeEnd,
      date,
      eventTitle,
      dateSubmitted
    );
    this.handleClick("Reservation Saved !");
  };

  isAddDisabled = () => {
    if (
      this.state.eventTitle.length <= 0 ||
      this.state.timeStart.length <= 0 ||
      this.state.timeEnd.length <= 0 ||
      this.state.rooms.length <= 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  saveReservation = (
    email,
    rooms,
    timeStart,
    timeEnd,
    date,
    eventTitle,
    dateSubmitted
  ) => {
    let reservation = this.rootRef.push();
    reservation.set({
      email: email,
      facility: rooms,
      timeStart: timeStart,
      timeEnd: timeEnd,
      date: date,
      eventTitle: eventTitle,
      dateSubmitted: dateSubmitted,
    });
  };

  render() {
    return (
      <div className="jumbotron">
        <h1>Reserve Now!</h1>
        <div className="container">
          <div className="formReserve">
            <div className="form-group">
              <label className="lead">Event</label>
              <input
                className="form-control"
                type="text"
                name="eventTitle"
                id="eventTitle"
                value={this.state.eventTitle}
                onChange={this.handleEventTitleChange}
                required
              />
              <label className="lead">Time Start</label>
              <input
                type="time"
                className="timePicker"
                name="timeStart"
                id="timeStart"
                value={this.state.timeStart}
                onChange={this.handleTimeStartChange}
                required
              />
              <label className="lead">Time End</label>
              <input
                className="timePicker"
                type="time"
                name="timeEnd"
                id="timeEnd"
                value={this.state.timeEnd}
                onChange={this.handleTimeEndChange}
                required
              />
              <Datepickers
                id="datePick"
                value={this.state.rooms}
                onChange={this.handleRoomsChange}
              />
              <label className="lead">Rooms</label>
              <select
                className="custom-select"
                id="rooms"
                value={this.state.rooms}
                onChange={this.handleRoomsChange}
              >
                <option defaultValue>Choose...</option>
                <option value="Room 1">Room 1</option>
                <option value="Room 2">Room 2</option>
                <option value="Room 3">Room 3</option>
                <option value="Room 4">Room 4</option>
                <option value="Room 5">Room 5</option>
              </select>
              <button
                className="btn btn2"
                onClick={this.reserve}
                disabled={this.isAddDisabled()}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Reservation;
