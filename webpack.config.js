const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const AutoReloadServerPlugin = require('auto-reload-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';

module.exports = {
  mode,
  watch: mode === 'development',
  stats: 'errors-only',
  entry: './src/server/index.ts',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  },
  externals: [nodeExternals()],
  resolve: {
    extensions: ['.ts', '.js'],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080
  },
  plugins: mode === 'development' ? [
    new AutoReloadServerPlugin({
      filePath: 'dist/main.js',
    }),
    new webpack.HotModuleReplacementPlugin()
  ] : [new webpack.HotModuleReplacementPlugin()]
};