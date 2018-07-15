import React, {Component} from 'react';
import {connect} from 'react-redux';
import EditableLabel from './EditableLabel';
import moment from 'moment';
import 'moment-duration-format';
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

    const notes = _.clone(videos[videoId].notes).reverse();

    if (notes.length) {
      for (let j = 0; j < notes.length; j++) {
        const note = notes[j];

        noteComponents.push(
          <div id={note.id} key={j} className="notes-note" onKeyPress={this.handleKeyPress}>
            <div className="notes-seconds">
              <button className="btn btn-link btn-no-padding"
                onClick={this.handlePlayerSeek(note.seconds)}>
                {this.formatSeconds(parseInt(note.seconds, 10))}
              </button>
            </div>
            →
            <div className="notes-choice">
              {note.choice ? note.choice + '' : ''}
            </div>
            <div className="notes-choice-state">
              →
              <button className={'btn btn-link btn-no-padding ' + (note.state === 'S' ? 'active' : '')}
                onClick={this.handleStateUpdate(note, 'S')}>Savior</button>
              /
              <button className={'btn btn-link btn-no-padding ' + (note.state === 'D' ? 'active' : '')}
                onClick={this.handleStateUpdate(note, 'D')}>Demon</button>
            </div>

            <button className={'btn btn-link btn-no-padding notes-note-remove'}
              onClick={this.handleRemoveNote(note.id)}>Remove
            </button>

            <EditableLabel key={note.id}
              text={note.note}
              labelClassName={note.note ? 'notes-nonempty-note-label' : 'notes-empty-note-label'}
              inputClassName={note.note ? 'form-control notes-nonempty-note-input' : 'form-control notes-empty-note-input'}
              inputWidth='95%'
              inputMaxLength={2000}
              onFocusOut={this.handleNoteUpdate(note)}
            />


          </div>
        )
      }
    } else {
      noteComponents.push(<div key="-1">No notes yet. Click on the functions below to start adding
        notes.</div>);
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

  handleNoteUpdate = note => text => {
    this.props.updateNote(note.id, text, note.state);
  };

  handleStateUpdate = (note, state) => () => {
    this.props.updateNote(note.id, note.note, state);
  };

  handleRemoveNote = id => () => {
    this.props.deleteNote(id);
  };

  handlePlayerSeek = seconds => () => {
    this.props.player.seekTo(seconds);
  };

  formatSeconds(seconds) {
    if (seconds >= 3600) {
      return moment.duration(seconds, 'seconds').format('h:mm:ss', {trim: false});
    } else {
      return moment.duration(seconds, 'seconds').format('m:ss', {trim: false});
    }
  }
}

const mapStateToProps = state => ({
  videos: state.videoTyping.videos,
  selectedVideoId: state.videoTyping.selectedVideoId,
  player: state.videoTyping.player
});

const mapDispatchToProps = dispatch => ({
  updateNote: (noteId, note, state) => dispatch(updateNote(noteId, note, state)),
  deleteNote: (noteId) => dispatch(deleteNote(noteId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
