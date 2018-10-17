import React, { Component } from "react";

class Pagination extends Component {
  render() {
    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a
              onClick={() => this.props.onPageChange(1)}
              className="page-link"
              href="#"
            >
              1
            </a>
          </li>
          <li className="page-item">
            <a
              onClick={() => this.props.onPageChange(2)}
              className="page-link"
              href="#"
            >
              2
            </a>
          </li>
          <li className="page-item">
            <a
              onClick={() => this.props.onPageChange(3)}
              className="page-link"
              href="#"
            >
              3
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Pagination;
