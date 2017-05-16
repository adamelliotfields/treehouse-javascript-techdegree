const React = require('react');

class Bounds extends React.Component {
  render() {
    return React.createElement(
      "div",
      { className: "bounds" },
      React.createElement(
        "div",
        { className: "grid-100" },
        React.createElement(
          "ul",
          { className: "photo-stream--photos--list" },
          React.createElement(
            "li",
            null,
            React.createElement(
              "a",
              null,
              React.createElement(
                "div",
                { className: "circle--avatar" },
                React.createElement("img", { src: "content/m-spore.png" })
              ),
              React.createElement(
                "h3",
                null,
                "David Hiser"
              )
            ),
            React.createElement("img", { src: "content/1.jpg" }),
            React.createElement(
              "p",
              null,
              "Aspen residents help U.S. Forest Service personnel plant seedlings at Marron Lake Campground, 12 miles North of Aspen. The native aspen trees in this popular camp area have been dying of a root disease. The USFS didn't have enough people for the replanting job so citizens volunteered their services. Snow covered peaks in background are the 14,000 foot maroon bells."
            ),
            React.createElement(
              "p",
              { className: "timestamp" },
              "Taken in May, 1972"
            )
          ),
          React.createElement(
            "li",
            null,
            React.createElement(
              "a",
              null,
              React.createElement(
                "div",
                { className: "circle--avatar" },
                React.createElement("img", { src: "content/m-spore.png" })
              ),
              React.createElement(
                "h3",
                null,
                "Charles O'Rear"
              )
            ),
            React.createElement("img", { src: "content/3.jpg" }),
            React.createElement(
              "p",
              null,
              "Diving into the Colorado River at \"Parker Strip,\" a favorite swimming spot of Southern Californians and Arizonians. Increasing salinity of the water may prove a drawback to future enjoyment."
            ),
            React.createElement(
              "p",
              { className: "timestamp" },
              "Taken in April, 1973"
            )
          ),
          React.createElement(
            "li",
            null,
            React.createElement(
              "a",
              null,
              React.createElement(
                "div",
                { className: "circle--avatar" },
                React.createElement("img", { src: "content/m-spore.png" })
              ),
              React.createElement(
                "h3",
                null,
                "Boyd Norton"
              )
            ),
            React.createElement("img", { src: "content/2.jpg" }),
            React.createElement(
              "p",
              null,
              "Vacationers on motorcycles."
            ),
            React.createElement(
              "p",
              { className: "timestamp" },
              "Taken in May, 1972"
            )
          )
        )
      )
    );
  }
}

module.exports = Bounds;