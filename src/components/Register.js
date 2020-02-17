import React, { useState } from 'react';
import Webcam from 'react-webcam';
import AWS from 'aws-sdk'

export default function Register() {
    const s3 = new AWS.S3({
        accessKeyId: process.env.REACT_APP_AWS_ACESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACESS_KEY
    });
    const [nickname, setNickname] = useState('');    

    const sendImageToS3 = (image) => {        
        const bucketName = 'lambda-talks-face'
        
        let paramsPutObject = { 
            Body: image,
            Bucket: bucketName,
            Key: `${nickname}`
        };

        let paramsListObjects = {
            Bucket: bucketName
        }

        let arrayWithObjectsInBucket = s3.listObjects(paramsListObjects, async (err, data) =>  {
            if(err) console.log(err, err.stack);
            else { 
                let array = data.Contents                               
                return array
            }
            return err;
        });

        console.log(arrayWithObjectsInBucket)
       

        // let sameNickname;
        // if(arrayWithObjectsInBucket) {
        //     sameNickname = arrayWithObjectsInBucket.filter( element => {
        //         return nickname === element.Key.split('.')[0]
        //     });
        // } else return

        // if(!sameNickname) {
        //     s3.putObject(paramsPutObject,(err,data) => {
        //         if(err) console.log(err, err.stack);
        //         else console.log(data);
        //     });
        // } else console.log("Nickname já existente")        
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
        </div>
    )
}
