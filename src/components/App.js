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

    window.google.maps.event.addDomListener(window, "resize", function() {
      var center = map.getCenter();
      window.google.maps.event.trigger(map, "resize");
      self.state.map.setCenter(center);
    });

    var InfoWindow = new window.google.maps.InfoWindow({});

    window.google.maps.event.addListener(InfoWindow, "closeclick", function() {
      self.closeInfoWindow();
    });

    this.setState({
      map: map,
      infowindow: InfoWindow
    });

    window.google.maps.event.addListener(map, "click", function() {
      self.closeInfoWindow();
    });
  }

  openInfoWindow(marker) {
    this.closeInfoWindow();
    this.state.infowindow.open(this.state.map, marker);
    marker.setAnimation(window.google.maps.Animation.BOUNCE);
    this.setState({
      prevmarker: marker
    }); 
    this.state.map.setCenter(marker.getPosition());
    this.state.map.panBy(0, -200);
    this.getMarkerInfo(marker);
    this.state.infowindow.setContent("Loading Data...");
  }

  render() {
    return <div id="map" />
  }

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

