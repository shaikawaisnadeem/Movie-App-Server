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
app.get('/',(req,res)=>{
    res.send('Welcome to Express Train')
})

app.post('/register', async (req, res) => {
  try {
    const { username, password, comfirmpassword, email } = req.body;

    if (password !== comfirmpassword) {
      return res.status(400).send('Password and confirm password do not match.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password: hashedPassword,
      email,
    });

    console.log(newUser);
    res.status(201).send('User created successfully!');

  } catch (err) {
    console.error(err);
    res.status(500).send('Error: ' + err.message);
  }
});

app.post('/login',async(req,res)=>{
    const {email, password} = req.body 
    const loggedUser=  await User.findOne({email})
    const isMatch = await bcrypt.compare(password, loggedUser.password);
    if (!loggedUser || !isMatch){
        res.send('Not Authorized')
    }
    else {
        const token = jwt.sign({email:email},'test#secret')
        res.json(token)
    }
})


// initializing express app , we should use listen 
app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`)
})