import React from 'react';
import Webcam from 'react-webcam'
import { S3, Rekognition } from 'aws-sdk';

export default function Recognition(){
    const awsCredentials={       
        accessKeyId: process.env.REACT_APP_AWS_ACESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACESS_KEY
    }
    
    const s3 = new S3(awsCredentials)
    const rekognition = new Rekognition(awsCredentials)

    const webcamRef = React.useRef(null)
    const rekognizeImage = img => {
        console.log(img)
        rekognition.searchFacesByImage()
    }

    const handleSubmit = e => {
        let imgSrc = webcamRef.current.getScreenshot()
        // var params = {
        //     CollectionId: "",
        //     Image: ,
        //     MaxFaces: 1
        // }
        // rekognizeImage({
        // })
    }
    return (
        <React.Fragment>
            <h1>Recognition</h1>

            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat='image/jpeg'
            />
            <button onClick={handleSubmit}>Tirar Foto</button>

        </React.Fragment>
    )
}