import React from 'react';
import Webcam from 'react-webcam'
import { Rekognition } from 'aws-sdk';
import { IconButton, Grid, createMuiTheme, Typography } from '@material-ui/core'
import { PhotoCamera } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'

export default function Recognition() {

    const [nickname, setNickname] = React.useState('')
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
        rekognition.searchFacesByImage(params, (err, data) => {
            if (err) console.log(err, err.stack)
            else setNickname(data.FaceMatches[0].Face.ExternalImageId)
        })
    }

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

    const handleSubmit = e => {
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
        rekognizeImage(params)
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
                    <IconButton onClick={handleSubmit} className={classes.button}>
                        <PhotoCamera className={classes.icon}/>
                    </IconButton>
                </Grid>
                <Grid item>
                    <Typography hidden={!nickname}>Olá, {nickname}!</Typography>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}