import React, { Component } from "react";
import List from "./List";

class ListOfLocations extends Component {

  constructor(props) {
    super(props);
    this.state = {
      places: "",
      query: "",
    };

    this.placesFilter = this.placesFilter.bind(this);
  }

  placesFilter(e) {
    this.props.infoWindowClose();
    const {value} = e.target;
    var places = [];
    this.props.placesAll.forEach(function(place) {
      if (place.name.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
        place.marker.setVisible(true);
        place.push(place);
      } else {
        place.marker.setVisible(false);
      }
    });

    this.setState({
      places: places,
      query: value
    });
  }

  componentWillMount() {
    this.setState({
      places: this.props.placesAll
    });
  }

  render() {
    var placesList = this.state.places.map(function(listItem, index) {
      return (
        <List
          infoWindowOpen={this.props.infoWindowOpen.bind(this)}
          key={index}
          data={listItem}
        />
      );
    }, this);

    return (
      <div className="sites">
        <input
          id="locationSearch"
          type="search"
          role="search"
          placeholder="search"
          aria-labelledby="filter"
          value={this.state.query}
          onChange={this.placesFilter}
        />
        <ul className="placesList">
          {placesList}
        </ul>
      </div>
    );
  }
}

export default ListOfLocations;
