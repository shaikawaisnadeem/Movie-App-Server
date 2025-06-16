import mongoose from 'mongoose'
import mongoConnection from '../../MongoDB/connection.js'

// Connect to MongoDB
mongoConnection()

const loginSchema = new mongoose.Schema({
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

const checkUser = mongoose.model('checkUser', loginSchema)

export default checkUser
