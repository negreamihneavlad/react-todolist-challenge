import update from "immutability-helper";
import { findIndex } from "lodash-es";

import {
  GET_TODOS,
  CREATE_TODO,
  DELETE_TODO,
  UPDATE_TODO,
  SHOW_ERROR,
  RESTORE_TODOS
} from "../actions/types";

// Initial state
const initialState = {
  todos: [],
  error: null
};

const ListReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TODOS:
      return update(state, {
        $merge: {
          todos: action.todos,
          todosBackup: action.todos
        }
      });

    case CREATE_TODO:
      return update(state, {
        todos: {
          $push: [action.todo]
        },
        $merge: {
          todosBackup: state.todos,
          error: null
        }
      });

    case UPDATE_TODO:
      const todoIndex = findIndex(state.todos, { id: action.todo.id });

      return update(state, {
        todos: {
          [todoIndex]: { $merge: action.todo }
        },
        $merge: {
          todosBackup: state.todos,
          error: null
        }
      });

    case DELETE_TODO: {
      const todoIndex = findIndex(state.todos, { id: action.todoId });
      return update(state, {
        todos: { $splice: [[todoIndex, 1]] },
        $merge: { todosBackup: state.todos, error: null }
      });
    }

    case RESTORE_TODOS:
      return update(state, {
        $merge: {
          todos: state.todosBackup
        }
      });

    case SHOW_ERROR:
      return update(state, {
        $merge: {
          error: action.error
        }
      });

    default:
      return state;
  }
};

export default ListReducer;
