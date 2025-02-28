import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    phone: { type: String, required: true, unique: true },
    address: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }, // Fixed 'updateAd' typo
});

// Prevent model overwrite error
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
