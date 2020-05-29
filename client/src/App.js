import React from 'react';
import { Router, Link } from '@reach/router';

import './App.css';
import logo from './logo.png';

import Main from './views/Main';
import SingleStore from './views/SingleStore';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Link to="/">
          <img className="App-logo" src={logo} alt="Logo" height='100%'/>
        </Link>
      </header>
      <Router>
        <Main path="/"/>
        <SingleStore path="stores/:id" />
      </Router>
    </div>
  );
}

export default App;
