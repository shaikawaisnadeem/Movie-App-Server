import express from 'express'

const middleWares = (app)=>{
    app.use(express.json())
}
export default middleWares