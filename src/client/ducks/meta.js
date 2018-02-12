import { handleActions } from 'redux-actions';

import socketInitialize from '../api/socket';
import { EMIT_SOCKET_INIT, EMIT_SOCKET_HANDSHAKE } from './socket/types';

export const emitSocketInit = () => (dispatch) => socketInitialize(dispatch, EMIT_SOCKET_INIT);

const initialState = {
  connected: false,
  temperature: 60
};

// TODO make meta
const reducer = handleActions(
  {
    [EMIT_SOCKET_HANDSHAKE]: (state) => ({
      ...state,
      connected: true
    })
  },
  initialState
);

export default reducer;
