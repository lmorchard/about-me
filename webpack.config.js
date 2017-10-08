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
  output: {
    filename: 'about-me/[name].js',
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
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: [['env', { modules: false }], 'react'],
            plugins: ['transform-object-rest-spread', 'react-hot-loader/babel']
          }
        }
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'about-me/fonts/[name]-[sha256:hash:base64:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'about-me/images/[name]-[sha256:hash:base64:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(md|txt)$/,
        use: 'raw-loader'
      }
    ]
  }
});

if (IS_DEV) {
  config.entry = {
    index: [
      'react-hot-loader/patch',
      `webpack-dev-server/client?http://${HOST}:${PORT}`,
      'webpack/hot/only-dev-server',
      './src/dev/index.js'
    ]
  };

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

  config.plugins = config.plugins.concat([
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      chunks: ['index'],
      template: './src/index.html.ejs',
      filename: 'index.html',
      title: 'About Me',
      css: [],
      js: []
    })
  ]);

  config.module.rules.push({
    test: /\.s?css$/,
    use: [
      { loader: 'style-loader' },
      { loader: 'css-loader' },
      {
        loader: 'sass-loader',
        options: { sourceMap: true }
      }
    ]
  });
} else {
  config.entry = {
    static: ['./src/prod/static.js'],
    index: ['./src/prod/index.js']
  };

  config.plugins = config.plugins.concat([
    new ExtractTextPlugin({
      filename: 'about-me/[name]-[contenthash].css',
      allChunks: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      comments: false
    }),
    new StaticSiteGeneratorPlugin({
      entry: 'static',
      paths: ['/'],
      locals: { template, title: 'About Me' }
    })
  ]);

  config.module.rules.push({
    test: /\.s?css$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      publicPath: '../',
      use: [
        { loader: 'css-loader' },
        {
          loader: 'sass-loader',
          options: { sourceMap: true }
        }
      ]
    })
  });
}
