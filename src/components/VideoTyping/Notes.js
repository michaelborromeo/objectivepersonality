import React, {Component} from 'react';

import './Notes.css';
import {connect} from 'react-redux';

class Notes extends Component {
  render() {
    return (
      <div className="Notes">
        Notes
      </div>
    );
  }
}

const mapStateToProps = state => ({
  choiceGroups: state.choicesAndTypes.choiceGroups
});

const mapDispatchToProps = dispatch => ({
  //setChoiceState: (choice, state) => dispatch(setChoiceState(choice, state))
});

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
