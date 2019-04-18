import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import * as reducers from './reducers';

export function initializeStore(initialState = {}) {
  const store = createStore(
    combineReducers(reducers),
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware)),
  );

  return store;
}
