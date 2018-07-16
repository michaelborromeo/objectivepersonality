import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';

import './Header.css';

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <div className="header-text">Objective Personality Helper</div>
        <div className="header-github">
          <NavLink className="btn btn-link" to={`/#${this.props.encodedChoiceStates}`}>
            Type Sheet
          </NavLink>
          <NavLink className="btn btn-link" to="/video">
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

const mapStateToProps = state => ({
  encodedChoiceStates: state.choicesAndTypes.encodedChoiceStates
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
