import { handleActions } from 'redux-actions';

import socket from './socket';

const initialState = {
  ...socket.initialState,
  temperature: 0 // TODO move to stats ducks
};

// TODO make meta
const reducer = handleActions(
  {
    ...socket.handlers
  },
  initialState
);

export default reducer;
