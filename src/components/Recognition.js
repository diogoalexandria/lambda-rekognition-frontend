import React from 'react';
import Webcam from 'react-webcam'
import { Rekognition } from 'aws-sdk';
import { IconButton, Grid, createMuiTheme } from '@material-ui/core'
import { PhotoCamera } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'

export default function Recognition(){
    const awsCredentials={       
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
            margin: theme.spacing(3)
        },
        webcam: {
            position: 'static',
            marginTop: '15vh',
        }

    })
    
    const rekognizeImage = params => {
        rekognition.searchFacesByImage(params, (err,data)=>{
            if(err) console.log(err,err.stack)
            else console.log(data)
        })
    }

    const b64ToBlob = (base64) => {
        let byteString = atob(base64.split(',')[1]);
        let arrayBuffer = new ArrayBuffer(byteString.length);
        let uInt8Array = new Uint8Array(arrayBuffer);

        for (let i = 0; i < byteString.length; i++) {
            uInt8Array[i] = byteString.charCodeAt(i);
        }
        return new Blob([arrayBuffer], { type: 'image/jpeg' })
    }

    const handleSubmit = e => {
        let imgSrc = webcamRef.current.getScreenshot()
        let img = b64ToBlob(imgSrc)
        console.log(Buffer.from(imgSrc))
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