import React, {Component} from 'react';

import './EasyChoices.css';
import {connect} from 'react-redux';

class EasyChoices extends Component {
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
      <div className="EasyChoices">
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

  clickChoice(choice) {
    return () => {
      console.log('User clicked on ' + choice);
      // handle user clicking on choice
    };
  }

}

const mapStateToProps = state => ({
  choiceGroups: state.choicesAndTypes.choiceGroups
});

const mapDispatchToProps = dispatch => ({
  //setChoiceState: (choice, state) => dispatch(setChoiceState(choice, state))
});

export default connect(mapStateToProps, mapDispatchToProps)(EasyChoices);
