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
    loadMap(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyAO8w8urB3r0vivj2XtKCyRIuF15TFLWCA&callback=initMap"
    );
  }

  /* Init map on script load */
  initMap() {
    var self = this;

    var viewMap = document.getElementById("map");
    viewMap.style.height = window.innerHeight + "px";
    var map = new window.google.maps.Map(viewMap, {
      center: {lat: 3.885441, lng: 11.514515},
      zoom: 14,
      mapTypeControl: false
    });
  }
  render()
}

export default App;

/* Load Google Maps */
function loadMap(src) {
  var reference = window.document.getElementsByTagName("script")[0];
  var script = window.document.createElement("script");
  script.src = src;
  script.async = true;
  script.onerror = function() {
    document.write("Google Maps can not be loaded");
  };
  reference.parentNode.insertBefore(script, reference);
}

