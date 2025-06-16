// mongoose is a mongodb and node js library , it is used to interact with mongodb
import mongoose from 'mongoose'
const MONGODB_URI = 'mongodb+srv://awaisn:awais123@cluster0.1pcfw7a.mongodb.net/movie-app'


const mongoConnection = async()=>{
    await mongoose.connect(MONGODB_URI)
    console.log('MongoDB Connected')
}

export default mongoConnection