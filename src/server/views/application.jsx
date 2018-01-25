import React from 'react';
import PropTypes from 'prop-types';
import ReactDOMServer from 'react-dom/server';

import { BUNDLE_PATH } from '../config';

const Application = ({ bundle }) => (
  <html lang="en">
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </head>
    <body>
      <div id="root" />
      <script src={bundle} />
    </body>
  </html>
);

Application.propTypes = {
  bundle: PropTypes.string.isRequired
};

const applicationView = ReactDOMServer.renderToStaticMarkup(<Application bundle={BUNDLE_PATH} />);

export default applicationView;
