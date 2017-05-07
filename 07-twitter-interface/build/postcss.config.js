const pug = require('pug');
const uncss = require('postcss-uncss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
  plugins: [
    uncss({ html: 'http://localhost:8080' }),
    autoprefixer(),
    cssnano({ discardComments: { removeAll: true } })
  ]
};
