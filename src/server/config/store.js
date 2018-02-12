import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import reducers from 'ducks';

const rootReducer = combineReducers(reducers);

const configureStore = (initialState) => {
  const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

  return createStoreWithMiddleware(rootReducer, initialState);
};

const store = configureStore();

export default store;
