import express from "express";
import { createOrder } from "../controllers/Order.js";


const router = express.Router();

router.post('/:categoryId',createOrder)

export default router;
