import { plate as LCDPlate } from 'adafruit-i2c-lcd';

const neoPixelController = {
  init: () => {
    // POC using example code from libs
    const lcd = new LCDPlate(1, 0x20);

    lcd.backlight(lcd.colors.BLUE);
    lcd.message('Hello World!');

    lcd.on('button_change', button => {
      lcd.clear();
      lcd.message(`Button changed:\n ${lcd.buttonName(button)}`);
      console.log(`Button changed:\n ${lcd.buttonName(button)}`);
    });
  }
};

export default neoPixelController;
