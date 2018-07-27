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

  componentDidMount() {
    // initMap() function for Google Maps to invoke (added to global scope)
    window.initMap = this.initMap;
    // Google Maps script
    loadMapJS(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyAO8w8urB3r0vivj2XtKCyRIuF15TFLWCA&callback=initMap"
    );
  }
  render()
}

export default App;

