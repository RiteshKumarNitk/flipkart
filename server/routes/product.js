import express from "express";
import { getProductByCategoryId } from "../controllers/product";


const router = express.Router();

router.get('/:categoryId',getProductByCategoryId)

export default router;
