import React, {Component} from 'react';
import Header from './Header';
import Choices from './Choices';
import Types from './Types';
import Summary from './Summary';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App container-fluid">
        <Header/>
        <Choices/>
        <Types/>
        <Summary/>
      </div>
    );
  }
}

export default App;
