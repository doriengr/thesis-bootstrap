const path = require('path');

module.exports = {
  mode: 'production',
  entry: ['/src/js/bootstrap.js', '/src/js/close-menu.js', '/src/js/navigation-scroll.js'],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'site.js',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        }
      }
    ]
  },
};
