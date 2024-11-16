import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
const app=express()

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true,
  }))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true, limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// Routes declarations

import userRouter from "../src/routes/user.routes.js"
import messageRouter from "../src/routes/message.routes.js"

app.use('/api/v1/users',userRouter)
app.use('/api/v1/message',messageRouter)



export {app}