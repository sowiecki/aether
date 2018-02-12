import { handleActions } from 'redux-actions';

import { EMIT_SOCKET_HANDSHAKE } from '../constants';

const initialState = {
  temperature: 60
};

// TODO make meta
const reducer = handleActions(
  {
    [EMIT_SOCKET_HANDSHAKE]: (state) => ({
      state
    })
  },
  initialState
);

export default reducer;
