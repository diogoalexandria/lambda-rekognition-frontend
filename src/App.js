import './App';
import React from 'react';
import Home from './components/Home'
import Register from './components/Register'
import Recognition from './components/Recognition'
import Footer from './components/Footer'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import {makeStyles} from '@material-ui/styles'
import Header from './components/Header'



function App() {  
  return (
    <Router>
      <div className="app">
        <Header/>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/register" component={Register}/>
          <Route path="/recognition" component={Recognition}/>          
        </Switch>
        <Footer/>
      </div>
    </Router>
  );  
}

export default App;
