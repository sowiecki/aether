import React from 'react';
import PropTypes from 'prop-types';
import ReactDOMServer from 'react-dom/server';

import { SERVER_PORT, BUNDLE_PORT, BUNDLE_PATH } from '../config';

const Application = ({ bundleHost, bundlePath }) => (
  <html lang="en">
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </head>
    <body>
      <div id="root" />
      <script src={`http://${bundleHost}${bundlePath}`} />
    </body>
  </html>
);

Application.propTypes = {
  bundlePath: PropTypes.string.isRequired,
  bundleHost: PropTypes.string.isRequired
};

const genApplicationView = ({ request }) => {
  const bundleHost = request.header.host.replace(SERVER_PORT, BUNDLE_PORT);

  return ReactDOMServer.renderToStaticMarkup(
    <Application bundleHost={bundleHost} bundlePath={BUNDLE_PATH} />
  );
};

export default genApplicationView;
