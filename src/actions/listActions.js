import axios from "axios";
import uuid from "uuid";
import {
  UPDATE_TODO,
  DELETE_TODO,
  CREATE_TODO,
  GET_TODOS,
  SHOW_ERROR,
  RESTORE_TODOS
} from "./types";

const getTodos = todos => ({
  type: GET_TODOS,
  todos
});

const createTodo = todo => ({
  type: CREATE_TODO,
  todo
});

const updateTodo = todo => ({
  type: UPDATE_TODO,
  todo
});

const deleteTodo = todoId => ({
  type: DELETE_TODO,
  todoId
});

const showError = error => ({
  type: SHOW_ERROR,
  error
});

const restoreTodos = () => ({
  type: RESTORE_TODOS
});

export const loadTodos = () => dispatch => {
  return axios
    .get("http://localhost:4000/todos")
    .then(response => {
      dispatch(getTodos(response.data));
    })
    .catch(() => {
      dispatch(showError("Error loading todos!"));
    });
};

export const saveTodo = todo => dispatch => {
  const todoWithId = { content: todo.content, id: uuid.v1() };
  dispatch(createTodo(todoWithId));

  return axios
    .post("http://localhost:4000/todos", todoWithId)
    .then(response => response.data)
    .catch(() => {
      dispatch(showError("Error creating todo!"));
      dispatch(restoreTodos());
    });
};

export const changeTodo = todo => dispatch => {
  dispatch(updateTodo(todo));
  return axios
    .put(`http://localhost:4000/todos/${todo.id}`, todo)
    .then(response => response.data)
    .catch(() => {
      dispatch(showError("Error updating todo!"));
      dispatch(restoreTodos());
    });
};

export const removeTodo = todoId => dispatch => {
  dispatch(deleteTodo(todoId));
  return axios
    .delete(`http://localhost:4000/todos/${todoId}`)
    .then(() => {})
    .catch(() => {
      dispatch(showError("Error deleting todo!"));
      dispatch(restoreTodos());
    });
};
