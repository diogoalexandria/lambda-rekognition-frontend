import React from 'react';
import Webcam from 'react-webcam'
import { Rekognition } from 'aws-sdk';
import { IconButton, Grid, createMuiTheme, Typography } from '@material-ui/core';
import { PhotoCamera } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Recognition() {

    const [message, setMessage] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const awsCredentials = {
        accessKeyId: process.env.REACT_APP_AWS_ACESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACESS_KEY,
        region: 'us-east-1'
    }
    const rekognition = new Rekognition(awsCredentials)

    const webcamRef = React.useRef(null)
    const theme = createMuiTheme()
    const useStyles = makeStyles({
        title: {
            margin: theme.spacing(5)
        },
        button: {
            margin: theme.spacing(3),
            width: '5vh',
            height: '5vh',
            padding: 0
        },
        icon: {
            width: '5vh',
            height: '5vh'
        },
        webcam: {
            position: 'static',
            width: '90vw',
            height: '60vh'
        }

    })

    const rekognizeImage = params => {
        return new Promise((resolve, reject) => {
            rekognition.searchFacesByImage(params, (err, data) => {
                if (err) {
                    console.log(err, err.stack)
                    setMessage('ops')
                    return reject(err);
                }
                else {
                    setMessage(data.FaceMatches[0] ? `Olá ${data.FaceMatches[0].Face.ExternalImageId}!` : 'Nenhuma face foi reconhecida');
                    return resolve("Ok!");
                }
            })

<<<<<<< HEAD
=======
        })
    }


>>>>>>> 6f96ce0e62b10adcd702692c6b8f7be505d91432
    const getBinary = (b64img) => {
        let binaryImg = atob(b64img.split(',')[1]);
        let length = binaryImg.length
        let ab = new ArrayBuffer(length);
        let ua = new Uint8Array(ab)
        for (let i = 0; i < length; i++) {
            ua[i] = binaryImg.charCodeAt(i);
        }
        return ab
    }

    const handleSubmit = async e => {
        setLoading(true);
        console.log("Loading", loading)
        let imgSrc = webcamRef.current.getScreenshot()
        let img = getBinary(imgSrc)
        console.log(img)
        var params = {
            CollectionId: "lambda-talks",
            Image: {
                Bytes: img
            },
            MaxFaces: 1
        }
        await rekognizeImage(params)
        setLoading(false);
    }

    const classes = useStyles()

    const videoConstraints = {
        facingMode: 'user'
    }

    return (
        <React.Fragment>
            <Grid container
                direction="column"
                justify="center"
                alignItems="center"
            >

                <Grid item>
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat='image/jpeg'
                        className={classes.webcam}
                        videoConstraints={videoConstraints}
                    />
                </Grid>
                <Grid item>
<<<<<<< HEAD
                    <IconButton onClick={handleSubmit} className={classes.button}>
                        <PhotoCamera className={classes.icon}/>
=======
                    <IconButton hidden={loading} disabled={loading} onClick={handleSubmit} className={classes.button}>
                        <PhotoCamera />
>>>>>>> 6f96ce0e62b10adcd702692c6b8f7be505d91432
                    </IconButton>
                </Grid>
                <Grid item>
                    <Fade
                        in={loading}
                        style={{
                            transitionDelay: loading ? '800ms' : '0ms',
                        }}
                        unmountOnExit
                    >
                        <CircularProgress />
                    </Fade>
                </Grid>
                <Grid item>
                    <Typography hidden={loading}>{message}</Typography>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}