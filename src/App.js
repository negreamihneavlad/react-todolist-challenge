import React, { Component } from "react";
import { connect } from "react-redux";

import "./App.css";

import {
  loadTodos,
  saveTodo,
  changeTodo,
  removeTodo
} from "./actions/listActions";

import List from "./components/list";
import Input from "./components/input";
import Button from "./components/button";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTodo: ""
    };
  }

  componentDidMount() {
    this.props.loadTodos();
  }

  saveTodo = () => {
    const { saveTodo } = this.props;
    const { newTodo } = this.state;

    saveTodo({ content: newTodo }).then(() => this.setState({ newTodo: "" }));
  };

  changeTodo = todo => {
    const { changeTodo } = this.props;

    changeTodo(todo);
  };

  removeTodo = todoId => {
    const { removeTodo } = this.props;

    removeTodo(todoId);
  };

  render() {
    const { todos, error } = this.props;
    const { newTodo } = this.state;

    return (
      <div className="container">
        <h1>Todo List</h1>

        <div className="add-item-to-list">
          <Input
            name="item"
            placeholder="New Item..."
            value={newTodo}
            onChange={value => this.setState({ newTodo: value })}
          />
          <Button onClick={this.saveTodo} type="add">
            Add
          </Button>
        </div>

        {error && <div className="error"> {error} </div>}

        <List
          todos={todos}
          changeTodo={this.changeTodo}
          removeTodo={this.removeTodo}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  todos: state.list.todos,
  error: state.list.error
});

const mapDispatchToProps = { loadTodos, saveTodo, changeTodo, removeTodo };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
