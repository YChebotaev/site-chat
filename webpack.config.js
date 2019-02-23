var webpack = require('webpack')

module.exports = {
  context: __dirname + '/src',
  
  entry: './site-chat.js',
  
  output: {
    path: __dirname+'/js',
    filename: 'site-chat.js'
  },

  plugins: [
    new webpack.ProvidePlugin({
      riot: 'riot'
    })
  ],

  module: {
    loaders: [{
      test: /\.html$/,
      include: /src/,
      loader: 'riotjs-loader'
    },
    {
      test: /\.svg$/,
      loader: 'svg-loader'
    },
    {
      test: /\.mustache$/,
      include: /scr/,
      loader: 'mustache-loader'
    }, {
      test: /\.css$/,
      include: /src/,
      loader: "style-loader!css-loader"
    }, {
      test: /\.js$/,
      include: /src/,
      loader: 'babel-loader',
      query: {
        modules: 'common',
        optional: ['runtime']
      }
    }]
  },
  
  devtool: 'source-map'
}