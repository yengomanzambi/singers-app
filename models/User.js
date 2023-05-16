import { Schema, model, models } from "mongoose";
import mongoose from "mongoose";
const UserSchema = new Schema({
  fullname: {
    type: String,
    required:true
  },
  style: {
    type: [String],
    required:"true"
  },
});
const User = models.User || model("User", UserSchema);
export default User;
