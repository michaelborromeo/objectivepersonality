import React, {Component} from 'react';
import Video from './Video';
import Notes from './Notes';
import ChoiceSelector from './ChoiceSelector';
import VideoSelection from './VideoSelection';
import './index.css';
import {deleteNote, updateNote} from '../../store/actions';
import {connect} from 'react-redux';

class VideoTyping extends Component {
  render() {
    return (
      <div className="VideoTyping">
        <VideoSelection/>
        <div className="row" style={{display: this.props.enabled ? '' : 'none'}}>
          <div className="col-6">
            <Video/>
          </div>
          <div className="col-6">
            <Notes/>
          </div>
        </div>
        <ChoiceSelector/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  enabled: !!state.videoTyping.selectedVideoId
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(VideoTyping);
