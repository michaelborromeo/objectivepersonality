import React, {Component} from 'react';
import {connect} from 'react-redux';

import getYouTubeId from '../../utils/getYouTubeId';
import {addVideo, deleteVideo, selectVideo} from '../../store/actions';
import './VideoSelection.css';

class VideoSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {videoUrlOrId: ''};
  }

  render() {

    const selectedVideoId = this.props.selectedVideoId;
    const videos = this.props.videos;
    const videoIds = this.props.videoIds;
    const videoListComponents = [];

    if (videoIds.length) {
      for (let i = 0; i < videoIds.length; i++) {
        const video = videos[videoIds[i]];

        videoListComponents.push(
          <div className="videoselection-video-list-item" key={i}>
            <button onClick={() => this.handleSelectVideo(video.id)}
              className={`btn btn-link ${selectedVideoId === video.id ? 'bold' : ''}`}>
              {video.title || '...'}
            </button>

            <button key={video.id + 'remove'} onClick={() => this.handleDeleteVideo(video)}
              className="videoselection-video-list-item-remove btn btn-link">
              Remove
            </button>
          </div>
        );
      }
    } else {
      videoListComponents.push(
        <div className="videoselection-instructions" key={'0'}>
          Enter a YouTube URL or ID into the text box above to begin adding notes to a video.
        </div>
      )
    }

    return (
      <div className="VideoSelection">
        <div className="row">
          <div className="col-5 offset-3">
            <input onChange={this.handleVideoChange}
              value={this.state.videoUrlOrId}
              className="form-control"
              placeholder="https://www.youtube.com/watch?v=1234567890"/>
          </div>
          <div className="col-1">
            <button onClick={this.handleLoadVideoClick}
              className="btn btn-primary">Load Video
            </button>
          </div>
        </div>
        <div className="videoselection-video-list">
          {videoListComponents}
        </div>
      </div>
    );
  }

  handleSelectVideo = videoId => {
    this.props.selectVideo(videoId);
  };

  handleDeleteVideo = video => {
    if (window.confirm(`Delete ${video.title}?`)) {
      this.props.deleteVideo(video.id);
    }
  };

  handleVideoChange = event => {
    this.setState({videoUrlOrId: event.target.value})
  };

  handleLoadVideoClick = () => {
    this.props.addVideo(getYouTubeId(this.state.videoUrlOrId));
    this.setState({videoUrlOrId: ''});
  };
}

const mapStateToProps = state => ({
  selectedVideoId: state.videoTyping.selectedVideoId,
  videoIds: state.videoTyping.videoIds,
  videos: state.videoTyping.videos
});

const mapDispatchToProps = dispatch => ({
  addVideo: (choice, state) => dispatch(addVideo(choice, state)),
  selectVideo: (choice, state) => dispatch(selectVideo(choice, state)),
  deleteVideo: (choice, state) => dispatch(deleteVideo(choice, state))
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoSelection);
