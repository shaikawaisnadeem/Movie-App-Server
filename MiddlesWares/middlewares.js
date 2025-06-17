import express from 'express'
import cors from 'cors'

const middleWares = (app)=>{
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(cors({
    origin: '*', 
    // credentials: true,
  }))   
} 
export default middleWares