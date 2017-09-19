const React = require('react');
const PropTypes = require('prop-types');

class Layout extends React.Component {
  render () {
    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <title>Photo Stream</title>
          <meta name="description" content="" />
          <meta name="author" content="" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link href="https://fonts.googleapis.com/css?family=Work+Sans:400,500" rel="stylesheet" type="text/css" />
          <link href="https://fonts.googleapis.com/css?family=Cousine" rel="stylesheet" type="text/css" />
          <link rel="stylesheet" href="styles/all.min.css" />
          <script type="text/javascript" src="lib/jquery-3.2.1.min.js"></script>
          <script type="text/javascript" src="scripts/all.min.js"></script>
        </head>
        <body>
          {this.props.children}
        </body>
      </html>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.any.isRequired
};

module.exports = Layout;
