const cv = require('opencv4nodejs');

const src = cv.imread('me.jpeg');
const gray = src.bgrToGray();

let faces = [];
let eyes = [];
const faceCascade = new cv.CascadeClassifier(cv.HAAR_EYE);
const eyeCascade = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_DEFAULT);
// Detect faces
const msize = new cv.Size(0, 0);
faces = faceCascade.detectMultiScale(gray, 1.1, 3, 0, msize, msize).objects;
for (let i = 0; i < faces.length; ++i) {
  const faceRect = faces[i];
  const roiGray = gray.getRegion(faceRect);
  const roiSrc = src.getRegion(faceRect);
  const point1 = new cv.Point(faceRect.x, faceRect.y);
  const point2 = new cv.Point(faceRect.x + faceRect.width, faceRect.y + faceRect.height);
  roiSrc.drawRectangle(point1, point2, new cv.Vec(255, 0, 0, 255), 2);
  // Detect eyes in face ROI
  eyes = eyeCascade.detectMultiScale(roiGray).objects;

  cv.waitKey();
  
  for (let j = 0; j < eyes.length; ++j) {
      const eyeRect = eyes[j];
      const eyePoint1 = new cv.Point(eyeRect.x, eyeRect.y);
      const eyePoint2 = new cv.Point(eyeRect.x + eyeRect.width, eyeRect.y + eyeRect.height);
      roiSrc.drawRectangle(eyePoint1, eyePoint2, new cv.Vec(0, 0, 255, 255), 2);
    }
    cv.imshow('canvasOutput', roiSrc);
}
cv.destroyAllWindows();
