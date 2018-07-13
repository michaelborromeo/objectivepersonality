import React, {Component} from 'react';
import {connect} from 'react-redux';

import getYouTubeId from '../../utils/getYouTubeId';
import {addVideo} from '../../store/actions';
import './VideoSelection.css';

class VideoSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {videoUrlOrId: ''};
  }

  render() {

    const videos = this.props.videos;
    const videoIds = this.props.videoIds;
    const videoListComponents = [];

    for (let i = 0; i < videoIds.length; i++) {
      const video = videos[videoIds[i]];
console.log(video.title)
      videoListComponents.push(
        <div className="videoselection-video-list-item">
          {video.title || '...'}
        </div>
      );
    }

    return (
      <div className="VideoSelection">
        <div className="row">
          <div className="col-5 offset-3">
            <input onChange={this.handleVideoChange}
              value={this.state.videoUrlOrId}
              className="form-control"
              placeholder="Enter a YouTube URL or Video ID..."/>
          </div>
          <div className="col-1">
            <button onClick={this.handleLoadVideoClick}
              className="btn btn-primary">Load Video
            </button>
          </div>
        </div>
        <div className="row">
          {videoListComponents}
        </div>
      </div>
    );
  }

  handleVideoChange = event => {
    this.setState({videoUrlOrId: event.target.value})
  };

  handleLoadVideoClick = () => {
    this.props.addVideo(getYouTubeId(this.state.videoUrlOrId));
  };
}

const mapStateToProps = state => ({
  selectedVideoId: state.videoTyping.selectedVideoId,
  videoIds: state.videoTyping.videoIds,
  videos: state.videoTyping.videos
});

const mapDispatchToProps = dispatch => ({
  addVideo: (choice, state) => dispatch(addVideo(choice, state))
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoSelection);
