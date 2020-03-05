import React, { useState } from 'react';
import Webcam from 'react-webcam';

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
            marginTop: '2.7vh'

        },
        icon: {
            width: '3vh',
            height: '3vh',
        },
        webcam: {
            position: 'static',
            width: '80vw',
            height: '50vh',
            marginBottom: '2vh'
        },
        loading: {
            left: '50vw'
        }

    });
    const classes = useStyles();

    const [nickname, setNickname] = useState('');
    const [nicknameRegistered, setNicknameRegistered] = useState('');
    const [formStatus, setFormStatus] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleNickname = (event) => {
        setNickname(event.target.value);
    }

    const videoConstraints = {
        facingMode: 'user'
    }

    const webcamRef = React.useRef(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(prevLoading => !prevLoading);
        const imageSrc = webcamRef.current.getScreenshot();
        const API_URL_BASE = process.env.REACT_APP_API_URL_BASE
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
                if (res.data.matches) {
                    setFormStatus('face already registered');
                    setNicknameRegistered(res.data.matches);
                } else {
                    setFormStatus('success');
                }
            })
            .catch(res => {
                setFormStatus('error');
            })
            .then(res => {
                setLoading(false);
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
                        direction="column"
                        justify="center"
                        alignItems="center">
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
                        </Grid>
                        <Grid item>
                            <Fade
                                in={loading}
                                style={{
                                    transitionDelay: loading ? '400ms' : '0ms',
                                }}
                                unmountOnExit
                            >
                                <CircularProgress className={classes.loading} />
                            </Fade>
                        </Grid>

                        <Grid item>
                            <Message hiddenStatus={loading} nickname={nicknameRegistered} status={formStatus} />
                        </Grid>

                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}
