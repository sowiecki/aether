/* eslint react/prefer-stateless-function:0, no-console:0 */
import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';

import store from '../config/store';
import StatsContainer from './stats/container';
import './common/styles.js';

class Root extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <StatsContainer />
      </Provider>
    );
  }
}

export default Root;
