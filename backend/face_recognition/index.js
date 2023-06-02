const { loadImage, Canvas, Image, ImageData } = require('canvas');
const faceapi = require('face-api.js');
const path = require('path');

// Load the face detection models
async function loadModels() {
  // Configure face-api.js to use the canvas module
  faceapi.env.monkeyPatch({ Canvas, Image, ImageData });
  // Specify the path to the face detection models
  const faceDetectionModelPath = path.resolve(__dirname, '../face_models');

  // await faceapi.nets.ssdMobilenetv1.loadFromDisk(faceDetectionModelPath);
  await faceapi.nets.faceLandmark68Net.loadFromDisk(faceDetectionModelPath);
  await faceapi.nets.faceRecognitionNet.loadFromDisk(faceDetectionModelPath);
  await faceapi.nets.tinyFaceDetector.loadFromDisk(faceDetectionModelPath);
}

const returnDescriptor = async(profilePicturePath) => {
  await loadModels();
  // Load an image for face recognition
  const image = await loadImage(profilePicturePath);
  // Detect faces in the image
  const detections = await faceapi
  .detectSingleFace(image, new faceapi.TinyFaceDetectorOptions())
  .withFaceLandmarks()
  .withFaceDescriptor();
  return Array.from(detections.descriptor);
}

module.exports = returnDescriptor;