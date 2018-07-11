import React, {Component} from 'react';
import {connect} from 'react-redux';
import ChoiceGroup from './ChoiceGroup';
import {setChoiceState} from '../../store/actions';
import './Choices.css';

class Choices extends Component {
  render() {
    const choiceGroupComponents = [];
    for (let i = 0; i < this.props.choiceGroups.length; i++) {
      const choiceGroup = this.props.choiceGroups[i];
      choiceGroupComponents.push(
        <ChoiceGroup key={i}
          choiceGroup={choiceGroup}
          choiceStates={this.props.choiceStates}
          crossReferences={this.props.crossReferences}
          matchedTypes={this.props.matchedTypes}
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
  matchedTypes: state.choicesAndTypes.matchedTypes
});

const mapDispatchToProps = dispatch => ({
  setChoiceState: (choice, state) => dispatch(setChoiceState(choice, state))
});

export default connect(mapStateToProps, mapDispatchToProps)(Choices);
