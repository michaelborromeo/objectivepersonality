import React, {Component} from 'react';
import {connect} from 'react-redux';
import uuid from 'uuid/v4';

import {addNote} from '../../store/actions';
import './ChoiceSelector.css';

class ChoiceSelector extends Component {
  flatChoices = null;

  render() {
    const flatChoices = this.getFlatChoices();
    const choiceComponents = [];

    for (let i = 0; i < flatChoices.length; i++) {
      const choice = flatChoices[i];

      choiceComponents.push(
        <div onClick={choice.onClick} key={choice.choice} className="easychoice-choice">
          {choice.choice}
          <div className="easychoice-description">
            {choice.description}
          </div>
        </div>
      );
    }

    return (
      <div className="ChoiceSelector">
        <div className="easychoice-grid">
          {choiceComponents}
        </div>
      </div>
    );
  }

  getFlatChoices() {
    if (this.flatChoices) {
      return this.flatChoices;
    }

    this.flatChoices = [];
    const choiceGroups = this.props.choiceGroups;

    for (let i = 0; i < choiceGroups.length; i++) {
      const choicePairs = choiceGroups[i].choicePairs;

      for (let j = 0; j < choicePairs.length; j++) {
        const choicePair = choicePairs[j];

        for (let k = 0; k < choicePair.length; k++) {
          const choice = choicePair[k];

          this.flatChoices.push({
            choice: choice.choice,
            description: choice.description,
            onClick: this.clickChoice(choice.choice)
          })
        }
      }
    }

    return this.flatChoices;
  }

  clickChoice = (choice) => () => {
    this.props.addNote(uuid(), this.props.player.getCurrentTime(), choice)
  }
}

const mapStateToProps = state => ({
  choiceGroups: state.choicesAndTypes.choiceGroups,
  enabled: !!state.videoTyping.selectedVideoId,
  player: state.videoTyping.player
});

const mapDispatchToProps = dispatch => ({
  addNote: (noteId, videoSeconds, choice) => dispatch(addNote(noteId, videoSeconds, choice))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChoiceSelector);
