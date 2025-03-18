// import express from "express";
// import { getProductByCategoryId } from "../controllers/product.js";


// const router = express.Router();

// router.get('/:categoryId',getProductByCategoryId)

// export default router;


import express from "express";
import Product from "../models/product.js";

const router = express.Router();

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;