import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';

import { UNITS } from '../../constants';
import Header from '../header';
import Readout from './readout';

const StatsController = (props) => {
  useEffect(() => {
    props.actions.emitSocketInit();
  });

  return (
    <Fragment>
      <Header />
      <Readout label="CPU" value={props.temperature} unit={UNITS.FAHRENHEIT} />
      <Readout
        label="WebSocket"
        value={props.connected === true ? 'Connected' : 'Disconnected'}
      />
    </Fragment>
  );
};

StatsController.propTypes = {
  actions: PropTypes.shape({
    emitSocketInit: PropTypes.func.isRequired
  }).isRequired,
  connected: PropTypes.bool.isRequired,
  temperature: PropTypes.number.isRequired
};

export default StatsController;
