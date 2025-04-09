const path = require('path');

module.exports = {
  entry: './index.js',  // Remplace par le fichier d'entrée de ton projet
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    fallback: {
      "zlib": require.resolve("browserify-zlib"),  // Utiliser un polyfill pour zlib
    },
  },
};
