const path = require('path');

const webpack = require('webpack');

const baseContext = path.join(__dirname, '../src/client');
const universalContext = path.join(__dirname, '../src/universal');

module.exports = {
  context: baseContext,
  entry: 'index.jsx',
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'bundle.js',
    publicPath: '/',
    libraryTarget: 'umd'
  },
  resolve: {
    modules: [baseContext, 'node_modules'],
    extensions: ['.js', '.jsx'],
    alias: {
      universal: path.resolve(universalContext)
    }
  },
  module: {
    rules: [
      {
        test: /\.js(x|)?$/,
        use: {
          loader: 'babel-loader'
        },
        include: [baseContext, universalContext],
        exclude: /node_modules/
      },
      {
        test: /\.(woff|ttf|eot|otf|png)$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [new webpack.NamedModulesPlugin()]
};
