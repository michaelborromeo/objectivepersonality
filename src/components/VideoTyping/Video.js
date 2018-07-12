import React, {Component} from 'react';
import YouTube from 'react-youtube';

import './Video.css';
import {connect} from 'react-redux';

class Video extends Component {
  render() {
    const opts = {
      width: '100%',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };

    return (
      <YouTube
        videoId=""
        opts={opts}
        onReady={this._onReady}
      />
    );
  }

  _onReady(event) {
    // access to player in all event handlers via event.target
    //event.target.pauseVideo();
  }
}

const mapStateToProps = state => ({
  choiceGroups: state.choicesAndTypes.choiceGroups
});

const mapDispatchToProps = dispatch => ({
  //setChoiceState: (choice, state) => dispatch(setChoiceState(choice, state))
});

export default connect(mapStateToProps, mapDispatchToProps)(Video);
