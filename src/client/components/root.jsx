/* eslint react/prefer-stateless-function:0, no-console:0 */
import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';

import store from '../config/store';

class Root extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <div>Hello, world!</div>
      </Provider>
    );
  }
}

export default Root;
