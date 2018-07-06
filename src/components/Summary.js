import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Summary.css';
import getStackSummary from '../types/getStackSummary';

class Summary extends Component {
  render() {
    const matchedTypes = this.props.matchedTypes;

    if (matchedTypes.length !== 1) {
      return this.createNoMatch();
    }

    const type = matchedTypes[0];
    const summary = getStackSummary(type);

    if (!summary) {
      return this.createNoMatch();
    }

    const functionRows = this.createFunctionRows(summary);
    const animalRows = this.createAnimalRows(summary);

    return (
      <div className="Summary">
        <div className="summary-title">Summary</div>
        <div className="row">
          <div className="offset-4 col-4 summary-type">
            {type}
          </div>
          <div className="offset-4 col-3" style={{textAlign: 'center'}}>
            <table className="table">
              <thead className="thead-light">
              <tr>
                <th>Activate</th>
                <th>Sex</th>
                <th>Functions</th>
                <th>Saviors</th>
              </tr>
              </thead>
              <tbody>
              {functionRows}
              </tbody>
            </table>
          </div>
          <div className="col-1" style={{textAlign: 'center'}}>
            <table className="table">
              <thead className="thead-light">
              <tr>
                <th>Saviors</th>
                <th>Animal</th>
              </tr>
              </thead>
              <tbody>
              {animalRows}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  createNoMatch() {
    return (
      <div className="Summary">
        <div className="summary-title">Summary</div>
        <div className="row">
          <div className="summary-no-match col">
            (No summary yet)
          </div>
        </div>
      </div>
    );
  }

  createFunctionRows(summary) {
    const rows = [];

    for (let i = 0; i < summary.functions.length; i++) {
      const func = summary.functions[i];

      rows.push(
        <tr key={i}>
          <td>{func.activations}</td>
          <td>{func.sex}</td>
          <td className="bold">{func.func}</td>
          <td>{func.usage}</td>
        </tr>
      )
    }

    return rows;
  }

  createAnimalRows(summary) {
    const rows = [];

    for (let i = 0; i < summary.animals.length; i++) {
      const animal = summary.animals[i];

      rows.push(
        <tr key={i}>
          <td>{animal.usage}</td>
          <td className="bold">{animal.animal}</td>
        </tr>
      )
    }

    return rows;
  }
}

const mapStateToProps = state => ({
  types: state.choicesAndTypes.types,
  matchLevels: state.choicesAndTypes.matchLevels,
  matchedTypes: state.choicesAndTypes.matchedTypes
});

export default connect(mapStateToProps)(Summary);
