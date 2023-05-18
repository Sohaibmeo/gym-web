// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const UserModel = require('../models/userModel');
const { addUser, getAllUsers, InitiateDummyDataUser } = require('../actions/userActions');

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
router.post('/addUser', async (req, res) => {
  try {
    const user = await addUser(req.body);
    if (!user.error){
      console.log("Passing User Data back to front end")
      user._id = user._id.toString(); // Convert ObjectId to string
      res.json(user);
    } else {
      console.log("Passing Error code to front-end")
      res.json({ error: user.error });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/addUserDummy', async (req, res) => {
    try {
      const user = InitiateDummyDataUser();
      res.json(user);
    } catch (error) {
      console.error("This mah error nigga",error);
      res.status(500).json({ message: 'Server Error' });
    }
  });

module.exports = router;
