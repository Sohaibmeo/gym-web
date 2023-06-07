import React,{useEffect, useRef, useState} from 'react';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';
import { Box } from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';

function Announcement() {
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoWidth = 640;
  const videoHeight = 480;
  const canvasRef = useRef();

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + '/models';
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]);
      setModelsLoaded(true);
    };
    loadModels();
  }, []);

  const handleVideoOnPlay = async () => {
    if (canvasRef.current && videoLoaded) {
      const video = document.getElementById('video');
      canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(video);
      const displaySize = {
        width: videoWidth,
        height: videoHeight,
      };

      faceapi.matchDimensions(canvasRef.current, displaySize);

      setInterval(async () => {
        const detections = await faceapi
          .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceExpressions();

        const resizedDetections = faceapi.resizeResults(detections, displaySize);

        const context = canvasRef.current.getContext('2d');
        context.clearRect(0, 0, videoWidth, videoHeight);
        faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);
      }, 100);
      setInterval(async ()=>{
        const result =   await faceapi
        .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor();

        if(result){
          try{
           const body = { data: result.descriptor };
           toast.info("Someone Detected");
           const response = await axios.post('http://localhost:8000/api/users/compareDescriptor', body)
           if(response.status === 200){
             console.log("Response from backend : ",response.data)
             toast.success("Someone Matched")
           }else{
            console.error("Its all fucked")
           }
        }catch(error) {
          console.error("Another error",error)
        }

        }else{
          toast.error("No One Detected")
        }
      }, 10000)
    }
  };

  return (
    <Box>
      {modelsLoaded ? (
          <Box>
            <Box style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
              <Webcam
                id="video"
                onUserMedia={() => setVideoLoaded(true)}
                width={videoWidth}
                height={videoHeight}
                onPlay={handleVideoOnPlay}
                style={{ borderRadius: '10px' }}
              />
              <Box
                component="canvas"
                ref={canvasRef}
                style={{ position: 'absolute' }}
              />
            </Box>
          </Box>
        ) : (
          <Box>Loading models...</Box>
        )}
    </Box>
  );
}

export default Announcement;
