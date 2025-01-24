import mongoose, { Schema } from "mongoose";

const CategorySchema = new Schema({
    name:{type:String, required:true},
    image_uri:{type:String, required:true},
    products:[{type:mongoose.Schema.Types.ObjectId, ref:"Product"}],
    createdAt:{type:Date, default:Date.now},
    updateAd:{type:Date, default:Date.now},
});

export const User = mongoose.model("Category", CategorySchema);


