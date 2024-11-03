// import connectDB from "./db/index.js";
import mongoose from "mongoose";
import {DB_NAME} from './constants.js';
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
dotenv.config({
    path:'.env'
});

connectDB()
//adding promises after connecting to database it will call two fuctions

.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is running at :${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("MongoDB connection failed !!!",err);
})
// import express from "express"
// const app = express()
// ;( async() => {
//     try{
//         await mongoose.connect(`${process.env.MONGODB_URI}/
//             ${DB_NAME}`)
//         app.on("error",(error)=>{
//             console.log("ERRR:",error);
//             throw error
//         })
//         app.listen(process.env.PORT,()=>{
//             console.log(`App is listening on port ${process.env.PORT}`);
//         })
//     }
//     catch(error){
//         console.error("Error:",error)
//         throw error
//     }
// })()


//1. when were we tried to talk with database for sure will get errors
// so use try catch while connecting to database
//Database is always in another continent
//have to add async await
