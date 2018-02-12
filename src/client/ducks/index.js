import { combineReducers } from 'redux';

import metaReducer from './meta';

export * from './socket';

export default combineReducers({
  metaReducer
});
