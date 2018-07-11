import React, {Component} from 'react';
import Share from './Share';
import Summary from './Summary';
import Choices from './Choices';
import Types from './Types';
import './index.css';

class TypeSheet extends Component {
  render() {
    return (
      <div className="TypeSheet">
        <Share/>
        <Summary/>
        <Choices/>
        <Types/>
      </div>
    );
  }
}

export default TypeSheet;
