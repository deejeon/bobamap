import React from 'react';
import { Router } from '@reach/router';

import './App.css';
import logo from './logo.png';

import Main from './views/Main';
import SingleStore from './views/SingleStore';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img className="App-logo" src={logo} alt="Logo" height='100%'/>
      </header>
      <Router>
        <Main path="/"/>
        <SingleStore path="stores/:alias" />
      </Router>
    </div>
  );
}

export default App;
