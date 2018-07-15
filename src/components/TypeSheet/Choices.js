import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import ChoiceGroup from './ChoiceGroup';
import {setChoiceState} from '../../store/actions';
import './Choices.css';

class Choices extends Component {
  render() {

    console.log(this.props.videoChoices);

    const choiceGroupComponents = [];
    for (let i = 0; i < this.props.choiceGroups.length; i++) {
      const choiceGroup = this.props.choiceGroups[i];
      choiceGroupComponents.push(
        <ChoiceGroup key={i}
          choiceGroup={choiceGroup}
          choiceStates={this.props.choiceStates}
          crossReferences={this.props.crossReferences}
          matchedTypes={this.props.matchedTypes}
          videoChoices={this.props.videoChoices}
          setChoiceState={this.props.setChoiceState}
        />);
    }

    return (
      <div className="Choices">
        {choiceGroupComponents}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  choiceGroups: state.choicesAndTypes.choiceGroups,
  choiceStates: state.choicesAndTypes.choiceStates,
  crossReferences: state.choicesAndTypes.crossReferences,
  matchedTypes: state.choicesAndTypes.matchedTypes,
  videoChoices: _.reduce(_.map(_.flatMap(state.videoTyping.videos, video => video.notes), note => {
    return {choice: note.choice, state: note.state};
  }), (result, value, key) => {

    if (!result[value.choice]) {
      result[value.choice] = {};
    }

    if (!result[value.choice][value.state]) {
      result[value.choice][value.state] = 1;
    } else {
      result[value.choice][value.state]++;
    }

    return result;
  }, {})
});

const mapDispatchToProps = dispatch => ({
  setChoiceState: (choice, state) => dispatch(setChoiceState(choice, state))
});

export default connect(mapStateToProps, mapDispatchToProps)(Choices);
