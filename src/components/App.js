import React, { Component } from "react";
import ListOfLocations from "./ListOfLocations";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      placesAll: require("./locations.json"),
      map: "",
      previewMarker: "",
      infowindow: "",
    };

    this.initMap = this.initMap.bind(this);
    this.infoWindowOpen = this.infoWindowOpen.bind(this);
    this.infoWindowClose = this.infoWindowClose.bind(this);
  }

  componentDidMount() {
    // bind initMap() function to the global scope
    window.initMap = this.initMap;
    loadGoogleMap(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyAO8w8urB3r0vivj2XtKCyRIuF15TFLWCA&callback=initMap"
    );
  }

  initMap() {
    var self = this;

    var viewMap = document.getElementById("map");
    viewMap.style.height = window.innerHeight + "px";

    var map = new window.google.maps.Map(viewMap, {
      center: { lat: 45.796992, lng: 24.151005 },
      mapTypeControl: false,
      zoom: 15
    });

    var InfoWindow = new window.google.maps.InfoWindow({});

    window.google.maps.event.addListener(InfoWindow, "closeclick", function() {
      self.infoWindowClose();
    });

    this.setState({
      map: map,
      infowindow: InfoWindow
    });

    // resise map for different devices
    window.google.maps.event.addDomListener(window, "resize", function() {
      var centerMap = map.getCenter();
      window.google.maps.event.trigger(map, "resize");
      self.state.map.setCenter(centerMap);
    });

    window.google.maps.event.addListener(map, "click", function() {
      self.infoWindowClose();
    });

    var placesAll = [];
    this.state.placesAll.forEach(function(location) {
      var name = location.name + " - " + location.type;
      var marker = new window.google.maps.Marker({
        position: new window.google.maps.LatLng(
          location.latitude,
          location.longitude
        ),
        map: map,
        animation: window.google.maps.Animation.DROP,
      });

      marker.addListener("click", function() {
        self.infoWindowOpen(marker);
      });

      location.display = true;
      location.name = name;
      location.marker = marker;
      placesAll.push(location);
    });

    this.setState({
      placesAll: placesAll
    });
  }

  infoWindowOpen(marker) {
    this.infoWindowClose();
    this.state.infowindow.open(this.state.map, marker);
    marker.setAnimation(window.google.maps.Animation.BOUNCE);
    this.setState({
      previewMarker: marker
    });
    this.state.map.panBy(0, -50);
    this.getMarker(marker);
    this.state.map.setCenter(marker.getPosition());
  }


  getMarker(marker) {
    var self = this;

    // Foursquare API key and secret
    var clientId = "NUZ40RTJWGUMHKDDWRJBWYM5ZETQKDVHHOQ42AQ03FIOFOJG";
    var clientSecret = "UY1AJFUZPUTVQFOAZDKGKWLAMS15HKNISQ3LLV24FZ115YH2";

    var url =
      "https://api.foursquare.com/v2/venues/search?client_id=" + clientId +
      "&client_secret=" + clientSecret + "&v=20180725&ll=" +
      marker.getPosition().lat() + "," + marker.getPosition().lng() + "&limit=1";

    fetch(url)
      .then(function(response) {
        if (response.status !== 200) {
          self.state.infowindow.setContent("Unable to load");
          return;
        }

        response.json().then(function(data) {
          console.log(data);//objects response from foursquare

          var locationInfo = data.response.venues[0];
          var site = `<h3>${locationInfo.name}</h3>`
          var address = `<p>${locationInfo.location.formattedAddress[0]}</p>`;
          var moreInfo ='<a href="https://foursquare.com/v/' + locationInfo.id + 
          '" target="_blank">See additional details on <em>Foursquare<em></a>';
          self.state.infowindow.setContent(
            site + address + moreInfo
          );
        });
      })
      .catch(function(err) {
        self.state.infowindow.setContent("Unable to load");
      });
  }

  infoWindowClose() {
    if (this.state.previewMarker) {
      this.state.previewMarker.setAnimation(null);
    }
    this.setState({
      previewarker: ""
    });
    this.state.infowindow.close();
  }

  render() {
    return (
      <div>
        <ListOfLocations
          placesAll={this.state.placesAll}
          infoWindowOpen={this.infoWindowOpen}
          infoWindowClose={this.infoWindowClose}
          key="100"
        />
        <div id="map" />
      </div>
    );
  }
}

export default App;
//load GoogleMap on page
function loadGoogleMap(src) {
  var ref = window.document.getElementsByTagName("script")[0];
  var script = window.document.createElement("script");
  script.async = true;
  script.src = src;
  script.onerror = function() {
    document.write("Can not load GoogleMaps");
  };
  ref.parentNode.insertBefore(script, ref);
}
