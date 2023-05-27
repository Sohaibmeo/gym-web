const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//MiddleWare
app.use(cors());
app.use(bodyParser.json());

//Existing Routes
app.get('/', (req, res) => {
  res.send('Hello, world!');
});
app.use('/uploads', express.static('uploads'));
app.listen(8000, () => {
  console.log('Server is running on port 8000');
});

app.use('/api/users', userRoutes);

//IDK WHAT THIS IS CALLED BUT CONNECTIONS I GUESS?
mongoose.connect('mongodb://localhost/xfitbackend', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});
