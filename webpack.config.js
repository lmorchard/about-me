const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const createElement = require('react').createElement;
const renderToString = require('react-dom/server').renderToString;

// HACK: Ignore CSS imports used for dependencies in webpack
require.extensions['.scss'] = require.extensions['.css'] = () => {};

require('babel-register')({
  "presets": [ "es2015", "stage-2", "react" ],
  "plugins": [ "react-hot-loader/babel" ]
});
const App = require('./src/containers/App').default;

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const IS_DEV = NODE_ENV === 'development';

const config = module.exports = {
  entry: {
    index: ['./src/index.js']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  devtool: 'eval',
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
        test: /\.s?css$/,
        use: IS_DEV
          ? ['style-loader', 'css-loader', 'sass-loader']
          : ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'sass-loader'],
          })
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
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
};

if (IS_DEV) {
  config.entry.index = [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://${HOST}:${PORT}`,
    'webpack/hot/only-dev-server',
  ].concat(config.entry.index);

  config.plugins = config.plugins.concat([
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]);
} else {
  config.plugins = config.plugins.concat([
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      comments: false
    })
  ]);
}
