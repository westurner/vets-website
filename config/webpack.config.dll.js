const path = require('path');
const webpack = require('webpack');
require('babel-polyfill');

const configGenerator = (_options) => {
  return {
    entry: {
      react: [
        'react',
        'react-dom',
        'react-router',
        'react-redux',
      ]
    },
    output: {
      path: path.join(__dirname, '../assets/dll'),
      filename: '[name].dll.js',
      library: '[name]',
    },
    plugins: [
      new webpack.DllPlugin({
        name: '[name]',
        path: path.join(__dirname, '../dll/[name]-manifest.json'),
      }),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin(),
    ]
  };
};

module.exports = configGenerator;
