const React = require('react');

class Header extends React.Component {
  render() {
    return React.createElement(
      "header",
      { className: "circle--header" },
      React.createElement(
        "div",
        { className: "bounds" },
        React.createElement(
          "div",
          { className: "grid-100" },
          React.createElement(
            "h1",
            null,
            "Photo Stream"
          )
        )
      )
    );
  }
}

module.exports = Header;