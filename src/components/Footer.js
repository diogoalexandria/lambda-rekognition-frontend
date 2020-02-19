import React from 'react'
import {makeStyles} from '@material-ui/styles'
import garagemLogo from './../assets/garagem.png'
import {Grid} from '@material-ui/core'

export default function Footer(props){
    const useStyles = makeStyles({
        footer:{
            width: '100vw',
            marginRight: 0,
            padding: 0,
            backgroundColor: '#000000',
            position: 'absolute',
            height: '14vh',
            left: 0,
            marginTop: '2vh',
            top: '84vh',
        },
        garagemLogo: {
            marginTop: '2vh',
            width: '37vh',
            height: '10vh',
        },

    })
    
    const classes = useStyles()
    return (
        <React.Fragment>
            <div className={classes.footer}>
                <Grid container
                    direction='row'
                    alignItems='center'
                    justify='center'
                >
                    <Grid item>    
                        <img alt="Logo da garagem digital" src={garagemLogo} className={classes.garagemLogo}/>
                    </Grid>
                </Grid>

            
            </div>
        </React.Fragment>
    )

}