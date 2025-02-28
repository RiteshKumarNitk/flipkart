import dotenv from "dotenv";
import express from "express";
import userRoutes from "./routes/user.js"; // Ensure default export
import categoryRoutes from "./routes/category.js";
import ProductRoutes from "./routes/product.js";
import orderRoutes from "./routes/order.js";
import connectDB from "./config/connect.js";
import buildadminJS from ""


dotenv.config();

const PORT = process.env.PORT || 3000; // ✅ Fallback to 3000 if undefined

const app = express();

// Middleware to parse JSON
app.use(express.json());

// User routes
app.use("/user", userRoutes);
app.use("/category", categoryRoutes);
app.use("/product", ProductRoutes);
app.use("/order", orderRoutes);

// Fallback for unmatched routes
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        await buildAdminJS(app);
        app.listen(PORT, () => {
            console.log(`Server started on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Error connecting to database:", error.message);
        process.exit(1); // Exit process if DB fails
    }
};

start();
