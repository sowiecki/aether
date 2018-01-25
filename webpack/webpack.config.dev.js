const path = require('path');

const webpack = require('webpack');
const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');
const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const mapValues = require('lodash/fp/mapValues');

const base = require('./webpack.config');

module.exports = {
  devtool: 'cheap-module-source-map',
  context: base.context,
  entry: {
    app: [
      require.resolve('react-dev-utils/webpackHotDevClient'),
      require.resolve('react-error-overlay'),
      // 'webpack-hot-middleware/client?path=http://localhost:8080/__webpack_hmr',
      // 'webpack/hot/only-dev-server',
      'react-hot-loader/patch',
      base.entry
    ].filter((e) => e)
  },
  output: Object.assign(base.output, {
    pathinfo: true,
    devtoolModuleFilenameTemplate: (info) => path.resolve(info.absoluteResourcePath)
  }),
  resolve: base.resolve,
  plugins: base.plugins.concat([
    new CaseSensitivePathsPlugin(),
    new webpack.DefinePlugin({
      'process.env': mapValues((value) => JSON.stringify(value), {
        NODE_ENV: process.env.NODE_ENV || 'development'
      })
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ProgressBarPlugin()
  ]),
  module: {
    ...base.module,
    strictExportPresence: true
  },
  externals: base.externals,
  devServer: {
    proxy: {
      '/': 'http://localhost:8080'
    },
    host: '0.0.0.0',
    port: 3000,
    disableHostCheck: true,
    compress: true,
    clientLogLevel: 'none',
    overlay: false,
    hot: true,
    contentBase: base.output.path,
    publicPath: base.output.publicPath,
    historyApiFallback: {
      disableDotRule: true
    },
    watchContentBase: true,
    watchOptions: {
      ignored: /node_modules/
    },
    before(app) {
      app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header(
          'Access-Control-Allow-Headers',
          'Origin, X-Requested-With, Content-Type, Accept'
        );
        next();
      });
      app.use(errorOverlayMiddleware());
      app.use(noopServiceWorkerMiddleware());
    }
  }
};
