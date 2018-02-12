import sensor from 'node-dht-sensor';
import { emitTemperatureUpdate } from '../ducks/temperature';

const temperatureController = {
  init() {
    sensor.read(22, 4, (err, temperature, humidity) => {
      if (!err) {
        console.log(`temp: ${temperature.toFixed(1)}°C, ` + `humidity: ${humidity.toFixed(1)}%`);
        emitTemperatureUpdate(temperature, humidity);
      }
    });
  }
};

export default temperatureController;
