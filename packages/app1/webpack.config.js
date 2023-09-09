const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container
const ExternalTemplateRemotesPlugin = require('external-remotes-plugin')
const path = require('path')

module.exports = {
  entry: './src/index',
  mode: process.env.NODE_ENV,
  devServer: {
    static: path.join(__dirname, 'dist'),
    port: process.env.NODE_ENV === 'development' ? 3001 : 4001,
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
        react: { singleton: true },
        'react-dom': { singleton: true },
        '@tanstack/react-query': { singleton: true },
      },
    }),
    new ExternalTemplateRemotesPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
}
