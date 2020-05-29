import React from 'react';
import { Router } from '@reach/router';

import './App.css';
import logo from './logo.png';

import Main from './views/Main';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img className="App-logo" src={logo} alt="Logo" height='100%'/>
      </header>
      <Router>
        <Main path="/"/>
      </Router>
    </div>
  );
}

export default App;
