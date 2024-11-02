import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express();
//when were we are using middleware or config packages
// we use app.use
app.use(cors({
    //adding which url from frontend to accept
    // coz we are not allowing to access backend from any links

    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

//settings what type of data we will receive
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())



export {app}