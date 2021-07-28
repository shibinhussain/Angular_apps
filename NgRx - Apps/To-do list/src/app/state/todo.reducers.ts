import { Todo } from '../app.component';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { TodoActionTypes, TodoActions } from './todo.actions';

export interface TodoState extends EntityState<Todo> {
  loading: boolean;
  error: string;
}

export const todoAdapter: EntityAdapter<Todo> = createEntityAdapter<Todo>();

const todoDefaultState: TodoState = {
  ids: [],
  entities: {},
  loading: false,
  error: '',
};

export const initialState: TodoState =
  todoAdapter.getInitialState(todoDefaultState);

export function todoReducer(
  state: TodoState = initialState,
  action: TodoActions
): TodoState {
  switch (action.type) {
    case TodoActionTypes.GET_TODO: {
      return { ...state, loading: true };
    }
    case TodoActionTypes.GET_TODO_SUCCESS: {
      return todoAdapter.setAll(action.payload.todos, {
        ...state,
        loading: false,
      });
    }
    case TodoActionTypes.GET_TODO_FAILURE: {
      return { ...state, loading: false, error: 'Something went wrong' };
    }
    case TodoActionTypes.ADD_TODO: {
      return { ...state, loading: true };
    }
    case TodoActionTypes.ADD_TODO_SUCCESS: {
      return { ...state, loading: false };
    }
    case TodoActionTypes.ADD_TODO_FAILURE: {
      return { ...state, loading: false, error: 'Todo failure occured' };
    }

    case TodoActionTypes.UPDATE_TODO: {
      return { ...state, loading: true };
    }
    case TodoActionTypes.UPDATE_TODO_SUCCESS: {
      return { ...state, loading: false };
    }
    case TodoActionTypes.UPDATE_TODO_FAILURE: {
      return { ...state, loading: false, error: 'Update failure occured' };
    }
    case TodoActionTypes.DELETE_TODO: {
      return { ...state, loading: true };
    }
    case TodoActionTypes.DELETE_TODO_SUCCESS: {
      return { ...state, loading: false };
    }
    case TodoActionTypes.DELETE_TODO_FAILURE: {
      return { ...state, loading: false, error: 'Delete failure occures' };
    }
    default:
      return state;
  }
}
