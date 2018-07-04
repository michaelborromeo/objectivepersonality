import React, {Component} from 'react';
import _ from 'lodash';
import './ChoiceGroup.css';

import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';
import VirtualizedSelect from 'react-virtualized-select';

class ChoiceGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const choiceGroup = this.props.choiceGroup;

    const choicePairComponents = [];
    for (let i = 0; i < choiceGroup.choicePairs.length; i++) {
      const choicePair = choiceGroup.choicePairs[i];

      if (!choicePair.length) {
        choicePairComponents.push(
          <div key={i} className="choice-group-blank"/>
        );
      } else {
        choicePairComponents.push(<div key={i} className="choice-group-pair row">
            <div className="choice-group-description-left col-4 align-middle">
              {choicePair[0].description} {choicePair[0].parenthetical}
            </div>
            <div className="choice-group-choice col-1 align-middle">{choicePair[0].choice}</div>
            <div className="choice-group-state col-1">
              {this.renderStateSelect(choicePair[0].choice, choicePair[0].states)}
            </div>
            <div className="choice-group-state col-1">
              {this.renderStateSelect(choicePair[1].choice, choicePair[1].states)}
            </div>
            <div className="choice-group-choice col-1">{choicePair[1].choice}</div>
            <div className="choice-group-description-right col-4">
              {choicePair[0].parenthetical} {choicePair[1].description}
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

  renderStateSelect(choice, states) {
    return (
      <VirtualizedSelect
        placeholder=""
        options={this.addQuestionMarksToStates(states)}
        onChange={(selectValue) => this.setState({[choice]: selectValue})}
        value={this.state[choice]}
      />
    );
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
}

export default ChoiceGroup;
