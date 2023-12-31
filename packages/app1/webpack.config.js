const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container
const ExternalTemplateRemotesPlugin = require('external-remotes-plugin')
const path = require('path')
const deps = require('./package.json').dependencies

module.exports = {
  entry: './src/index',
  mode: process.env.NODE_ENV,
  target: 'web',
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' },
    static: path.join(__dirname, 'dist'),
    port: process.env.NODE_ENV === 'development' ? 3001 : 4001,
    host: 'app1.mapleimage.com',
    allowedHosts: ['app2.mapleimage.com', 'app1.mapleimage.com'],
  },
  output: {
    publicPath: 'auto',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react'],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'app1',
      remotes: {
        app2: 'app2@[app2Url]/module-federation.js',
      },
      shared: {
        react: { singleton: true, requiredVersion: deps.react },
        'react-dom': { singleton: true, requiredVersion: deps['react-dom'] },
        '@tanstack/react-query': { requiredVersion: '>=4.35.0' },
      },
    }),
    new ExternalTemplateRemotesPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
}
