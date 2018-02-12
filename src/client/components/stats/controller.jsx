import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const StatsController = (props) => (
  <Fragment>
    <div>Hello, world</div>
    <div>Temperature: {props.temperature}</div>
  </Fragment>
);

StatsController.propTypes = {
  temperature: PropTypes.number.isRequired
};

export default StatsController;
