/* eslint no-shadow:0, no-use-before-define:0 */
/* globals WebSocket, setInterval, clearInterval */
import eventHandlers from './event-handlers';

import { HANDSHAKE, RECONNECTED, ERROR_MESSAGES } from '../constants';
import { WEBSOCKET_PORT, WEBSOCKET_PROTOCOL, WEBSOCKET_RECONNECT_INTERVAL } from '../config';
import { EMIT_SOCKET_ERROR } from '../ducks/socket/types';

// TODO maybe store this in Redux state
let webSocket;
let interval;

const WEBSOCKET_URI = `ws://${window.location.hostname}:${WEBSOCKET_PORT}`;

const handleSocketOpen = (webSocket, dispatch, payload) => {
  webSocket.send(JSON.stringify({ event: HANDSHAKE, payload }));

  dispatch({ type: EMIT_CLEAR_CONNECTION_ERRORS });
};

const handleSocketReconnected = (webSocket, dispatch, payload) => {
  webSocket.send(JSON.stringify({ event: RECONNECTED, payload }));

  dispatch({ type: EMIT_CLEAR_CONNECTION_ERRORS });
  clearInterval(interval);

  webSocket.onclose = () => handleSocketClose(dispatch, payload);
};

const socketReinitialize = (dispatch, payload) => {
  webSocket = new WebSocket(WEBSOCKET_URI, WEBSOCKET_PROTOCOL);

  webSocket.onopen = () => handleSocketReconnected(webSocket, dispatch, payload);
  webSocket.onmessage = () => eventHandlers(dispatch);
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
  webSocket.onmessage = () => eventHandlers(dispatch);
  webSocket.onclose = () => handleSocketClose(dispatch);

  return { type };
};

export const send = (event, payload) => webSocket.send(JSON.stringify({ event, payload }));

export default socketInitialize;
