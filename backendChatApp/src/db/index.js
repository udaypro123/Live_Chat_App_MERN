import mongoose from "mongoose"

import { DB_NAME } from "../constant.js"

export const connectDB = async () => {
    try {
        let connectionDBInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        console.log(`server successfully run on PORT ${process.env.PORT}`)
    } catch (error) {
        console.log(error, "database connection is failed")
        process.exit(1)
    }
}