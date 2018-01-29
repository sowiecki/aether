import React from 'react';
import ReactDOM from 'react-dom';

import Root from './components/root';

const node = document.getElementById('root');

const render = (Component) => {
  ReactDOM.render(<Component />, node);
};

render(Root);

if (process.env.HOT && module.hot) {
  module.hot.accept(Root, () => {
    render(Root, node);
  });
}
