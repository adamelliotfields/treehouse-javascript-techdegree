const React = require('react');
const PropTypes = require('prop-types');

class Layout extends React.Component {
  render() {
    return React.createElement(
      'html',
      { lang: 'en' },
      React.createElement(
        'head',
        null,
        React.createElement('meta', { charSet: 'utf-8' }),
        React.createElement(
          'title',
          null,
          'Photo Stream'
        ),
        React.createElement('meta', { name: 'description', content: '' }),
        React.createElement('meta', { name: 'author', content: '' }),
        React.createElement('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }),
        React.createElement('link', { href: 'https://fonts.googleapis.com/css?family=Work+Sans:400,500', rel: 'stylesheet', type: 'text/css' }),
        React.createElement('link', { href: 'https://fonts.googleapis.com/css?family=Cousine', rel: 'stylesheet', type: 'text/css' }),
        React.createElement('link', { rel: 'stylesheet', href: 'styles/all.min.css' }),
        React.createElement('script', { type: 'text/javascript', src: 'lib/jquery-3.2.1.min.js' }),
        React.createElement('script', { type: 'text/javascript', src: 'scripts/all.min.js' })
      ),
      React.createElement(
        'body',
        null,
        this.props.children
      )
    );
  }
}

Layout.propTypes = {
  children: PropTypes.any.isRequired
};

module.exports = Layout;