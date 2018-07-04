import React, {Component} from 'react';
import Choices from './Choices';
import Types from './Types';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App container-fluid">
        <Choices/>
        <Types/>
      </div>
    );
  }
}

export default App;
