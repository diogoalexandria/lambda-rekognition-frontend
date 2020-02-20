import React from 'react'
import { Typography } from '@material-ui/core'

export default function Message(props) {   

    const inputMessage = (status) => {
        console.log(status)
        switch(status){
            case 'repeated nickname':
                return 'Nickname já utilizado!'
            case 'success':
                return 'Foto enviada!'
            default:
                return
        }        
    }

    return (
        <React.Fragment>
            <Typography>{inputMessage(props.status)}</Typography>
        </React.Fragment>
    )
}