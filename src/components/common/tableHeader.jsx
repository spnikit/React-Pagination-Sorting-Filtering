import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort = path => {
    const sortColumn = { ...this.props.sortColumn };

    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }

    this.props.onSort(sortColumn);
  };

  renderIcon = column => {
    const { sortColumn } = this.props;

    if (column.path !== sortColumn.path) {
      return null;
    }

    if (sortColumn.order === "asc") {
      return <i className="fa fa-sort-asc" />;
    }

    return <i className="fa fa-sort-desc" />;
  };

  render() {
    const styleClass = {
      cursor: "pointer"
    };

    return (
      <thead>
        <tr>
          {this.props.columns.map(column => (
            <th
              key={column.label || column.key}
              style={styleClass}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label}
              {this.renderIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
