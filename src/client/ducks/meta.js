import { handleActions } from 'redux-actions';

import { EMIT_SOCKET_HANDSHAKE } from '../constants';

const defaultState = {};

// TODO make meta
const reducer = handleActions(
  {
    [EMIT_SOCKET_HANDSHAKE]: (state) => ({
      state
    })
  },
  defaultState
);

export default reducer;
