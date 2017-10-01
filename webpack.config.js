const path = require('path');
const ejs = require('ejs');
const fs = require('fs');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');

const template = ejs.compile(
  fs.readFileSync(__dirname + '/src/index.html.ejs', 'utf-8')
);

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const IS_DEV = NODE_ENV === 'development';

const config = (module.exports = {
  entry: {
    index: ['./src/index.js']
  },
  output: {
    filename: '[name]-[hash].js',
    path: path.join(__dirname, 'dist'),
    libraryTarget: 'umd'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'images/[name]-[sha256:hash:base64:8].[ext]'
            }
          }
        ]
      }
    ]
  }
});

if (IS_DEV) {

  Object.assign(config, {
    devtool: 'source-maps',
    devServer: {
      public: `${HOST}:${PORT}`,
      port: PORT,
      disableHostCheck: true,
      contentBase: 'dist',
      hot: true
    }
  });

  config.entry.index = [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://${HOST}:${PORT}`,
    'webpack/hot/only-dev-server'
  ].concat(config.entry.index);

  config.plugins = config.plugins.concat([
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]);

  config.module.rules.push({
    test: /\.s?css$/,
    use: ['style-loader', 'css-loader', 'sass-loader']
  });

} else {

  config.plugins = config.plugins.concat([
    new ExtractTextPlugin({
      filename: '[name]-[contenthash].css',
      allChunks: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      comments: false
    }),
    new StaticSiteGeneratorPlugin({
      paths: ['/'],
      locals: { template, title: 'About Me' }
    })
  ]);

  config.module.rules.push({
    test: /\.s?css$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: ['css-loader', 'sass-loader']
    })
  });

}
