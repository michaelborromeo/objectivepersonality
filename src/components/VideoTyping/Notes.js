import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import _ from 'lodash';

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
        <div key={j} className="notes-note">
          <div className="notes-seconds">
            {this.formatSeconds(note.seconds)}
          </div>
          <div className="notes-choice">
            {note.choice ? note.choice + '' : ''}
          </div>
          <input className="form-control"/>
          {note.note}
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
  //setChoiceState: (choice, state) => dispatch(setChoiceState(choice, state))
});

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
