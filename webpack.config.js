require('babel-register');

const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const createElement = require('react').createElement;
const renderToString = require('react-dom/server').renderToString;

const App = require('./src/components/App').default;

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const IS_DEV = NODE_ENV === 'development';

const config = module.exports = {
  entry: {},
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
    }),
    new HtmlWebpackPlugin({
      chunks: ['index'],
      template: './src/index.html.ejs',
      filename: 'index.html',
      title: 'About Me',
      body: renderToString(createElement(App))
    })
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  devtool: 'source-map',
  devServer: {
    public: `${HOST}:${PORT}`,
    port: PORT,
    disableHostCheck: true,
    contentBase: 'dist',
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader'],
        }),
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: ['babel-loader']
      }
    ]
  }
};

if (IS_DEV) {
  config.entry.index = [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://${HOST}:${PORT}`,
    'webpack/hot/only-dev-server',
    './src/index.js'
  ];
  config.plugins = config.plugins.concat([
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]);
} else {
  config.entry.index = [
    './src/index.js'
  ];
  config.plugins = config.plugins.concat([
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      comments: false
    })
  ]);
}
