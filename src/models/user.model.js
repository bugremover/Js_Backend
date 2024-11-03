import mongoose ,{Schema} from 'mongoose';
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';
const UserSchema = new Schema({

  username :{
    type:String,
    required :true,
    unique:true,
    lowercase:true,
    trim : true,
    index :true
  },
  email :{
    type:String,
    required :true,
    unique:true,
    lowercase:true,
    trim : true,
  },
  fullName:{
    type:String,
    required:true,
    trim: true,
    index:true
  },
  avatar:{
    type:String,//cloudinary Url
    required:true,

  },
  coverImage:{
    type:String,

  },

  watchHistory:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'video'
  }],
  password :{
    type:String,
    required:[true,"Password is required"],

  },
  refershToken:{
    type:String,
  }




},
  {timestamps:true});



//mongoose middleware
UserSchema.pre("save",async function(next){
  //this function will excuted only if password is modified
  /*
  * else it will hash the password everytime u update */
  if(this.isModified("password")){
    this.password =await bcrypt.hash(this.password,10)
    next()
  }
})
UserSchema.methods.isPasswordCorrect = async  function (password){

  return await bcrypt.compare(password,this.password)
}

UserSchema.methods.generateAccessToken = async function() {

  return jwt.sign(
    {
      _id: this._id,
      email:this.email,
      username:this.username,
      fullName:this.fullName
    },
    process.env.ACCESSS_TOKEN_SCERET,
    {
      expiresIn: process.env.ACCESSS_TOKEN_EXPIRY
    }
  )
}


UserSchema.methods.generateRefreshToken = async function() {
  return jwt.sign(
    {
      _id: this._id,

    },
    process.env.REFRESH_TOKEN_SCERET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
  )
}
export const user = mongoose.model("user", UserSchema);