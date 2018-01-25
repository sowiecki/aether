const path = require('path');

const webpack = require('webpack');

const baseContext = path.join(__dirname, '../src');

module.exports = {
  context: baseContext,
  entry: '../src/client/index.jsx',
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'bundle.js',
    publicPath: '/',
    libraryTarget: 'umd'
  },
  resolve: {
    modules: [baseContext, 'node_modules'],
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.js(x|)?$/,
        use: {
          loader: 'babel-loader'
        },
        include: baseContext,
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
