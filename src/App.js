import './App';
import React from 'react';
import Nav from './components/Nav'
import Home from './components/Home'
import Register from './components/Register'
import Recognition from './components/Recognition'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'


function App() {  
  
  return (
    <Router>
      <div className="app">
        <Nav/>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/register" component={Register}/>
          <Route path="/recognition" component={Recognition}/>          
        </Switch>
      </div>
    </Router>
  );  
}

export default App;
