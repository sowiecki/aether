import WebSocket from 'ws';

import { WEB_SOCKET_PORT } from 'config';
import { HANDSHAKE, RECONNECTED } from 'constants';
import { EMIT_SOCKET_CONNECTION_UPDATE } from 'ducks/socket/types';
import { logger } from 'utils';

const wss = new WebSocket.Server({ port: WEB_SOCKET_PORT });

/**
 * Host setup for web application WebSocket server.
 */
const socketController = {
  forward(store) {
    logger.log(store.getState()); // TODO forward whole state?
  },

  /**
   * Sets up and initializes socket connection with client.
   * @params{string} event Event constant for initial communication with client.
   * @returns {undefined}
   */
  open(store, dispatch) {
    socketController.unsubscribe = store.subscribe(() => socketController.forward(store));

    wss.on('connection', (client) => {
      socketController.send(client, HANDSHAKE);

      client.on('message', (data) => {
        const message = JSON.parse(data);

        socketController.handle(client, dispatch, message);
      });

      client.on('close', () => {
        dispatch({
          type: EMIT_SOCKET_CONNECTION_UPDATE,
          payload: { client: null, connected: false }
        });

        socketController.unsubscribe();
      });
    });
  },

  /**
   * WebSocket protocol for governing all outgoing socket communications.
   * @param {string} event Event constant that determines handling server-side.
   *  Sometimes passed to client.
   * @param {object} payload Payload to send to client.
   * @param {ws | undefined} client WebSocket object associated with specific targetted client.
   * @returns {undefined}
   */
  handle(client, dispatch, { event }) {
    const handlers = {
      [HANDSHAKE]() {
        dispatch({ type: EMIT_SOCKET_CONNECTION_UPDATE, payload: { client, connected: true } });
      },

      [RECONNECTED]() {
        dispatch({ type: EMIT_SOCKET_CONNECTION_UPDATE, payload: { client, connected: true } });
      }
    };

    if (typeof handlers[event] === 'function') {
      return handlers[event]();
    }

    socketController.errorNoHandler(event);
  },

  send(client, event, payload = {}) {
    if (client.readyState === 1) {
      client.send(JSON.stringify({ event, payload }));
    } else {
      socketController.errorNotReady(event, client);
    }
  },

  getClient() {
    return store.getState().socketReducer.client;
  },

  errorNoHandler(event) {
    logger.warn(`No socketController handler for ${event}!`);
  },

  errorNotReady(event, client) {
    logger.warn(`Event ${event} not sent, client not ready!`, client);
  }
};

export default socketController;
