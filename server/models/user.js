import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    phone:{type:String, required:true, unique:true},
    address:{type:String},
    createdAt:{type:Date, default:Date.now},
    updateAd:{type:Date, default:Date.now},
});

export const User = mongoose.model("User", UserSchema);


