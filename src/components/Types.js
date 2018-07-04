import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Types.css';

class Types extends Component {
  render() {
    return (
      <div className="Types">
        ...types
      </div>
    );
  }
}

const mapStateToProps = state => ({
  types: state.choicesAndTypes.types,
  matchLevels: state.choicesAndTypes.matchLevels
});

export default connect(mapStateToProps)(Types);
