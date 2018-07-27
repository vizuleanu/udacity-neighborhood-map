import React from "react";

class List extends React.Component {

  render() {
    return (
      <li
        className="listSearch"
        role="button"
        tabIndex="0"
        onKeyPress={this.props.infoWindowOpen.bind(this, this.props.data.marker)}
        onClick={this.props.infoWindowOpen.bind(this, this.props.data.marker)}
      >
        {this.props.data.name}
      </li>
    );
  }
}

export default List;