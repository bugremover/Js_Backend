import {v2 as cloudinary} from 'cloudinary';
import fs from "fs"
//fs is file system by default in node.js for file management

cloudinary.config({
  cloud_name:  'process.env.CLOUDINARY_CLOUD_NAME',
  api_key: 'process.env.CLOUDINARY_API_KEY',
  api_secret: 'process.env.CLOUDINARY_API_SECRET'
});

//creating one method
/*
* will take parameter as url link of local file storing temp
* after that once local file is uploaded into cloudinary then delete the file
* use unlink
* */

const uploadOnCloudinary = async (localFilePath) =>{
  try {
    if (!localFilePath) return null
    //upload the file on cloudinary
     const response = await cloudinary.uploader.upload(localFilePath,{
       resource_type:"auto"
     })
    //file has beeb uploaded successfully
    console.log("file is uploaded on cloudinary",response.url);
    return response
  } catch (error){
        fs.unlinkSync(localFilePath) //remove the locally saved temp file as the upload operation got failed
      return null
  }
}


export  {
  uploadOnCloudinary
}