import store from '../config/store';
import { emitSocketConnectionUpdate } from '../ducks/socket';
import { HANDSHAKE, MESSAGE, RECONNECTED, TEMPERATURE_UPDATE } from '../constants';
import { logger } from '../utils';

const eventHandlers = {
  [HANDSHAKE](x) {
    logger.log(HANDSHAKE, x);
    store.dispatch(emitSocketConnectionUpdate());
  },

  [MESSAGE](x) {
    logger.log(MESSAGE, x);
  },

  [RECONNECTED](x) {
    logger.log(RECONNECTED, x);
  }
};

const handleEvent = (dispatch, message) => {
  const { event, payload } = JSON.parse(message.data);

  eventHandlers[event](payload);
};

export default handleEvent;
