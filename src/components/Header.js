import React from 'react'
import {Grid, Divider} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'
import logo from './../assets/garagemlogo.png'
export default function Header(){

    const useStyles = makeStyles({
        garagemLogo:{ 
          width:'12.5vh',
          height:'15vh',
        },
        header:{
            backgroundColor: '#000000',
            width: '100vw',
            marginBottom: '2vh'
        }
    })

    const classes = useStyles()
    
    const handleLogoClick = e => {
        console.log(e)
    }

    return(
        <React.Fragment>
                <Grid container
                alignItems='center'
                justify='center'
                direction='column'
                >
                    <Grid item>
                        <img alt='Logo da garagem digital' src={logo} onClick={handleLogoClick} className={classes.garagemLogo}/>
                    </Grid>
                    <Grid item>
                        <Divider variant="middle"/>
                    </Grid>
                </Grid>
      </React.Fragment>
    )
}