const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5001;
let uri = 'mongodb+srv://test:JaNW9HJ-Zp5%40KQ4@cluster0.68c8y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection TODO
mongoose.connect(uri, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// User model
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', UserSchema);

// User Registration
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    try {
      await user.save();
      res.status(201).send('User registered');
    } catch (error) {
      res.status(400).send('Error registering user');
    }
  });

// User Login
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user._id }, 'YOUR_SECRET_KEY', { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).send('Invalid credentials');
    }
  });

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

app.get('/', (req, res) => {
    res.send('Server for API running. :)');
  });
