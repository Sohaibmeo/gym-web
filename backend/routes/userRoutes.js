// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const UserModel = require('../models/userModel');
const { addUser, getAllUsers } = require('../actions/userActions');
var multer = require('multer');
const fs = require('fs')
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({ storage: storage });
// GET /api/users
router.get('/', async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/userById', async (req, res) => {
    try {
      const users = await UserModel.find();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
});

router.get('/allUsers', async (req, res) => {
    try {
      res.json(getAllUsers())
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });

// POST /api/users
router.post('/addUser',upload.single('profilePicture'), async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0 ){
      console.log("Not a proper Request")
      res.json({ error: "Got a request to store empty Data" });
    }
    else {
      const imagePath = req.file.path
      const user = await addUser(req.body,{profilePicturePath: imagePath});
      if (!user.error && user ){
        console.log("Passing User Data back to front end")
        user._id = user._id.toString(); // Convert ObjectId to string
        res.json(user);
      } else {
        console.log("Passing Error code to front-end")
        res.status(500).json({ message: user.error });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
