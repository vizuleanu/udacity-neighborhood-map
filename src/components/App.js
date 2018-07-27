import React, { Component } from "react";

class App extends Component {
  /* Constructor function*/
  constructor(props) {
    super(props);
    this.state = {
      locations: require("./locations.json"),
      map: "",
      infowindow: "",
      previewmarker: ""
    };

    this.initMap = this.initMap.bind(this);
    this.openInfoWindow = this.openInfoWindow.bind(this);
    this.closeInfoWindow = this.closeInfoWindow.bind(this);
  }
  render()
}

export default App;

