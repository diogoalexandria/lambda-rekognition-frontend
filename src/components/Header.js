import React from 'react';
import { Grid, Link, AppBar } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useHistory } from 'react-router-dom';
import logo from './../assets/garagemlogo.png';
export default function Header() {

  const history = useHistory();

  const useStyles = makeStyles({
    garagemLogo: {
      width: '6vh',
      height: '8vh',
    },
    header: {
      backgroundColor: '#222222',
      position: 'fixed',
      padding: '1vh'
    },
    link: {
      color:'white',
      fontFamily: 'Verdana, sans-serif',
      fontSize: '3vh'
    }
  });

  const classes = useStyles();

  const handleCadastrarClick = e => {
    history.push('/register')
  };

  const handleRecognizeClick = e => {
    history.push('/recognition')
  };

  const handleLogoClick = e => {
    history.push('/')
  };

  return (
    <React.Fragment>
      <AppBar position="fixed" className={classes.header}>
        <Grid container
          alignItems='center'
          justify='space-evenly'
          direction='row'
        >
          <Grid item>
            <Link component="button" variant="body2" onClick={handleCadastrarClick} className={classes.link}>Cadastrar</Link>
          </Grid>
          <Grid item>
            <img alt='Logo da garagem digital' src={logo} onClick={() => handleLogoClick()} className={classes.garagemLogo} />
          </Grid>
          <Grid item>
            <Link component="button" variant="body2" onClick={handleRecognizeClick} className={classes.link}>Reconhecer</Link>
          </Grid>
        </Grid>
      </AppBar>
    </React.Fragment>
  )
};