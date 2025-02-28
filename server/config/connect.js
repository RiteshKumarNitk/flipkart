// import mongoose from 'mongoose';

// const connectDB = async ()=>{
//     return mongoose.connect(url);
// };
// export default connectDB;

import mongoose from "mongoose";

const connectDB = async (MONGO_URL) => {
    try {
        await mongoose.connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ MongoDB Connected Successfully");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error.message);
        process.exit(1);
    }
};

export default connectDB;
