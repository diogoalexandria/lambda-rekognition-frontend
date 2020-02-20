import React from 'react';
import Webcam from 'react-webcam'
import { Rekognition } from 'aws-sdk';
import {IconButton, Grid, createMuiTheme} from '@material-ui/core'
import {PhotoCamera} from '@material-ui/icons'
import {makeStyles} from '@material-ui/styles'

export default function Recognition(){
    const awsCredentials={       
        accessKeyId: process.env.REACT_APP_AWS_ACESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACESS_KEY
    }
    const rekognition = new Rekognition(awsCredentials)
    
    const webcamRef = React.useRef(null)
    
    const theme = createMuiTheme()
    const useStyles = makeStyles({
        title: {
            margin: theme.spacing(5)
        },
        button: {
            margin: theme.spacing(3)
        },
        webcam: {
            position: 'static',
            marginTop: '15vh',
        }

    })
    
    const rekognizeImage = params => {
        return rekognition.searchFacesByImage(params)
    }

    const handleSubmit = e => {
        let imgSrc = webcamRef.current.getScreenshot()
        var params = {
            CollectionId: "lambda-talks",
            Image: imgSrc,
            MaxFaces: 1
        }
        console.log(rekognizeImage(params))
    }

    const classes = useStyles()
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
                        width={theme.spacing(65)}
                        height={theme.spacing(43)}
                        ref={webcamRef}
                        screenshotFormat='image/jpeg'
                        className={classes.webcam}
                    />
                </Grid>
                <Grid item>
                    <IconButton onClick={handleSubmit} className={classes.button}>
                        <PhotoCamera/>
                    </IconButton>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}