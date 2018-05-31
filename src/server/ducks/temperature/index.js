import { handleActions, createAction } from 'redux-actions';

// import temperatureController from 'controllers/temperature';
import { EMIT_TEMPERATURE_UPDATE } from './types';

const initialState = {
  temperature: null
};

export const emitTemperatureUpdate = createAction(
  EMIT_TEMPERATURE_UPDATE,
  (temperature, humidity) => ({
    temperature,
    humidity
  })
);

const socketReducer = handleActions(
  {
    [EMIT_TEMPERATURE_UPDATE]: (state, { payload }) => ({
      ...state,
      temperature: payload.temperature
    })
  },
  initialState
);

export default socketReducer;
