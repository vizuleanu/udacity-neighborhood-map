import React from "react";

class SearchList extends React.Component {

  render() {
    return (
      <li
        role="button"
        tabIndex="0"
        className="searchList"
        onClick={this.props.openInfoWindow.bind(this, this.props.data.marker)}
        onKeyPress={this.props.openInfoWindow.bind(this, this.props.data.marker)}
      >
        {this.props.data.name}
      </li>
    );
  }
}

export default SearchList;