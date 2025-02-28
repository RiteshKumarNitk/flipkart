import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import session from "express-session";
import ConnectMongoDBSession from "connect-mongodb-session";
import Product from "../models/product.js"
import Category from "../models/Category.js"
import Order from "../models/Order.js"
import User from "../models/User.js"
import * as AdminJSMongoose from "@adminjs/mongoose";
import {COOKIE_PASSWORD} from "./config.js"
import {dark, light, noSidebar }from "@adminjs/themes";

// import express from "express";
// import mongoose from "mongoose";
// import MongoDBStore from "connect-mongodb-session";
// import formidableMiddleware from "express-formidable";



Admin.registerAdapter(AdminJSMongoose)

const DEFAULT_ADMIN = {
    email:"riteshkumar.nitk21@gmail.com",
    password:"123456789"
}
const authenticate = async(email,password)=>{
    if(email===DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password){
        return Promise.resolve(DEFAULT_ADMIN)
    }
    return const buildAdmminJS = async(app)=>{
        
    }
}

