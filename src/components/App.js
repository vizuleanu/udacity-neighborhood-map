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

    

    var locations = [];
    this.state.locations.forEach(function(location) {
      var titleName = location.name + " - " + location.type;
      var marker = new window.google.maps.Marker({
        position: new window.google.maps.LatLng(
          location.latitude,
          location.longitude
        ),
        animation: window.google.maps.Animation.DROP,
        map: map
      });

      marker.addListener("click", function() {
        self.openInfoWindow(marker);
      });

      location.titleName = titleName;
      location.marker = marker;
      location.display = true;
      locations.push(location);
    });
    this.setState({
      locations: locations
    });
  }

  getMarkerInfo(marker) {
    var self = this;

    // Add the api keys for foursquare
    var clientId = "NUZ40RTJWGUMHKDDWRJBWYM5ZETQKDVHHOQ42AQ03FIOFOJG";
    var clientSecret = "UY1AJFUZPUTVQFOAZDKGKWLAMS15HKNISQ3LLV24FZ115YH2";

    // Build the api endpoint
    var url =
      "https://api.foursquare.com/v2/venues/search?client_id=" +
      clientId +
      "&client_secret=" +
      clientSecret +
      "&v=20130815&ll=" +
      marker.getPosition().lat() +
      "," +
      marker.getPosition().lng() +
      "&limit=1";
    fetch(url)
      .then(function(response) {
        if (response.status !== 200) {
          self.state.infowindow.setContent("Sorry data can't be loaded");
          return;
        }

        response.json().then(function(data) {
          console.log(data);

          var location_data = data.response.venues[0];
          var place = `<h3>${location_data.name}</h3>`;
          var street = `<p>${location_data.location.formattedAddress[0]}</p>`;
          var contact = "";
          if (location_data.contact.phone)
            contact = `<p><small>${location_data.contact.phone}</small></p>`;
          var checkinsCount =
            "<b>Number of CheckIn: </b>" +
            location_data.stats.checkinsCount +
            "<br>";
          var readMore =
            '<a href="https://foursquare.com/v/' +
            location_data.id +
            '" target="_blank">Read More on <b>Foursquare Website</b></a>';
          self.state.infowindow.setContent(
            place + street + contact + checkinsCount + readMore
          );
        });
      })
      .catch(function(err) {
        self.state.infowindow.setContent("Can not lead data");
      });
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

