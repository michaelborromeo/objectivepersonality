import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Types.css';

//const animals = ['SC/B', 'SC/P', 'SB/C', 'SB/P', 'CS/B', 'CS/P', 'CP/S', 'CP/B', 'BS/C', 'BS/P', 'BP/S', 'BP/C', 'PC/S', 'PC/B', 'PB/S', 'PB/C'];
const temperaments = ['IxxP', 'IxxJ', 'ExxP', 'ExxJ'];

class Types extends Component {

  render() {
    const temperamentComponents = [];
    for (let i = 0; i < temperaments.length; i++) {
      const typeColumns = [];

      for (let j = 0; j < this.props.types.length; j++) {
        const type = this.props.types[j];
        const matchLevel = this.getMatchLevel(type.type);

        if (type.derivedChoices.includes(temperaments[i]) && matchLevel > 0) {
          typeColumns.push(
            <div
              key={type.type}
              style={{
                opacity: this.getTypeOpacity(type.type),
                fontWeight: matchLevel === 100 ? 'bold' : 'normal'
              }}
              className={'types-type types-temperaments-' + temperaments[i] + ' col-1'}>
              {type.type}
            </div>
          )
        }
      }

      temperamentComponents.push(
        <div key={i} className="types-temperaments">
          <div className="types-temperaments-name">{temperaments[i]}</div>
          <div className="row">
            {typeColumns.length ? typeColumns :
              <div className="types-temperaments-empty">(No matching {temperaments[i]}s)</div>}
          </div>
        </div>
      );
    }

    return (
      <div className="Types">
        {temperamentComponents}
      </div>
    );
  }

  getMatchLevel(type) {
    const level = this.props.matchLevels[type];

    return isNaN(level) ? 100 : level;
  }

  getTypeOpacity(type) {
    return this.getMatchLevel(type) / 100;
  }
}

const mapStateToProps = state => ({
  types: state.choicesAndTypes.types,
  matchLevels: state.choicesAndTypes.matchLevels
});

export default connect(mapStateToProps)(Types);
