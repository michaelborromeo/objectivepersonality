import React, {Component} from 'react';
import {connect} from 'react-redux';
import YouTube from 'react-youtube';

import {loadPlayer, setVideoTitle} from '../../store/actions';
import './Video.css';

class Video extends Component {
  render() {
    const selectedVideoId = this.props.selectedVideoId || '';

    // https://developers.google.com/youtube/player_parameters
    const opts = {
      width: '100%',
      playerVars: {
        autoplay: 1
      }
    };

    return (
      <YouTube
        videoId={selectedVideoId}
        opts={opts}
        onReady={this.onReady}
        onStateChange={this.onStateChange}
      />
    );
  }

  onReady = event => {
    this.props.loadPlayer(event.target);
  };

  onStateChange = event => {
    const title = event.target.getVideoData().title;
    const hasTitle = !!this.props.videos[this.props.selectedVideoId].title;

    // set the title only if it hasn't already been set
    // doing this here because the title might not be present when onReady fires
    if (!hasTitle && title) {
      this.props.setVideoTitle(this.props.selectedVideoId, title);
    }
  };
}

const mapStateToProps = state => ({
  videos: state.videoTyping.videos,
  selectedVideoId: state.videoTyping.selectedVideoId
});

const mapDispatchToProps = dispatch => ({
  loadPlayer: (videoId, player) => dispatch(loadPlayer(videoId, player)),
  setVideoTitle: (videoId, title) => dispatch(setVideoTitle(videoId, title))
});

export default connect(mapStateToProps, mapDispatchToProps)(Video);
