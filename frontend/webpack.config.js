const path = require('path');
const webpack = require('webpack');
require('dotenv').config();

module.exports = {
  entry: './src/index.tsx',
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 3000,
    open: true, // Automatically open the browser
    hot: true, // Enable hot module replacement
    historyApiFallback: true, // Serve index.html for any 404 responses
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.REACT_APP_BASE_API_URL': JSON.stringify(process.env.REACT_APP_BASE_API_URL),
    }),
  ],
};