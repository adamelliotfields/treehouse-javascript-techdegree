const pug = require('pug');
const uncss = require('postcss-uncss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const html = pug.renderFile('../views/index.pug');

module.exports = {
  plugins: [
    uncss({ html: html }),
    autoprefixer(),
    cssnano({ discardComments: { removeAll: true } })
  ]
}
