import { createAction } from 'redux-actions';

import socketInitialize from '../../api/socket';
import { EMIT_SOCKET_INIT, EMIT_SOCKET_CONNECTION_UPDATE, EMIT_SOCKET_ERRORS_CLEAR } from './types';

export const emitSocketInit = () => (dispatch) => socketInitialize(dispatch, EMIT_SOCKET_INIT);
export const emitSocketConnectionUpdate = createAction(
  EMIT_SOCKET_CONNECTION_UPDATE,
  (connected) => ({ connected })
);

const initialState = {
  connected: false
};

const handlers = {
  [EMIT_SOCKET_CONNECTION_UPDATE]: (state) => ({
    ...state,
    connected: true
  }),

  [EMIT_SOCKET_ERRORS_CLEAR]: (state) => ({
    ...state,
    errors: []
  })
};

export default { handlers, initialState };
