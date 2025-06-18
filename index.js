import express from 'express';
import middleWares from './MiddlesWares/middlewares.js';
import mongoConnection from './MongoDB/connection.js';
import User from './Schemas/Resgistration/Registration.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const app = express();
const port = 3000;

// Connect DB and use middleware
mongoConnection();
middleWares(app);

// Home route
app.get('/', (req, res) => {
  res.send('Welcome to Express Train');
});

// Register route
app.post('/register', async (req, res) => {
  try {
    const { username, password, confirmpassword, email } = req.body;

    // Check for existing user before creating a new one
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: 'Email already exists' });
    }

    // Hash passwords
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedConfirmPassword = await bcrypt.hash(confirmpassword, 10);

    // Save user
    const newUser = await User.create({
      username,
      password: hashedPassword,
      confirmpassword: hashedConfirmPassword,
      email,
    });

    res.status(201).send({ message: 'User registered successfully'});
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Server error' });
  }
});

// Get all users
app.get('/user-details', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: 'Server error' });
  }
});

// Login route
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const loggedUser = await User.findOne({ email });
    if (!loggedUser) {
      return res.status(401).send({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, loggedUser.password);
    if (!isMatch) {
      return res.status(401).send({ error: 'Incorrect password' });
    }

    const token = jwt.sign({ email: email }, 'test#secret');
    res.status(200).send({ message: 'Login successful', token});
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Server error' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
