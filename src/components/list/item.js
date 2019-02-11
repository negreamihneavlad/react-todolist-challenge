import React, { Component } from "react";

import "./index.css";
import Button from "../button";
import Input from "../input";

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      itemValue: props.todo.content
    };
  }

  enableEditMode = () => {
    this.setState({ editMode: true });
  };

  disableEditMode = () => {
    this.setState({ editMode: false });
  };

  submitUpdate = value => {
    const { itemValue } = this.state;
    const { todo, changeTodo } = this.props;

    changeTodo({ id: todo.id, content: itemValue });
    this.disableEditMode();
  };

  render() {
    const { todo, removeTodo } = this.props;
    const { itemValue, editMode } = this.state;

    return (
      <tr>
        <td>
          {!editMode ? (
            todo.content
          ) : (
            <Input
              name="item"
              placeholder={todo.content}
              value={itemValue}
              onChange={value => this.setState({ itemValue: value })}
            />
          )}
        </td>
        <td>
          {!editMode ? (
            <Button type="edit" onClick={this.enableEditMode}>
              Edit
            </Button>
          ) : (
            <Button type="submit" onClick={this.submitUpdate}>
              Save
            </Button>
          )}

          <Button type="delete" onClick={() => removeTodo(todo.id)}>
            Delete
          </Button>
        </td>
      </tr>
    );
  }
}

export default Item;
