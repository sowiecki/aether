import { HANDSHAKE, RECONNECTED, TEMPERATURE_UPDATE } from '../constants';

const eventHandlers = {
  [HANDSHAKE]() {
    console.log('HANDSHAKE');
  }
};

export default eventHandlers;
