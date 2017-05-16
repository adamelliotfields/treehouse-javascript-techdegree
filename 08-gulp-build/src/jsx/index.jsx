const React = require('react');
const Layout = require('./layout');
const Header = require('./header');
const Bounds = require('./bounds');

class Index extends React.Component {
  render () {
    return (
      <Layout>
        <Header />
        <Bounds />
      </Layout>
    );
  }
}

module.exports = Index;
