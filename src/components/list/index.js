import React, { Component } from "react";

import { map } from "lodash-es";

import "./index.css";
import Item from "./item";

class List extends Component {
  render() {
    const { todos, changeTodo, removeTodo } = this.props;

    return (
      <table>
        <thead>
          <tr>
            <th width="66%">Items</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {map(todos, (todo, index) => (
            <Item
              key={index}
              todo={todo}
              changeTodo={changeTodo}
              removeTodo={removeTodo}
            />
          ))}
        </tbody>
      </table>
    );
  }
}

export default List;
