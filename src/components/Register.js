import React, { useState } from 'react';
import Webcam from 'react-webcam';
import AWS from 'aws-sdk'

export default function Register() {
    const s3 = new AWS.S3({
        accessKeyId: process.env.REACT_APP_AWS_ACESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACESS_KEY
    });
    const [nickname, setNickname] = useState('');
    const [formStatus, setFormStatus] = useState('');
    
    function handleRepeatedNickname() {
        setFormStatus('repeated nickname');
    }

    const promiseWithObjectsInBucket = (params) => {
        return new Promise((resolve, reject) => {
            s3.listObjects(params, (err, data) =>  {
                if(err){
                    console.log(err, err.stack);
                    return reject(err);
                }
                let array = data.Contents                               
                return resolve(array)
            });
        })
    }

    const sendImageToS3 = async (image) => {        
        const bucketName = 'lambda-talks-face';        
        let paramsPutObject = { 
            Body: image,
            Bucket: bucketName,
            Key: `${nickname}`
        };

        let paramsListObjects = {
            Bucket: bucketName
        };

        let arrayWithObjectsInBucket = [];
        try {
            arrayWithObjectsInBucket = await promiseWithObjectsInBucket(paramsListObjects);            
        } catch (err) {
            console.log(err);
        }        
        if (arrayWithObjectsInBucket && arrayWithObjectsInBucket.length > 0) {
            let element = '';            
            for (let index in arrayWithObjectsInBucket) {
                element = arrayWithObjectsInBucket[index].Key;                                              
                if (nickname.toLowerCase() === element.split('.')[0].toLowerCase()) {
                    handleRepeatedNickname();                    
                    break;
                }
            }
        }
        if(formStatus === 'repeated nickname') {
            s3.putObject(paramsPutObject,(err,data) => {
                if(err) console.log(err, err.stack);
                else {
                    console.log(data)
                    setFormStatus('success')
                };
            });
        } else {
            console.log("Nickname já existente");           
        }
    }

    const webcamRef = React.useRef(null);

    const handleSubmit = (event) => {
        setFormStatus('')
        event.preventDefault();
        const imageSrc = webcamRef.current.getScreenshot();
        console.log(`Base64: ${imageSrc}`)
        sendImageToS3(imageSrc);
    }

    return (
        <div>
            <h1>Registro de face</h1>
            <Webcam
                audio={false}
                height={480}
                width={640}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
            />
            <form onSubmit={handleSubmit}>
                <label>
                    Nickname:
                    <input type="text" name="nickname" value={nickname} onChange={(e) => setNickname(e.target.value)}></input>                    
                </label>
                <input type="submit" value="Tirar foto"></input>                
            </form>
            <span hidden={!formStatus}>{formStatus}</span>
        </div>
    )
}
