import React, {Component} from 'react';

import './VideoSelection.css';
import {connect} from 'react-redux';

class VideoSelection extends Component {
  render() {
    return (
      <div className="VideoSelection">
        <div className="row">
          <div className="col-5 offset-3">
            <input className="form-control" placeholder="Enter a YouTube URL or video ID..."/>
          </div>
          <div className="col-1">
            <button className="btn btn-primary">Load Video</button>
          </div>
        </div>
        <div className="row">
          list of videos
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  choiceGroups: state.choicesAndTypes.choiceGroups
});

const mapDispatchToProps = dispatch => ({
  //setChoiceState: (choice, state) => dispatch(setChoiceState(choice, state))
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoSelection);
