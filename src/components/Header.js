import React, {Component} from 'react';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <div className="header-text">Objective Personality Helper</div>
        <div className="header-github">
          <a href="https://github.com/michaelborromeo/objectivepersonality" target="_blank"
            rel="noopener noreferrer">
            https://github.com/michaelborromeo/objectivepersonality
          </a>
        </div>
      </div>
    );
  }
}

export default Header;
