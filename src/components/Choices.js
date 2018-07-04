import React, {Component} from 'react';
import {connect} from 'react-redux';
import ChoiceGroup from './ChoiceGroup';
import './Choices.css';

class Choices extends Component {
  render() {
    const choiceGroupComponents = [];
    for (let i = 0; i < this.props.choiceGroups.length; i++) {
      const choiceGroup = this.props.choiceGroups[i];
      choiceGroupComponents.push(<ChoiceGroup key={i} choiceGroup={choiceGroup}/>);
    }

    return (
      <div className="Choices">
        {choiceGroupComponents}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  choiceGroups: state.choicesAndTypes.choiceGroups
});

export default connect(mapStateToProps)(Choices);
