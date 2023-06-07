const faceapi = require('face-api.js');
const canvas = require('canvas');
const path = require('path');
const saveFile = require('./utils/saveFile');
const minConfidence = 0.5
// Load the face detection models
async function loadModels() {
  // Configure face-api.js to use the canvas module
  const {Canvas,Image,ImageData} = canvas;
  faceapi.env.monkeyPatch({ Canvas, Image, ImageData });
  // Specify the path to the face detection models
  const faceDetectionModelPath = path.resolve(__dirname, '../face_models');

  await faceapi.nets.ssdMobilenetv1.loadFromDisk(faceDetectionModelPath);
  await faceapi.nets.faceLandmark68Net.loadFromDisk(faceDetectionModelPath);
  await faceapi.nets.faceRecognitionNet.loadFromDisk(faceDetectionModelPath);
}

const returnDescriptor = async(profilePicturePath,firstName,lastName) => {
  await loadModels();
  // Load an image for face recognition
  const image = await canvas.loadImage(profilePicturePath);
  // Detect a single face in the image
  const detections = await faceapi
  .detectSingleFace(image, new faceapi.SsdMobilenetv1Options({minConfidence}))
  .withFaceLandmarks()
  .withFaceDescriptor();

  const refDrawBoxes = new faceapi.draw.DrawBox(detections.detection.box, { label: `${firstName} ${lastName}` })
  const outRef = faceapi.createCanvasFromMedia(image)
  refDrawBoxes.draw(outRef)

  saveFile(`${firstName} ${lastName}.jpg`, (outRef).toBuffer('image/jpeg'))

  return Array.from(detections.descriptor);
}

const recognizeFace = async (receivedDescriptor, storedDescriptors, users) => {
  const labeledDescriptors = storedDescriptors.map((descriptor, index) => {
    console.log("Descriptor Length:", descriptor.length);
    console.log("User:", users[index].firstName);
    return new faceapi.LabeledFaceDescriptors(users[index].firstName.toString(), [new Float32Array(descriptor)]);
  });
  const receivedDescriptorArray = new Float32Array(Object.values(receivedDescriptor));
  console.log("2nd Descriptor Length:", receivedDescriptorArray.length)
  if(receivedDescriptorArray.length === 128){
    const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors);
    const bestMatch = faceMatcher.findBestMatch(receivedDescriptorArray);
    const matchedUserFirstName = bestMatch.label;
    return matchedUserFirstName;
  }else{
    return "No Face Detected"
  }
};

module.exports = {returnDescriptor,recognizeFace};