/* eslint-disable import/no-unresolved */
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const fs = require('fs');
const yaml = require('js-yaml');
const packageInfo = require('./package.json');

const config = yaml.load(fs.readFileSync('../config/config.yaml'));
const clientConfig = config.client;

const { env } = process;
const isDevelopment = env.NODE_ENV !== 'production';

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  entry: {
    app: ['./src/index.jsx'],
  },
  output: {
    filename: '[name].bundle.[fullhash].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  modules: false,
                  targets: {
                    esmodules: true,
                  },
                },
              ],
              '@babel/preset-react',
            ],
            plugins: [
              isDevelopment
              && env.FAST_REFRESH
              && require.resolve('react-refresh/babel'),
            ].filter(Boolean),
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.ya?ml$/,
        type: 'json',
        use: {
          loader: 'yaml-loader',
          options: {
            asJSON: true,
          },
        },
      },
      {
        // needed for open-iconic font
        test: /\.(ttf|eot|woff|otf|svg)/,
        use: ['file-loader'],
      },
    ],
  },
  devServer: {
    host: '0.0.0.0',
    allowedHosts: 'auto',
    static: ['dist'],
    client: {
      logging: 'verbose',
    },
    port: 8089,
    hot: true,
    historyApiFallback: true,
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: clientConfig.title,
      favicon: `dist/${clientConfig.favicon}`,
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
        'theme-color': '#FFF',
      },
    }),
    isDevelopment && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, 'lib')],
    extensions: ['.js', '.jsx'],
  },
};
