import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reset} from '../store/actions';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <div className="header-text">Objective Personality Helper</div>
        <div className="header-reset-link">
          <button className="btn btn-link" onClick={this.props.resetChoices}>
            Reset
          </button>

          {this.props.encodedChoiceStates}

        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  choiceStates: state.choicesAndTypes.choiceStates,
  encodedChoiceStates: state.choicesAndTypes.encodedChoiceStates
});

const mapDispatchToProps = dispatch => ({
  resetChoices: () => dispatch(reset())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
