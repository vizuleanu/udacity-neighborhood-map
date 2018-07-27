import React, { Component } from "react";
import List from "./List";

class ListOfLocations extends Component {

  constructor(props) {
    super(props);
    this.state = {
      locations: "",
      query: "",
      suggestions: true
    };

    this.filterLocations = this.filterLocations.bind(this);
  }

  filterLocations(e) {
    this.props.infoWindowClose();
    const {value} = e.target;
    var locations = [];
    this.props.placesAll.forEach(function(location) {
      if (location.name.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
        location.marker.setVisible(true);
        locations.push(location);
      } else {
        location.marker.setVisible(false);
      }
    });

    this.setState({
      locations: locations,
      query: value
    });
  }

  componentWillMount() {
    this.setState({
      locations: this.props.placesAll
    });
  }

  render() {
    var locationList = this.state.locations.map(function(listItem, index) {
      return (
        <List
          key={index}
          infoWindowOpen={this.props.infoWindowOpen.bind(this)}
          data={listItem}
        />
      );
    }, this);

    return (
      <div className="search-area">
        <input
          role="search"
          aria-labelledby="filter"
          id="search-field"
          className="search-input"
          type="text"
          placeholder="Filter"
          value={this.state.query}
          onChange={this.filterLocations}
        />
        <ul className="location-list">
          {this.state.suggestions && locationList}
        </ul>
      </div>
    );
  }
}

export default ListOfLocations;
