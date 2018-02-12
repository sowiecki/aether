import opn from 'opn';
import WebSocket from 'ws';

import { WEB_SOCKET_PORT } from 'config';
import { HANDSHAKE, MESSAGE } from 'constants';
import { EMIT_SOCKET_HANDSHAKE, EMIT_SOCKET_ERROR } from 'ducks/socket/types';
import { logger } from 'utils';

const wss = new WebSocket.Server({ port: WEB_SOCKET_PORT });

/**
 * Host setup for web application WebSocket server.
 */
const socketController = {
  init: () => {
    opn('localhost:3000');
  },

  /**
   * Sets up and initializes socket connection with client.
   * @params{string} event Event constant for initial communication with client.
   * @returns {undefined}
   */
  open(dispatch, payload) {
    wss.on('connection', (client) => {
      socketController.send(HANDSHAKE, payload, client); // Initialize with config

      client.on('message', (data) => {
        const message = JSON.parse(data);

        socketController.handle(message.event, message.payload, client);
      });

      client.on('close', () => {
        dispatch({ type: EMIT_SOCKET_ERROR });
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
  handle(dispatch, event, payload) {
    const handlers = {
      [HANDSHAKE]() {
        dispatch({ type: EMIT_SOCKET_HANDSHAKE });
      },

      [MESSAGE]() {
        const client = socketController.getClient();

        socketController.send(event, payload, client);
      }
    };

    if (typeof handlers[event] === 'function') {
      return handlers[event]();
    }

    socketController.errorNoHandler(event);
  },

  send(event, payload = {}, client) {
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
