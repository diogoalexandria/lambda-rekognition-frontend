import React from 'react';
import { useHistory } from 'react-router-dom'
import { makeStyles, createMuiTheme, withStyles } from '@material-ui/core/styles';
import { Typography, Grid, Button } from '@material-ui/core';





export default function Home() {
  let history = useHistory();

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#0082C1'
      },
      secondary: {
        main: '#FED420'
      }
    }
  })

  const SignUpButton = withStyles(theme => ({
    root: {
      color: theme.palette.getContrastText('#0082C1'),
      backgroundColor: '#0082C1',
      '&:hover': {
        backgroundColor: '#0060A0',
      },
    },
  }))(Button);

  const RecognizeButton = withStyles(theme => ({
    root:{
      color: theme.palette.getContrastText('#FED420'),
      backgroundColor: '#FED420',
      '&:hover':{
        color: theme.palette.getContrastText('#AD9223'),
        backgroundColor: '#AD9223'
      }
    }
  }))(Button)

  const useStyles = makeStyles({
    typography: {
      top: '5vh'
    },
    title: {
      marginBottom: '3vh'
    },
    signUpButton: {
      paddingTop: '2vh',
      paddingBottom: '2vh',
      paddingLeft: '3vw',
      paddingRight: '3vw',
      fontSize: '3vh',
      margin: '2vw',
    },

    recognizeButton: {
      margin: '1vw'
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
            <Typography variant="h3" className={classes.title}>Bem-vindxs!</Typography>
          </Grid>
          <Grid item>
            <Typography>Esta é uma simples aplicação de reconhecimento facial que foi montada usando AWS Lambda e Rekognition</Typography>
          </Grid>
          <Grid item>
            <Typography>Quer testar? Cadastre seu rosto ou a de um amigo aqui!</Typography>
          </Grid>
          <Grid item>
            <SignUpButton className={classes.signUpButton} variant="contained" color="primary" onClick={handleRegisterClick}>Cadastrar</SignUpButton>
          </Grid>
          <Grid item>
            <Typography className={classes.typography} variant="h6">Já cadastrou?</Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.typography}>Clique no botão abaixo e seja redirecionado para reconhecer</Typography>
          </Grid>
          <Grid item>
            <RecognizeButton className={classes.recognizeButton} variant="contained" color="secondary" size="large" onClick={handleRecognitionClick}>
              Reconhecer
            </RecognizeButton>
          </Grid>
          <Grid item>

          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );

}