import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import session from "express-session";
import ConnectMongoDBSession from "connect-mongodb-session";
import * as AdminJSMongoose from "@adminjs/mongoose";
import { dark, light, noSidebar } from "@adminjs/themes";
import Product from "../models/product.js";
import Category from "../models/Category.js";
import Order from "../models/Order.js";
import User from "../models/User.js";
import { COOKIE_PASSWORD } from "./config.js";
import Transaction from "../models/transection.js";

AdminJS.registerAdapter(AdminJSMongoose);

const DEFAULT_ADMIN = {
  email: "riteshkumar.nitk21@gmail.com",
  password: "123456789",
};

const authenticate = async (email, password) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN);
  }
  return null;
};

const buildAdminJS = async (app) => {
  const admin = new AdminJS({
    resources: [
      { resource: Product },
      { resource: Category },
      { resource: Order },
      { resource: User },
      { resource: Transaction },
    ],
    branding: {
      companyName: "Kart",
      withMadeWithLove: false,
      favicon: "https://cdn-icons-png.flaticon.com/512/3144/3144740.png",
      logo: "https://cdn-icons-png.flaticon.com/512/3144/3144740.png",
    },
    defaultTheme: dark.id,
    availableThemes: [dark, light, noSidebar],
    rootPath: "/admin",
  });

  const MongoDBStore = ConnectMongoDBSession(session);
  const sessionStore = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: "sessions",
  });

  // const adminRouter  = AdminJSExpress.buildAuthenticatedRouter{}
  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(admin, {
    authenticate,
    cookiePassword: COOKIE_PASSWORD,
  },
  null,{
    store:sessionStore,
    resave:true,
    saveUninitialized:true,
    secret:COOKIE_PASSWORD,
    cookie:{
        httpOnly:process.env.NODE_ENV === 'production',
        secure:process.env.NODE_ENV === 'production',
    },
    name:"kart-admin",
  }
);
  app.use(admin.options.rootPath, adminRouter);
};

export default buildAdminJS;
