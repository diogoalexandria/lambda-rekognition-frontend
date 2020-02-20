import React from 'react'
import {makeStyles} from '@material-ui/styles'
import garagemLogo from './../assets/garagem.png'
import {Grid, AppBar} from '@material-ui/core'

export default function Footer(props){
    const useStyles = makeStyles({
        footer:{
            backgroundColor: '#222222',
            position: 'fixed',
            top: 'auto',
            bottom: 0,
            padding: '1vh',
        },
        garagemLogo: {
            width: '30vh',
            height: '8vh',
        },

    })
    
    const classes = useStyles()
    return (
        <React.Fragment>
            <AppBar className={classes.footer}>
                <Grid container
                    direction='row'
                    alignItems='center'
                    justify='center'
                >
                    <Grid item>    
                        <img alt="Logo da garagem digital" src={garagemLogo} className={classes.garagemLogo}/>
                    </Grid>
                </Grid>

            
            </AppBar>
        </React.Fragment>
    )

}