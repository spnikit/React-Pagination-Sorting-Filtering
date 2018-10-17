import React, { Component } from "react";

import Counter from "./counter";

class CounterList extends Component {
  render() {
    const {
      onReset,
      counters,
      onDelete,
      onIncrement,
      onDecrement
    } = this.props;
    return (
      <div>
        <button onClick={onReset} className="btn-primary btn-sm m-2">
          Reset
        </button>
        <div className="container">
          {counters.map(counter => (
            <Counter
              key={counter.id}
              {...counter}
              onDelete={onDelete}
              onIncrement={onIncrement}
              onDecrement={onDecrement}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default CounterList;
