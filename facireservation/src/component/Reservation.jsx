import React, { Component, useState } from "react";

import firebase from "firebase";
import moment from "moment";
import { Toast, toast } from "react-toastify";

import "jquery-timepicker/jquery.timepicker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./css/reservation.css";

class Reservation extends Component {
  state = {
    // eventTitle: "",
    // rooms: "",
    // timeStart: "",
    // timeEnd: "",
    // datePick: ""
  };
  database = firebase.database().ref();
  rootRef = this.database.child("Reservations");

  handleClick = text => {
    toast.success(text);
    setTimeout(() => {
      window.location.reload();
    }, 5000);
  };

  // handleEventTitleChange = event => {
  //   this.setState({
  //     eventTitle: event.target.value
  //   });
  // };

  // handleRoomsChange = event => {
  //   this.setState({
  //     rooms: event.target.value
  //   });
  // };

  // handleTimeStartChange = event => {
  //   // let [h, m] = event.target.value.split(":");
  //   // let newTimeStart =
  //   //   h >= 12
  //   //     ? (h % 12) + 12 * (h % 12 === 0) + ":" + m + " PM"
  //   //     : (h % 12) + 12 * (h % 12 === 0) + ":" + m + " AM";
  //   let newTimeStart = moment(event.target.value).format("LTS");

  //   this.setState({
  //     timeStart: newTimeStart
  //   });
  // };

  // handleTimeEndChange = event => {
  //   this.setState({
  //     timeEnd: event.target.value
  //   });
  // };

  // handleDateChange = event => {
  //   this.setState({
  //     datePick: Date(event.target.value)
  //   });
  // };

  // handleSubmit = event => {
  //   alert(
  //     `${this.state.eventTitle} ${this.state.rooms} ${this.state.timeStart} ${this.state.timeEnd} ${this.state.datePick}`
  //   );
  // };

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
      dateSubmitted: dateSubmitted
    });
  };

  render() {
    return (
      <div className="jumbotron">
        <h1>Reserve Now!</h1>
        <div className="container">
          <form>
            <div className="formReserve">
              <div className="form-group">
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <input
                      className="form-control"
                      type="text"
                      name="eventTitle"
                      id="eventTitle"
                      value={this.state.eventTitle}
                      onChange={this.handleEventTitleChange}
                      required
                    />
                    <label className="input-group-text">Rooms</label>
                  </div>
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
                  <input
                    type="time"
                    className="timePicker"
                    name="timeStart"
                    id="timeStart"
                    value={this.state.timeStart}
                    onChange={this.handleTimeStartChange}
                    required
                  />
                  <input
                    className="timePicker"
                    type="time"
                    name="timeEnd"
                    id="timeEnd"
                    value={this.state.timeEnd}
                    onChange={this.handleTimeEndChange}
                    required
                  />
                  <input type="date" name="datePick" id="datePick" required />
                  {/* <DatePicker
                    isClearable
                    dateFormat="MMM Do YYYY"
                    id="datePick"
                    minDate={new Date()}
                    // selected={this.selectedDate}
                    // onChange={this.setSelectedDate}
                  /> */}

                  <button type="submit" onClick={this.reserve}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Reservation;
