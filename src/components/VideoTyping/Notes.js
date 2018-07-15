import React, {Component} from 'react';
import {connect} from 'react-redux';
import EditableLabel from 'react-inline-editing';
import moment from 'moment';
import _ from 'lodash';

import {deleteNote, updateNote} from '../../store/actions';
import './Notes.css';

class Notes extends Component {
  render() {
    const noteComponents = [];

    const videos = this.props.videos;
    const videoId = this.props.selectedVideoId;

    if (!videoId) {
      return <div>No video selected.</div>;
    }

    const notes = _.orderBy(videos[videoId].notes, 'seconds', 'desc');

    for (let j = 0; j < notes.length; j++) {
      const note = notes[j];

      noteComponents.push(
        <div key={j} className="notes-note" onKeyPress={this.handleKeyPress}>
          <div className="notes-seconds">
            {this.formatSeconds(note.seconds)} →
          </div>
          <div className="notes-choice">
            {note.choice ? note.choice + '' : ''}
          </div>

          <EditableLabel text={note.note}
            labelClassName={note.note ? 'notes-empty-note-label' : 'notes-nonempty-note-label'}
            inputClassName={note.note ? 'form-control notes-empty-note-input' : 'form-control notes-nonempty-note-input'}
            inputWidth='95%'
            inputMaxLength='2000'
            onFocus={this.handleFocus}
            onFocusOut={this.handleFocusOut}
          />
        </div>
      )
    }

    return (
      <div className="Notes">
        <div>
          {noteComponents}
        </div>
      </div>
    );
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.target.blur();
    }
  };

  handleFocus = text => {
    console.log('Focused with text: ' + text);
  };

  handleFocusOut = text => {
    console.log('Left editor with text: ' + text);
  };

  formatSeconds(seconds) {
    if (seconds >= 3600) {
      return moment(seconds, 's').format('h:mm:ss');
    } else {
      return moment(seconds, 's').format('mm:ss');
    }
  }
}

const mapStateToProps = state => ({
  videos: state.videoTyping.videos,
  selectedVideoId: state.videoTyping.selectedVideoId
});

const mapDispatchToProps = dispatch => ({
  updateNote: (noteId, note, state) => dispatch(updateNote(noteId, note, state)),
  deleteNote: (noteId) => dispatch(deleteNote(noteId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
