import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import Header from './Header';
import TypeSheet from './TypeSheet';
import VideoTyping from './VideoTyping';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App container-fluid">
        <Header/>
        <Route exact path="/" component={TypeSheet}/>
        <Route path="/video" component={VideoTyping}/>
      </div>
    );
  }
}

export default App;
