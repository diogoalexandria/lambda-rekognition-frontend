import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export default function Message(props) {   
    const useStyles = makeStyles({
        messageError: {
            color: '#BF2222'
        }, 
        messageSuccess: {
            color: '#37A116'
        }
    });
    const classes = useStyles();

    const inputMessage = (status) => {       
        switch(status){
            case 'repeated nickname':                
                return 'Nickname já utilizado!'
            case 'success':                
                return 'Foto enviada!'
            default:
                return
        }        
    };

    return (
        <React.Fragment>
            <Typography hidden={props.hiddenStatus} className={props.status==='success'?classes.messageSuccess:classes.messageError}>{inputMessage(props.status)}</Typography>
        </React.Fragment>
    )
};