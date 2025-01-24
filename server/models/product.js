import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema({
    name:{type:String, required:true},
    image_uri:{type:String, required:true},
    price:{type:number, required:true},
    ar_uri:{type:String},
    products:[{type:mongoose.Schema.Types.ObjectId, ref:"Product"}],
    createdAt:{type:Date, default:Date.now},
    updateAd:{type:Date, default:Date.now},
});

export const User = mongoose.model("Product", ProductSchema);


