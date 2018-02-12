import { HANDSHAKE, MESSAGE, RECONNECTED, TEMPERATURE_UPDATE } from '../constants';
import { logger } from '../utils'

const eventHandlers = {
  [HANDSHAKE](x) {
    console.log(HANDSHAKE, x);
  },

  [MESSAGE](x) {
    console.log(MESSAGE, x);
  },

  [RECONNECTED](x) {
    console.log(RECONNECTED, x);
  }
};

const handleEvent = (dispatch, message) => {
  const { event, payload } = JSON.parse(message.data);

  eventHandlers[event](payload);
};

export default handleEvent;
