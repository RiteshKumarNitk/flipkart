import dotenv from "dotenv";
import express from "express";
import userRoutes from "./routes/user.js"; // Ensure userRoutes is a default export
import { getAllCategory } from "./controllers/category.js";
import { getProductByCategoryId } from "./controllers/product.js";

dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// User routes
app.use("/user", userRoutes);
app.use("/category", getAllCategory);
app.use("/product", getProductByCategoryId);

// Fallback for unmatched routes
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

const start = () => {
    app.listen(3000, "0.0.0.0", (err) => {
        if (err) {
            console.log("Error starting server:", err);
        } else {
            console.log("Server started on http://localhost:3000");
        }
    });
};

start();
