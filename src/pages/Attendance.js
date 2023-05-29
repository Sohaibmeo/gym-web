import React, { useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import { detectAllFaces, fetchImage, loadSsdMobilenetv1Model } from 'face-api.js';
import { TinyFaceDetectorOptions } from 'face-api.js';

function Attendance() {
  const webcamRef = React.useRef(null);
  const [modelLoaded, setModelLoaded] = useState(false);

  useEffect(() => {
    // Load the face detection model asynchronously
    async function loadModel() {
      await loadSsdMobilenetv1Model('/models'); // Adjust the path to match the location of your model files
      setModelLoaded(true);
    }
    loadModel();
  }, []);

  const capture = React.useCallback(async () => {
    if (!modelLoaded) {
      return; // Abort if the model is not yet loaded
    }

    const imageSrc = webcamRef.current.getScreenshot();
    const img = await fetchImage(imageSrc);
    const detections = await detectAllFaces(img, new TinyFaceDetectorOptions()).withFaceLandmarks();
    console.log(detections);
  }, [modelLoaded]);

  return (
    <div>
      <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
      <button onClick={capture}>Capture</button>
    </div>
  );
}

export default Attendance;
