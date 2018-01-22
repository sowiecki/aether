const EMIT_LIGHT_CHANGE = 'EMIT_LIGHT_CHANGE';

const neoPixelReducer = (state, action) => ({
  [EMIT_LIGHT_CHANGE]: () => {}
});

module.exports = neoPixelReducer;
