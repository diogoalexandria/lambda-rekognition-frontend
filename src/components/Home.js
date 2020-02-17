import React from 'react';
import '../css/Home.css';
import { useHistory } from 'react-router-dom'

export default function Home() {
    let history = useHistory();

    function handleRegisterClick() {
        history.push("/register");
    };

    function handleRecognitionClick() {
        history.push("/recognition");        
    }
    return (
         
    <React.Fragment>     
        <div className="Home">
            {process.env.NODE_ENV === "development"?<small>You are running this app in <b>{process.env.NODE_ENV }</b> mode</small>:null}
            <button type="button" className="send-button" onClick={ handleRegisterClick }>Cadastrar</button>            
            <button type="button" className="send-button" onClick={ handleRecognitionClick }>Reconhecer</button>           
        </div>             
    </React.Fragment>
  );
    
}