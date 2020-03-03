import React, { useState } from 'react';
import Webcam from 'react-webcam';
import AWS from 'aws-sdk';
import { Grid, createMuiTheme, TextField, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { PhotoCamera } from '@material-ui/icons';
import Message from './Message';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios'


export default function Register() {
    const theme = createMuiTheme()
    const useStyles = makeStyles({
        title: {
            margin: theme.spacing(5)
        },
        button: {
            marginLeft: '1vw',
            marginTop: '2.7vh',
            width: '5vh',
            height: '5vh'
        },
        icon: {
            width: '5vh',
            height: '5vh',
        },
        webcam: {
            position: 'static',
        }

    });
    const classes = useStyles();

    const s3 = new AWS.S3({
        accessKeyId: process.env.REACT_APP_AWS_ACESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACESS_KEY
    });
    const [nickname, setNickname] = useState('');
    const [formStatus, setFormStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    const [imgB64, setImgB64] = useState('')

    const handleNickname = (event) => {
        setNickname(event.target.value);
    }

    // function handleRepeatedNickname() {
    //     setFormStatus('repeated nickname');
    // }

    // const promiseWithObjectsInBucket = (params) => {
    //     return new Promise((resolve, reject) => {
    //         s3.listObjects(params, (err, data) => {
    //             if (err) {
    //                 console.log(err, err.stack);
    //                 return reject(err);
    //             }
    //             let array = data.Contents
    //             return resolve(array)
    //         });
    //     })
    // }

    // const b64ToBlob = (base64) => {
    //     let byteString = atob(base64.split(',')[1]);
    //     let arrayBuffer = new ArrayBuffer(byteString.length);
    //     let uInt8Array = new Uint8Array(arrayBuffer);

    //     for (let i = 0; i < byteString.length; i++) {
    //         uInt8Array[i] = byteString.charCodeAt(i);
    //     }
    //     return new Blob([arrayBuffer], { type: 'image/jpeg' })
    // }

    // const sendImageToS3 = async (blob) => {
    //     setLoading(prevLoading => !prevLoading);
    //     const bucketName = 'lambda-talks-face';
    //     let paramsPutObject = {
    //         Body: blob,
    //         Bucket: bucketName,
    //         Key: `${nickname}.jpeg`
    //     };

    //     let paramsListObjects = {
    //         Bucket: bucketName
    //     };

    //     let arrayWithObjectsInBucket = [];
    //     try {
    //         arrayWithObjectsInBucket = await promiseWithObjectsInBucket(paramsListObjects);
    //         console.log(arrayWithObjectsInBucket);
    //     } catch (err) {
    //         console.log(err);
    //     }        
    //     if (arrayWithObjectsInBucket && arrayWithObjectsInBucket.length > 0) {
    //         let element = '';
    //         for (let index in arrayWithObjectsInBucket) {
    //             element = arrayWithObjectsInBucket[index].Key;                
    //             if (nickname.toLowerCase() === element.split('.')[0].toLowerCase()) {                    
    //                 handleRepeatedNickname();
    //                 setLoading(prevLoading => !prevLoading);
    //                 break;
    //             }
    //         }
    //     }
    //     if (!(formStatus === 'repeated nickname')) {
    //         s3.putObject(paramsPutObject, (err, data) => {
    //             if (err) console.log(err, err.stack);
    //             else {                    
    //                 setFormStatus('success');
    //                 console.log(setFormStatus);
    //                 setLoading(prevLoading => !prevLoading);                
    //             };
    //         });
    //     } else {

    //         console.log("Nickname já existente");
    //     }
    // }

    const videoConstraints = {
        facingMode: 'user'
    }

    const webcamRef = React.useRef(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        const imageSrc = webcamRef.current.getScreenshot();
        const API_URL_BASE = process.env.REACT_APP_API_URL_BASE
        console.log('Api URL', API_URL_BASE)
        axios({
            method: 'post',
            url: API_URL_BASE + '/index',
            data: {
                "nickname": nickname,
                "data": imageSrc
            },
            headers: {
                "Content-Type": "application/json",
                "X-Api-Key": process.env.REACT_APP_API_KEY
            }
        })
            .then(res => {
                //success
                console.log(res)
            })
            .catch(res => {
                //error
                console.log(res)
            })
            .then(res => {
                //default callback
                console.log(res)
            })
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
                        width={480}
                        height={400}
                        ref={webcamRef}
                        screenshotFormat='image/jpeg'
                        className={classes.webcam}
                        videoConstraints={videoConstraints}
                    />
                </Grid>
                <Grid item>
                    <Grid container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item>
                            <form className={classes.root} noValidate autoComplete="off">
                                <TextField id="standard-basic" label="Nickname" onChange={handleNickname} />
                            </form>
                        </Grid>
                        <Grid item>
                            <IconButton onClick={handleSubmit} className={classes.button}>
                                <PhotoCamera />
                            </IconButton>
                        </Grid>
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
                        <Message hiddenStatus={loading} status={formStatus} />
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}
