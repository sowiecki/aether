import { handleActions, createAction } from 'redux-actions';

const defaultState = {
  message: 'Initializing'
};

const EMIT_LCD_MESSAGE_UPDATE = 'EMIT_LCD_MESSAGE_UPDATE';

export const emitLCDMessageUpdate = createAction(EMIT_LCD_MESSAGE_UPDATE, (message) => ({
  message
}));

const lcdReducer = handleActions(
  {
    [EMIT_LCD_MESSAGE_UPDATE]: (state, message) => ({
      ...state,
      message
    })
  },
  defaultState
);

export default lcdReducer;
