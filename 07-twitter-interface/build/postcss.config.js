const uncss = require('postcss-uncss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

// Requires server to be running on localhost:8080
// Requires src/css to be served in app.js
module.exports = {
  plugins: [
    uncss({ html: ['http://localhost:8080/'] }),
    autoprefixer(),
    cssnano({ discardComments: { removeAll: true } })
  ]
};
