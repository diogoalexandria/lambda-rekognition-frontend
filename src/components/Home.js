import React from 'react';
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles';
import { Typography, Grid } from '@material-ui/core';

export default function Home() {
  let history = useHistory();
  const useStyles = makeStyles({
    home: {
      marginTop: '15vh'
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
        <Grid container>
          <Grid item>
            <Typography variant="h4">DALE!</Typography>
          </Grid>
          <Grid item>
            <Typography>Já é cadastrado? Clique no botão abaixo e seja redirecionado para ser reconhecido</Typography>
          </Grid>
          <Grid item>

          </Grid>
          <Grid item>

          </Grid>
          <Grid item>

          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );

}