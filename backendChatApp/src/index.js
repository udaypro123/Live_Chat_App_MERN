import { app } from "./app.js";
import { connectDB } from "./db/index.js";
import dotenv from 'dotenv'
import setupSocket from "./socket.js";

dotenv.config({
    path:'./env'
})


connectDB().then(()=>{
    let server =   app.listen(process.env.PORT || 6000, ()=>{
        console.log(`server running on port ${process.env.PORT}`)
    })
    setupSocket(server)
}).catch((error)=>{
    console.log("monog db connection failed", error)
})


