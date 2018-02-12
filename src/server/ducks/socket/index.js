import { handleActions, createAction } from 'redux-actions';

import socketController from 'controllers/socket';

const defaultState = {
  client: null
};

const EMIT_CLIENT_CONNECTION = 'EMIT_CLIENT_CONNECTION';
const EMIT_CLIENT_DISCONNECTION = 'EMIT_CLIENT_DISCONNECTION';

export const emitSocketInit = () => (dispatch) => socketController.open(dispatch);

export const emitClientConnection = createAction(EMIT_CLIENT_CONNECTION, (client) => ({
  client
}));

export const emitClientDisconnection = createAction(EMIT_CLIENT_DISCONNECTION);

const socketReducer = handleActions(
  {
    [EMIT_CLIENT_CONNECTION]: (state, client) => ({
      ...state,
      client
    }),

    [EMIT_CLIENT_DISCONNECTION]: (state) => ({
      ...state,
      client: defaultState.client
    })
  },
  defaultState
);

export default socketReducer;
