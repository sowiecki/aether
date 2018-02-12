import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';

class StatsController extends PureComponent {
  static propTypes = {
    actions: PropTypes.shape({ emitSocketInit: PropTypes.func.isRequired }).isRequired,
    connected: PropTypes.bool.isRequired,
    temperature: PropTypes.number.isRequired
  };

  componentDidMount() {
    this.props.actions.emitSocketInit();
  }

  render() {
    return (
      <Fragment>
        <div>Hello, world</div>
        <div>Connected: {this.props.connected === true ? 'true' : 'false'}</div>
        <div>Temperature: {this.props.temperature}</div>
      </Fragment>
    );
  }
}

export default StatsController;
