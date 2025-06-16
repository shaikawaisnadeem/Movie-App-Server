import express from 'express'
import cors from 'cors'

const middleWares = (app)=>{
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true,
  }))   
}
export default middleWares