import React from 'react';
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles';
import { Typography, Grid, Button } from '@material-ui/core';

export default function Home() {
  let history = useHistory();
  const useStyles = makeStyles({
    home: {
      marginTop: '15vh'
    },
    typography: {
      top: '5vh'
    }
  })

  const classes = useStyles()
  function handleRegisterClick() {
    history.push("/register");
  };

  function handleRecognitionClick() {
    history.push("/recognition");
  }
  return (

    <React.Fragment>
      <div className={classes.home}>
        <Grid container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid item>
            <Typography variant="h4">DALE! Chega aí</Typography>
          </Grid>
          <Grid item>
            <Typography>Cadastra o rosto de alguém aqui</Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={ handleRegisterClick }>Cadastrar</Button>
          </Grid>
          <Grid item>
            <Typography className={classes.typography}>Já tá cadastrado?</Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.typography}>Clique no botão abaixo e seja redirecionado para ser reconhecido</Typography>
          </Grid>            
          <Grid item>
            <Button variant="contained" color="secondary" size="large" onClick={ handleRecognitionClick }>
              Reconhecer
            </Button>
          </Grid>
          <Grid item>

          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );

}