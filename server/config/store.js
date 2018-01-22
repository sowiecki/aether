const { createStore, applyMiddleware, combineReducers } = require('redux');

const reducers = require('ducks');
const api = require('../middleware/api');

const rootReducer = combineReducers(reducers);

const configureStore = initialState => {
  const createStoreWithMiddleware = applyMiddleware(api)(createStore);

  return createStoreWithMiddleware(rootReducer, initialState);
};

const store = configureStore();

module.exports = store;
