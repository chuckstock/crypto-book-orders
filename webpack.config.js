const path = require('path')
const webpackNodeExternals = require('webpack-node-externals')

const config = {
  // Inform webpack that we're building a bundle
  // for nodeJS, rather than for the browser
  target: 'node',

  // Tell webpack the root file of our
  // server application
  entry: {
    server: ['babel-polyfill', './index.js']
  },

  // Tell webpack where to put the output file
  // that is generated
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            'stage-0',
            ['env', { targets: { browsers: ['last 2 versions'] } }]
          ]
        }
      }
    ]
  },

  externals: [webpackNodeExternals()]
}

module.exports = config
