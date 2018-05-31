import { handleActions, createAction } from 'redux-actions';

import socketController from 'controllers/socket';
import { EMIT_SOCKET_CONNECTION_UPDATE } from './types';

const initialState = {
  client: null
};

export const emitSocketInit = (store) => (dispatch) => socketController.open(store, dispatch);

export const emitClientConnectionUpdate = createAction(
  EMIT_SOCKET_CONNECTION_UPDATE,
  (client, connected) => ({
    client,
    connected
  })
);

const socketReducer = handleActions(
  {
    [EMIT_SOCKET_CONNECTION_UPDATE]: (state, { payload }) => ({
      ...state,
      client: payload.client,
      connected: payload.connected
    })
  },
  initialState
);

export default socketReducer;
