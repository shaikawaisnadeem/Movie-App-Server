// importing express
import express from 'express'
import middleWares from './MiddlesWares/middlewares.js'
import mongoConnection from './MongoDB/connection.js'
import User from './Schemas/Resgistration/Registration.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import checkUser from './Schemas/Login/login.js'

// creating an express instance 
const app = express()
mongoConnection()
middleWares(app)

// giving a port number where our server should run 
const port = 3000 

// defining a simple route 
app.get('/', (req, res) => {
    res.send('Welcome to Express Train')
})

app.post('/register', async (req, res) => {
  try {
    const { username, password, confirmpassword, email } = req.body;

    if (password !== confirmpassword) {
      return res.status(400).json({ error: 'Password and confirm password do not match.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password: hashedPassword,
      confirmpassword,
      email,
    });

    console.log(newUser);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.get('/user-details', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body 
    const loggedUser = await User.findOne({ email });
    if (!loggedUser) {
        return res.status(401).json({ error: 'Not Authorized' });
    }
    const isMatch = await bcrypt.compare(password, loggedUser.password);
    if (!isMatch){
        return res.status(401).json({ error: 'Not Authorized' });
    }
    const token = jwt.sign({ email: email }, 'test#secret');
    res.json({ token });
})

// initializing express app , we should use listen 
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})