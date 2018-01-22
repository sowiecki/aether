// POC using example code from libs
const ws281x = require('rpi-ws281x-native');
const LCDPLATE = require('adafruit-i2c-lcd').plate;

const NUM_LEDS = 200;
const pixelData = new Uint32Array(NUM_LEDS);
const lcd = new LCDPLATE(1, 0x20);

lcd.backlight(lcd.colors.BLUE);
lcd.message('Hello World!');

lcd.on('button_change', button => {
  lcd.clear();
  lcd.message(`Button changed:\n ${lcd.buttonName(button)}`);
  console.log(`Button changed:\n ${lcd.buttonName(button)}`);
});

ws281x.init(NUM_LEDS);

// ---- trap the SIGINT and reset before exit
process.on('SIGINT', () => {
  ws281x.reset();
  process.nextTick(() => process.exit(0));
});

for (let i = 0; i < NUM_LEDS; i++) {
  pixelData[i] = 0xffcc22;
}

ws281x.render(pixelData);

// ---- animation-loop
const t0 = Date.now();
setInterval(() => {
  const dt = Date.now() - t0;

  ws281x.setBrightness(Math.floor(Math.sin(dt / 1000) * 128 + 128)); // eslint-disable-line
}, 1000 / 30);

console.log('Press <ctrl>+C to exit.');
