import React, { Component } from "react";
import Room1 from "./pics/room1.jpg";
import Room2 from "./pics/room2.jpg";
import Room3 from "./pics/room3.jpg";
import Room4 from "./pics/room4.jpg";
import Room5 from "./pics/room5.jpg";

class Facility extends Component {
  state = {};
  render() {
    return (
      <div>
        <main>
          <h1>Room 1</h1>
          <img src={Room1} alt="" className="facility" />
          <h1>Room 2</h1>
          <img src={Room2} alt="" className="facility" />
          <h1>Room 3</h1>
          <img src={Room3} alt="" className="facility" />
          <h1>Room 4</h1>
          <img src={Room4} alt="" className="facility" />
          <h1>Room 5</h1>
          <img src={Room5} alt="" className="facility" />
        </main>
      </div>
    );
  }
}

export default Facility;
