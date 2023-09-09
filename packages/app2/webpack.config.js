const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container
const path = require('path')

module.exports = {
  entry: './src/index',
  mode: process.env.NODE_ENV,
  devServer: {
    static: path.join(__dirname, 'dist'),
    port: process.env.NODE_ENV === 'development' ? 3002 : 4002,
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
        './Component1': './src/components/component1',
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
        '@tanstack/react-query': { singleton: true },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
}
