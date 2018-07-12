import React, {Component} from 'react';
import Video from './Video';
import Notes from './Notes';
import EasyChoices from './EasyChoices';
import VideoSelection from './VideoSelection';
import './index.css';

class VideoTyping extends Component {
  render() {
    return (
      <div className="VideoTyping">
        <VideoSelection/>
        <div className="row">
          <div className="col-6">
            <Video/>
          </div>
          <div className="col-6">
            <Notes/>
          </div>
        </div>
        <EasyChoices/>
      </div>
    );
  }
}

export default VideoTyping;
