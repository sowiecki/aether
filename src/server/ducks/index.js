import { combineReducers } from 'redux';

import lcdReducer from './lcd';
import neoPixelReducer from './neo-pixel';
import webSocketReducer from './web-socket';

export default combineReducers({
  lcdReducer,
  neoPixelReducer,
  webSocketReducer
});
