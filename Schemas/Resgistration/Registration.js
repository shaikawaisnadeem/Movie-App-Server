import mongoose from 'mongoose'
import mongoConnection from '../../MongoDB/connection.js'

// Connect to MongoDB
mongoConnection()

const registrationSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  }
})

const User = mongoose.model('User', registrationSchema)

export default User
