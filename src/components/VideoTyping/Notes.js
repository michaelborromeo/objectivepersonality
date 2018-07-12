import React, {Component} from 'react';

import './Notes.css';
import {connect} from 'react-redux';

class Notes extends Component {
  render() {

    const noteComponents = [];

    const videos = this.props.videos;
    for (let i = 0; i < videos.length; i++) {
      const notes = videos[i].notes;

      for (let j = 0; j < notes.length; j++) {
        const note = notes[j];

        noteComponents.push(
          <div>
            {note.note}
          </div>
        )
      }
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
  videos: state.videoTyping.videos
});

const mapDispatchToProps = dispatch => ({
  //setChoiceState: (choice, state) => dispatch(setChoiceState(choice, state))
});

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
