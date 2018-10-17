import React, { Component } from "react";

class Counter extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-1">
          <span className={this.getBadgeClasses()}>
            {this.props.value === 0 ? "Zero" : this.props.value}
          </span>
        </div>
        <div className="col">
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => this.props.onIncrement(this.props.id)}
          >
            +
          </button>
          <button
            onClick={() => this.props.onDecrement(this.props.id)}
            className="btn btn-secondary btn-sm m-2"
            disabled={this.props.value === 0 ? "disabled" : ""}
          >
            -
          </button>
          <button
            onClick={() => this.props.onDelete(this.props.id)}
            className="btn btn-danger btn-sm m-2"
          >
            X
          </button>
        </div>
      </div>
    );
  }

  getBadgeClasses() {
    return `badge m-2 badge-${
      this.props.value % 2 === 0 ? "primary" : "warning"
    }`;
  }
}

export default Counter;
