import './App';
import React from 'react';
import Home from './components/Home';
import Register from './components/Register';
import Recognition from './components/Recognition';
import Footer from './components/Footer';
import { makeStyles } from '@material-ui/core/styles'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';



function App() {  

  const useStyles = makeStyles({
    header:{
      marginBottom: '15vh'
    }
  })

  const classes = useStyles()
  return (
    <Router>
      <div className="app">
        <div className={classes.header}>
          <Header/>
        </div>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/register" component={Register}/>
          <Route path="/recognition" component={Recognition}/>          
        </Switch>
        <Footer/>
      </div>
    </Router>
  );  
};

export default App;
