const ws281x = require('rpi-ws281x-native');

const { NUM_LEDS } = require('../constants');

const neoPixelController = {
  pixelData: new Uint32Array(NUM_LEDS),
  init: () => {
    ws281x.init(NUM_LEDS);

    process.on('SIGINT', () => {
      ws281x.reset();
      process.nextTick(() => process.exit(0));
    });

    // POC code
    for (let i = 0; i < NUM_LEDS; i++) {
      pixelData[i] = 0xffcc22;
    }

    ws281x.render(pixelData);

    const t0 = Date.now();
    setInterval(() => {
      const dt = Date.now() - t0;

      ws281x.setBrightness(Math.floor(Math.sin(dt / 1000) * 128 + 128)); // eslint-disable-line
    }, 1000 / 30);
  }
};

module.exports = neoPixelController;
