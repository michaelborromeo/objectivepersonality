import React, {Component} from 'react';

import './Notes.css';
import {connect} from 'react-redux';

class Notes extends Component {
  render() {

    const noteComponents = [];

    const videos = this.props.videos;
    const videoId = this.props.selectedVideoId;

    if (!videoId) {
      return <div>No video selected.</div>;
    }

    const notes = videos[videoId].notes;

    for (let j = 0; j < notes.length; j++) {
      const note = notes[j];

      noteComponents.push(
        <div>
          {note.choice ? note.choice + ': ' : ''} {note.note}
        </div>
      )
    }

    return (
      <div className="Notes">
        Notes
        <div>
          {noteComponents}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  videos: state.videoTyping.videos,
  selectedVideoId: state.videoTyping.selectedVideoId
});

const mapDispatchToProps = dispatch => ({
  //setChoiceState: (choice, state) => dispatch(setChoiceState(choice, state))
});

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
