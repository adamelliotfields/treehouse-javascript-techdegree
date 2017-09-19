const React = require('react');

class Bounds extends React.Component {
  render () {
    return (
      <div className="bounds">
        <div className="grid-100">
          <ul className="photo-stream--photos--list">
            <li>
              <a>
                <div className="circle--avatar">
                  <img src="content/m-spore.png" />
                </div>
                <h3>David Hiser</h3>
              </a>
              <img src="content/1.jpg" />
              <p>Aspen residents help U.S. Forest Service personnel plant seedlings at Marron Lake Campground, 12 miles North of Aspen. The native aspen trees in this popular camp area have been dying of a root disease. The USFS didn't have enough people for the replanting job so citizens volunteered their services. Snow covered peaks in background are the 14,000 foot maroon bells.</p>
              <p className="timestamp">Taken in May, 1972</p>
            </li>

            <li>
              <a>
                <div className="circle--avatar">
                  <img src="content/m-spore.png" />
                </div>
                <h3>Charles O'Rear</h3>
              </a>
              <img src="content/3.jpg" />
              <p>Diving into the Colorado River at "Parker Strip," a favorite swimming spot of Southern Californians and Arizonians. Increasing salinity of the water may prove a drawback to future enjoyment.</p>
              <p className="timestamp">Taken in April, 1973</p>
            </li>

            <li>
              <a>
                <div className="circle--avatar">
                  <img src="content/m-spore.png" />
                </div>
                <h3>Boyd Norton</h3>
              </a>
              <img src="content/2.jpg" />
              <p>Vacationers on motorcycles.</p>
              <p className="timestamp">Taken in May, 1972</p>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

module.exports = Bounds;
