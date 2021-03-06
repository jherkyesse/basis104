const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname, 'src'),
  devtool: 'cheap-module-source-map',
  entry: './index.jsx',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].chunk.js',
    publicPath: '/',
    pathinfo: false,
    hashDigestLength: 8,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: ['react-refresh/babel'],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [path.resolve('src'), 'node_modules'],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'style/[contenthash].css' }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development'
      ),
    }),
    new HtmlWebpackPlugin({
      inject: true,
      filename: './index.html',
      template: './index.html',
    }),
    new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime-.+[.]js/]),
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
    new WatchMissingNodeModulesPlugin(path.resolve('node_modules')),
  ],
  devServer: {
    inline: true,
    hot: true,
    compress: true,
    clientLogLevel: 'error',
    contentBase: './dist',
    // noInfo: true,
    // overlay: true,
    historyApiFallback: true,
    port: 3000,
  },
};
