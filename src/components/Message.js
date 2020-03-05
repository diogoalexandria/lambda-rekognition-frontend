import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';


export default function Message(props) {
    const useStyles = makeStyles({
        messageError: {
            color: '#BF2222',
            fontSize: '120%',
        },
        messageSuccess: {
            color: '#37A116',
            fontSize: '120%',
        }
    });
    const classes = useStyles();

    const getMsg = (nick) => {
        const msgArray = [
            `Falaê ${nick}!`,
            `Ta bonitx a beça em, ${nick}! ;)`,
            `My name is Bond, ${nick} Bond`,
            `Te reconheci, ${nick}`,
            `DALE ${nick.toUpperCase()}!!!!`,
            `Obrigado por comparecer ao Talks ${nick} <3`,
        ]
        let msg = msgArray[Math.floor(Math.random() * Math.floor(msgArray.length))]
        return msg
    }



    const inputMessage = (status) => {
        switch (status) {
            case 'face already registered':
                return `Fala ${props.nickname}, sua face já foi cadastrada`
            case 'success':
                return props.nickname ? getMsg(props.nickname) : `Sucesso!`
            case 'no registered face detected':
                return 'Nenhum rosto foi encontrado!'
            case 'error':
                return 'Ops! Algo deu errado...'
            default:
                return
        }
    };

    return (
        <React.Fragment>
            <Typography hidden={props.hiddenStatus} className={props.status === 'success' ? classes.messageSuccess : classes.messageError}>{inputMessage(props.status)}</Typography>
        </React.Fragment>
    )
};