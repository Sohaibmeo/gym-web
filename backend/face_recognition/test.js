const cv = require('opencv4nodejs');
// const what = cv.FaceRecognizer()
const src = cv.imread('me.jpeg');
const gray = src.bgrToGray();
const pictureName = [ 'Sohaib']
let faces = [];
let eyes = [];
const recognizer = new cv.LBPHFaceRecognizer();
const faceCascade = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_ALT);
const eyeCascade = new cv.CascadeClassifier(cv.HAAR_EYE);
// Detect faces
const msize = new cv.Size(0, 0);
faces = faceCascade.detectMultiScale(gray, 1.1, 3, 0, msize, msize).objects;
for (let i = 0; i < faces.length; ++i) {
  const faceRect = faces[i];
  const roiGray = gray.getRegion(faceRect);
  const roiSrc = src.getRegion(faceRect);
  roiSrc.drawRectangle(
    new cv.Point(0, 0),
    new cv.Point(faceRect.width - 1, faceRect.height - 1),
    new cv.Vec(0, 0, 255, 255),
    2
  );
  // Detect eyes in face ROI
  eyes = eyeCascade.detectMultiScale(roiGray).objects;
  cv.imshow('canvasOutput', roiSrc);
  for (let j = 0; j < eyes.length; ++j) {
      const eyeRect = eyes[j];
      roiSrc.drawRectangle(
          new cv.Point(eyeRect.x, eyeRect.y),
          new cv.Point(eyeRect.x + eyeRect.width - 1, eyeRect.y + eyeRect.height - 1),
          new cv.Vec(0, 255, 0, 255),
          2
          );
        }
  cv.imwrite(`${pictureName[0]}.png`, roiSrc.resize(120,120) );
  recognizer.train([roiGray.resize(120,120)], [0])
  cv.imshow('canvasOupput', roiGray.resize(120,120));
}
const srcNew = cv.imread('Sohaib.png');
recognizer.predictAsync(srcNew).then((result) => {
  console.log(result);
}).catch((err) => {console.log(err)});
cv.imshow('canvasOutput', src);
cv.waitKey();
cv.destroyAllWindows();
