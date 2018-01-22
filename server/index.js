// POC using example code from libs
const LCDPLATE = require('adafruit-i2c-lcd').plate;

const lcd = new LCDPLATE(1, 0x20);

lcd.backlight(lcd.colors.BLUE);
lcd.message('Hello World!');

lcd.on('button_change', button => {
  lcd.clear();
  lcd.message(`Button changed:\n ${lcd.buttonName(button)}`);
  console.log(`Button changed:\n ${lcd.buttonName(button)}`);
});
