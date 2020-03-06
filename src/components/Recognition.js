import React from 'react';
import Webcam from 'react-webcam'
import { Rekognition } from 'aws-sdk';
import { IconButton, Grid, createMuiTheme } from '@material-ui/core';
import { PhotoCamera, FlipCameraIos } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';
import Message from './Message'

export default function Recognition() {
    const [nickname, setNickname] = React.useState('');
    const [status, setStatus] = React.useState('');
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
            width: '4vh',
            height: '4vh',
            padding: 0
        },
        icon: {
            width: '4vh',
            height: '4vh'
        },
        webcam: {
            position: 'static',
            width: '80vw',
            height: '50vh',
            marginBottom: '2vh'
        }

    })

    const rekognizeImage = params => {
        return new Promise((resolve, reject) => {
            rekognition.searchFacesByImage(params, (err, data) => {
                if (err) {
                    console.log(err, err.stack)
                    setStatus('error')
                    return reject(err);
                }
                else {
                    setStatus(data.FaceMatches[0] ? 'success' : 'no registered face detected');
                    setNickname(data.FaceMatches[0] ? data.FaceMatches[0].Face.ExternalImageId : '')
                    return resolve("Ok!");
                }
            })
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


    const handleSubmit = async e => {
        setLoading(true);
        let imgSrc = webcamRef.current.getScreenshot()
        let img = getBinary(imgSrc)
        var params = {
            CollectionId: "lambda-talks",
            Image: {
                Bytes: img
            },
            MaxFaces: 1
        }
        try{
            await rekognizeImage(params)
        } catch(e){
            console.error(e)
        }
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
                    <IconButton onClick={handleSubmit} className={classes.button} disabled={loading}>
                        <PhotoCamera className={classes.icon} />
                    </IconButton>
                </Grid>
                <Grid item>
                    <Fade
                        in={loading}
                        style={{
                            transitionDelay: loading ? '400ms' : '0ms',
                        }}
                        unmountOnExit
                    >
                        <CircularProgress />
                    </Fade>
                </Grid>
                <Grid item>
                    <Message hiddenStatus={loading} status={status} nickname={nickname} />
                    {/* <Typography hidden={loading}>{message}</Typography> */}
                </Grid>
            </Grid>
        </React.Fragment>
    )
}