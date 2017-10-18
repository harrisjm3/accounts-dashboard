import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Accounts from './components/Accounts';
import Holdings from './components/Holdings';

const accountsData = require('./data/accounts.json');
const holdingsData = require('./data/holdings.json');

class App extends Component {

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Example Code</h1>
        </header>
        <div className="App-intro">
          <Holdings holdingsData={holdingsData.Positions} />
          <Accounts accountsData={accountsData.Accounts}
                    holdingsData={holdingsData.Positions}/>
        </div>
        <br/><br/><br/><br/>
      </div>
    );
  }
}

export default App;
