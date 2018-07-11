import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <div className="header-text">Objective Personality Helper</div>
        <div className="header-github">
          <NavLink className="btn btn-link" exact activeClassName="bold" to="/">
            Type Sheet
          </NavLink>
          <NavLink className="btn btn-link" exact activeClassName="bold" to="/video">
            Video Typing
          </NavLink>
          <a className="btn btn-link" href="https://github.com/michaelborromeo/objectivepersonality"
            target="_blank"
            rel="noopener noreferrer">
            GitHub →
          </a>
        </div>
      </div>
    );
  }
}

export default Header;
