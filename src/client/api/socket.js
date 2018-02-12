/* eslint no-shadow:0, no-use-before-define:0 */
/* globals WebSocket, setInterval, clearInterval */
import handleEvent from './handle-event';

import { HANDSHAKE, RECONNECTED, ERROR_MESSAGES } from '../constants';
import { WEBSOCKET_PORT, WEBSOCKET_PROTOCOL, WEBSOCKET_RECONNECT_INTERVAL } from '../config';
import { EMIT_SOCKET_ERROR, EMIT_SOCKET_ERRORS_CLEAR } from '../ducks/socket/types';

// TODO maybe store this in Redux state
let webSocket;
let interval;

const WEBSOCKET_URI = `ws://${window.location.hostname}:${WEBSOCKET_PORT}`;

const handleSocketOpen = (webSocket, dispatch, payload) => {
  webSocket.send(JSON.stringify({ event: HANDSHAKE, payload }));

  dispatch({ type: EMIT_SOCKET_ERRORS_CLEAR });
};

const handleSocketReconnected = (webSocket, dispatch, payload) => {
  webSocket.send(JSON.stringify({ event: RECONNECTED, payload }));

  dispatch({ type: EMIT_SOCKET_ERRORS_CLEAR });
  clearInterval(interval);

  webSocket.onclose = () => handleSocketClose(dispatch, payload);
};

const socketReinitialize = (dispatch, payload) => {
  webSocket = new WebSocket(WEBSOCKET_URI, WEBSOCKET_PROTOCOL);

  webSocket.onopen = () => handleSocketReconnected(webSocket, dispatch, payload);
  webSocket.onmessage = (message) => handleEvent(dispatch, message);
};

const handleSocketClose = (dispatch, payload) => {
  interval = setInterval(() => {
    socketReinitialize(dispatch, payload);
  }, WEBSOCKET_RECONNECT_INTERVAL);

  dispatch({
    type: EMIT_SOCKET_ERROR,
    error: ERROR_MESSAGES.SOCKET_CLOSED
  });
};

const socketInitialize = (dispatch, type) => {
  webSocket = new WebSocket(WEBSOCKET_URI, WEBSOCKET_PROTOCOL);

  webSocket.onopen = () => handleSocketOpen(webSocket, dispatch);
  webSocket.onmessage = (message) => handleEvent(dispatch, message);
  webSocket.onclose = () => handleSocketClose(dispatch);

  return { type };
};

export const send = (event, payload) => webSocket.send(JSON.stringify({ event, payload }));

export default socketInitialize;
