import React, { useState } from 'react';
import Webcam from 'react-webcam';
import AWS from 'aws-sdk'

export default function Register() {
    const s3 = new AWS.S3({ accessKeyId: '', secretAccessKey: '' });
    const [nickname, setNickname] = useState('');

    const sendImageToS3 = (image) => {
        let params = { Body: image, Bucket: 'lambda-talks-register-face', Key: `${nickname}` };
        s3.putObject(params,function(err,data) {
            console.log(err, data);
        });       
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
