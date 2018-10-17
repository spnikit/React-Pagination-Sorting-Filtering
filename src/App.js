import React, { Component } from "react";
import "./App.css";

import Navbar from "./components/navbar";
import Movies from "./components/movies";
import CounterList from "./components/counterList";

class App extends Component {
  state = {
    counters: [
      { id: 0, value: 0 },
      { id: 1, value: 0 },
      { id: 2, value: 0 },
      { id: 3, value: 0 }
    ]
  };

  handleDelete = id => {
    const counters = this.state.counters.filter(elem => elem.id !== id);
    this.setState({ counters });
  };

  handleReset = () => {
    const counters = this.state.counters.map(c => {
      c.value = 0;
      return c;
    });
    this.setState({ counters });
  };

  handleIncrement = id => {
    const counters = this.state.counters.map(c => {
      if (id === c.id) {
        c.disabled = false;
        c.value++;
        return c;
      }

      return c;
    });

    this.setState({ counters });
  };

  handleDecrement = id => {
    const counters = this.state.counters.map(c => {
      if (c.id === id && c.value > 0) {
        c.value--;
        if (c.value === 0) {
          c.disabled = true;
        }
        return c;
      }

      return c;
    });

    this.setState({ counters });
  };

  render() {
    return (
      <React.Fragment>
        <Navbar
          countersLength={this.state.counters.filter(c => c.value > 0).length}
        />
        <main className="container">
          <CounterList
            counters={this.state.counters}
            onDelete={this.handleDelete}
            onReset={this.handleReset}
            onIncrement={this.handleIncrement}
            onDecrement={this.handleDecrement}
          />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
