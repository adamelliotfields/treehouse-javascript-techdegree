const React = require('react');

class Header extends React.Component {
  render () {
    return (
      <header className="circle--header">
        <div className="bounds">
          <div className="grid-100">
            <h1>Photo Stream</h1>
          </div>
        </div>
      </header>
    );
  }
}

module.exports = Header;
