import React, { useState } from 'react';
import Webcam from 'react-webcam';
import AWS from 'aws-sdk'

export default function Register() {
    const s3 = new AWS.S3({
        accessKeyId: process.env.REACT_APP_AWS_ACESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACESS_KEY
    });
    const [nickname, setNickname] = useState('');
    const [repeatedNickname, setRepeatedNickname] = useState(false);
    
    function handleRepeatedNickname() {
        setRepeatedNickname(!repeatedNickname);
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
            let elementl            
            for (let index in arrayWithObjectsInBucket) {
                                
                if (nickname.toLowerCase() === arrayWithObjectsInBucket[index].Key.split('.')[0].toLowerCase()) {
                    handleRepeatedNickname();                    
                    break;
                }
            }
        }
        if(!repeatedNickname) {
            s3.putObject(paramsPutObject,(err,data) => {
                if(err) console.log(err, err.stack);
                else console.log(data);
            });
        } else {
            console.log("Nickname já existente");           
        }
    }

    const webcamRef = React.useRef(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        const imageSrc = webcamRef.current.getScreenshot();
        sendImageToS3(imageSrc);
    }

    return (
        <div>
            <h1>Registro de face</h1>
            <Webcam
                audio={false}
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
            {repeatedNickname? <span>Nickname já está sendo utilizado</span>:null}
        </div>
    )
}
