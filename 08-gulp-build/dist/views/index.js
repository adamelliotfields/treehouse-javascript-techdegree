const React = require('react');
const Layout = require('./layout');
const Header = require('./header');
const Bounds = require('./bounds');

class Index extends React.Component {
  render() {
    return React.createElement(
      Layout,
      null,
      React.createElement(Header, null),
      React.createElement(Bounds, null)
    );
  }
}

module.exports = Index;