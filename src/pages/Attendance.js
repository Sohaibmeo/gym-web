import React from 'react';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';

function App() {
  const [modelsLoaded, setModelsLoaded] = React.useState(false);
  const [videoLoaded, setVideoLoaded] = React.useState(false);
  const videoWidth = 640;
  const videoHeight = 480;
  const canvasRef = React.useRef();

  React.useEffect(() => {
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
    }
  };

  return (
    <div>
      {modelsLoaded ? (
          <div>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
              <Webcam
                id="video"
                onUserMedia={() => setVideoLoaded(true)}
                width={videoWidth}
                height={videoHeight}
                onPlay={handleVideoOnPlay}
                style={{ borderRadius: '10px' }}
              />
              <canvas ref={canvasRef} style={{ position: 'absolute' }} />
            </div>
          </div>
        ) : (
          <div>Loading models...</div>
        )}
    </div>
  );
}

export default App;
