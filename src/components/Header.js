import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reset} from '../store/actions';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <div className="header-text">Objective Personality Helper</div>
        <div className="header-github">
          <a href="https://github.com/michaelborromeo/objectivepersonality" target="_blank">
            https://github.com/michaelborromeo/objectivepersonality
          </a>
        </div>
        <div className="header-reset-link row">
          <div className="col-1 offset-2">
            <button className="btn btn-link" onClick={this.copyLink}>Copy Link</button>
          </div>
          <div className="col-6">
            <input className="form-control"
              type="text"
              readOnly={true}
              value={window.location}
              id="url"/>
          </div>
          <div className="col-1">
            <button className="btn btn-link" onClick={this.props.resetChoices}>
              Reset
            </button>
          </div>
        </div>
      </div>
    );
  }

  copyLink() {
    const url = document.getElementById("url");
    url.select();
    document.execCommand("copy");
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
