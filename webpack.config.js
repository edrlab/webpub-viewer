const path = require('path');

module.exports = {
  mode: 'none',
  entry: './viewer/index.js',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'webpub-viewer.js',
    path: path.resolve(__dirname, 'viewer')
  }
};
