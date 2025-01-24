import jwt from "jsonwebtoken";
import {User} from "../models/user.js";
import dotenv from "dotenv";

// Configure dotenv
dotenv.config();

const generateToken = (user) => {
    const accessToken = jwt.sign(
        { userId: user._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "2d" }
    );

    const refreshToken = jwt.sign(
        { userId: user._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
    );

    return { accessToken, refreshToken };
};

const loginOrSignUp = async (req, res) => {
    const { phone, address } = req.body;

    try {
        let user = await User.findOne({ phone });

        if (!user) {
            // If user doesn't exist, create a new one
            user = new User({ phone, address });
            await user.save();
        } else {
            // If user exists, update address
            user.address = address;
            await user.save();
        }

        // Generate tokens
        const { accessToken, refreshToken } = generateToken(user);
        res.status(200).json({ user, accessToken, refreshToken });
    } catch (error) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

export default loginOrSignUp;
