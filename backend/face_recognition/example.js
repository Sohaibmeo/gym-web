const cv = require('opencv4nodejs');

// Load the face recognition model
const recognizer = new cv.LBPHFaceRecognizer();

// Load the cascade classifier
const classifier = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_ALT2);

// Retrieve the base64-encoded image from MongoDB for a specific user
const userImageBase64 = ''; // Retrieve the base64 image from the database

// Convert the base64-encoded image to a buffer
const userImageBuffer = Buffer.from(userImageBase64, 'base64');

// Load the user's face image from the buffer
const userFaceImage = cv.imdecode(userImageBuffer);

// Train the face recognizer with the user's face image
recognizer.addFaces([userFaceImage], 'User');

// Capture a frame from the camera
const frame = cv.imread('camera_frame.jpg');

// Convert the captured frame to grayscale
const grayFrame = frame.bgrToGray();

// Detect faces in the grayscale frame
const faceRects = classifier.detectMultiScale(grayFrame).objects;

// Process each detected face
faceRects.forEach((faceRect) => {
  // Create a region of interest (ROI) for the detected face
  const faceROI = grayFrame.getRegion(faceRect);

  // Resize the face ROI to a consistent size
  const resizedFace = faceROI.resize(80, 80);

  // Recognize the face
  const prediction = recognizer.predictBest(resizedFace);

  // Get the recognized label and distance
  const { label, distance } = prediction;

  // Determine the similarity threshold and perform actions accordingly
  if (distance < 0.6) {
    // Face recognized as the user
    console.log(`User recognized as ${label} with distance ${distance}`);
    // Perform actions for the recognized user
  } else {
    // Face not recognized as the user
    console.log('Unknown user');
    // Perform actions for unknown users
  }
});
