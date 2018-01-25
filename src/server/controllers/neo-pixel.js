import ws281x from 'rpi-ws281x-native';

import { NUM_LEDS } from '../config';
import { HEX_WHITE } from '../constants';

const neoPixelController = {
  pixelData: new Uint32Array(NUM_LEDS), // TODO move to ducks
  init() {
    ws281x.init(NUM_LEDS);

    process.on('SIGINT', () => {
      ws281x.reset();
      process.nextTick(() => process.exit(0));
    });

    const setToWhite = () => HEX_WHITE;
    neoPixelController.setAndRenderPixelData(new Uint32Array(NUM_LEDS).map(setToWhite));

    const t0 = Date.now();
    setInterval(() => {
      const dt = Date.now() - t0;

      ws281x.setBrightness(Math.floor(Math.sin(dt / 1000) * 128 + 128)); // eslint-disable-line
    }, 1000 / 30);
  },

  setAndRenderPixelData(pixelData) {
    for (let i = 0; i < NUM_LEDS; i++) {
      neoPixelController.pixelData[i] = pixelData[i];
    }

    ws281x.render(neoPixelController.pixelData);
  }
};

export default neoPixelController;
