const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container
const path = require('path')
const deps = require('./package.json').dependencies

module.exports = {
  entry: './src/index',
  mode: process.env.NODE_ENV,
  target: 'web',
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' },
    static: path.join(__dirname, 'dist'),
    port: process.env.NODE_ENV === 'development' ? 3002 : 4002,
    host: 'app2.mapleimage.com',
    allowedHosts: ['app2.mapleimage.com', 'app1.mapleimage.com'],
    // hot: true,
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
    // To learn more about the usage of this plugin, please visit https://webpack.js.org/plugins/module-federation-plugin/
    new ModuleFederationPlugin({
      name: 'app2',
      filename: 'module-federation.js',
      exposes: {
        // './App': './src/App',
        './Component1': './src/components/component1/index.js',
      },
      shared: {
        react: { singleton: true, requiredVersion: deps.react },
        'react-dom': { singleton: true, requiredVersion: deps['react-dom'] },
        '@tanstack/react-query': { requiredVersion: '>=4.35.0' },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
}
