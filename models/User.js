import { Schema, model, models } from "mongoose";
import mongoose from "mongoose";
const UserSchema = new Schema({
  name:{
    type:String,
    required:true
  },
  fullname: {
    type: String,
    required:true
  },

  email:{
    type:String,
    unique:true
   
  },
  password:{
    type:String
  },
  passwordConfirmation:{
    type:String
  },
  style: {
    type: [String],
    required:"true"
  },
  profilePicture:{
    type:String,
    default:""
  }
});
const User = models.User || model("User", UserSchema);
export default User;
