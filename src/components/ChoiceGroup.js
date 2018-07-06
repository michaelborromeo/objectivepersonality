import React, {Component} from 'react';
import _ from 'lodash';
import {getCrossReferencesForChoice} from '../types/crossReferences';
import './ChoiceGroup.css';

import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';
import VirtualizedSelect from 'react-virtualized-select';

class ChoiceGroup extends Component {
  render() {
    const foundMatch = this.props.matchedTypes.length === 1;
    const impossibleType = this.props.matchedTypes.length === 0;

    // need to create a choice state that's usable by the select component
    const choiceStates = _.transform(this.props.choiceStates, (result, value, key) => {
      result[key] = {value, label: value};
    });

    const choiceGroup = this.props.choiceGroup;

    const choicePairComponents = [];
    for (let i = 0; i < choiceGroup.choicePairs.length; i++) {
      const choicePair = choiceGroup.choicePairs[i];

      if (!choicePair.length) {
        choicePairComponents.push(
          <div key={i} className="choice-group-blank"/>
        );
      } else {
        choicePairComponents.push(
          <div key={i} className="choice-group-pair row">
            <div className="choice-group-description-left col-4 align-self-center">
              {choicePair[0].description} {this.renderParenthetical(choicePair[0].parenthetical)}
              <div className="choice-group-cross-references">
                {this.formatCrossReferences(choicePair[0].choice)}
              </div>
            </div>
            <div className="choice-group-choice col-1 align-self-center">{choicePair[0].choice}</div>
            <div
              className={`choice-group-state col-1 align-self-center ${foundMatch ? 'found-match' : ''} ${impossibleType ? 'impossible-type' : ''}`}>
              {this.renderStateSelect(choicePair[0].choice, choicePair[0].states, choiceStates)}
            </div>
            <div
              className={`choice-group-state col-1 align-self-center ${foundMatch ? 'found-match' : ''} ${impossibleType ? 'impossible-type' : ''}`}>
              {this.renderStateSelect(choicePair[1].choice, choicePair[1].states, choiceStates)}
            </div>
            <div className="choice-group-choice col-1 align-self-center">{choicePair[1].choice}</div>
            <div className="choice-group-description-right col-4 align-self-center">
              {this.renderParenthetical(choicePair[1].parenthetical)} {choicePair[1].description}
              <div className="choice-group-cross-references">
                {this.formatCrossReferences(choicePair[1].choice)}
              </div>
            </div>
          </div>
        );
      }
    }

    return (
      <div className="ChoiceGroup">
        <div className="choice-group-name">{choiceGroup.group}</div>
        <div className="choice-group">
          {choicePairComponents}
        </div>
      </div>
    );
  }

  renderParenthetical(parenthetical) {
    if (parenthetical) {
      return ' (' + parenthetical + ')';
    }

    return '';
  }

  renderStateSelect(choice, states, choiceStates) {
    return (
      <VirtualizedSelect
        placeholder=""
        options={this.addQuestionMarksToStates(states)}
        onChange={selectValue => this.updateChoiceState(choice, selectValue)}
        value={choiceStates[choice]}
      />
    );
  }

  updateChoiceState(choice, selectValue) {
    this.props.setChoiceState(choice, selectValue ? selectValue.value : null);
  }

  addQuestionMarksToStates(states) {
    const updatedStates = _.flatMap(states, state => {
      return [{
        label: state + '?', value: state + '?'
      }, {
        label: state, value: state
      }]
    });

    updatedStates.unshift({label: '?', value: '?'});

    return updatedStates;
  }

  formatCrossReferences(choice) {
    const crossReferences = getCrossReferencesForChoice(this.props.crossReferences, choice);

    if (!crossReferences.length) {
      return '(No cross references)';
    }

    const components = [<span key="-2">Cross references: </span>];
    for (let i = 0; i < crossReferences.length; i++) {
      components.push(<b className="choice-group-cross-reference" key={i}>{crossReferences[i]} </b>);
    }

    return components;
  }
}

export default ChoiceGroup;
