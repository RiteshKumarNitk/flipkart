import dotenv from 'dotenv';
dotenv.config();

console.log("🔹 MongoDB URL:", process.env.MONGO_URL); // Debugging line
export const PORT = process.env.PORT||3000;
export const COOKIE_PASSWORD = process.env.COOKIE_PASSWORD||"secret";

