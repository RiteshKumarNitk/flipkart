import express from "express";
import { createOrder, createTransection } from "../controllers/Order.js";


const router = express.Router();

// router.post('/:categoryId',createOrder)
router.get('/:transaction',createTransection )

export default router;
