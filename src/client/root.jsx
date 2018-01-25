/* eslint react/prefer-stateless-function:0, no-console:0 */
import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';

class Root extends PureComponent {
  // componentDidCatch = (error, info) => {
  //   console.warn(error, info);
  // };

  render() {
    return (
      <Provider>
        <div>Hello, world!</div>
      </Provider>
    );
  }
}

export default Root;
