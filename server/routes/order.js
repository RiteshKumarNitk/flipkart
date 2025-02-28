import express from "express";
import { createOrder, createTransection, getOrderByUserId } from "../controllers/Order.js";

const router = express.Router();

// router.post('/:categoryId',createOrder)
router.get('/transaction',createTransection )
router.get('/:userId',getOrderByUserId )
router.get('/',createOrder )

export default router;
